import React, { useState, useEffect } from "react";
import moment from "moment";
import ProyeccionesBuscar from "./ProyeccionesBuscar";
import ProyeccionesListado from "./ProyeccionesListado";
import ProyeccionesRegistro from "./ProyeccionesRegistro";
import { proyeccionesService } from "../../services/proyecciones.service";
import { proyeccionesfamiliasService } from "../../services/proyeccionesFamilias.service";


function Proyecciones() {
  const TituloAccionABMC = {
    A: "(Agregar)",
    B: "(Eliminar)",
    M: "(Modificar)",
    C: "(Consultar)",
    L: "(Listado)",
  };
  const [AccionABMC, setAccionABMC] = useState("L");

  const [Proy_Hora, setProy_Hora] = useState("");

  const [Items, setItems] = useState(null);
  const [Item, setItem] = useState(null); // usado en BuscarporId (Modificar, Consultar)
  const [RegistrosTotal, setRegistrosTotal] = useState(0);
  const [Pagina, setPagina] = useState(1);
  const [Paginas, setPaginas] = useState([]);


  const [ProyeccionesFamilias, setProyeccionesFamilias] = useState(null);

  // cargar al "montar" el componente, solo la primera vez (por la dependencia [])
  useEffect(() => {
    async function BuscarProyeccionesFamilas() {
      let data = await proyeccionesfamiliasService.Buscar();
      setProyeccionesFamilias(data);
    }
    BuscarProyeccionesFamilas();
  }, []);

  async function Buscar(_pagina) {
    if (_pagina && _pagina !== Pagina) {
      setPagina(_pagina);
    }
    // OJO Pagina (y cualquier estado...) se actualiza para el proximo render, para buscar usamos el parametro _pagina
    else {
      _pagina = Pagina;
    }

    const data = await proyeccionesService.Buscar(Proy_Hora, _pagina);
    setItems(data.Items);
    setRegistrosTotal(data.RegistrosTotal);

    //generar array de las páginas para mostrar en select del paginador
    const arrPaginas = [];
    for (let i = 1; i <= Math.ceil(data.RegistrosTotal / 10); i++) {
      arrPaginas.push(i);
    }
    setPaginas(arrPaginas);
  }

 


  async function BuscarPorId(item, accionABMC) {
    const data = await proyeccionesService.BuscarPorId(item);
    setItem(data);
    setAccionABMC(accionABMC);
  }
  

  function Consultar(item) {
    BuscarPorId(item, "C"); // paso la accionABMC pq es asincrono la busqueda y luego de ejecutarse quiero cambiar el estado accionABMC
  }
  function Modificar(item) {
    BuscarPorId(item, "M"); // paso la accionABMC pq es asincrono la busqueda y luego de ejecutarse quiero cambiar el estado accionABMC
  }

  function Agregar() {
    setAccionABMC("A");
    setItem({
      Proy_Codigo: 0,
      Proy_Fecha: moment(new Date()).format("YYYY-MM-DD"),
      Proy_Hora: moment().format("HH:mm"),
      Proy_NroSala: 0,
      Peli_Codigo: 0,
    });
  }
//En este ejemplo, moment() crea un objeto Moment que representa la fecha y hora actual. 
//Luego, utilizando el método format("HH:mm"), formateamos la hora en el formato deseado.

  function Imprimir() {
    alert("En desarrollo...");
  }

  async function ActivarDesactivar(item) {
    const resp = window.confirm(
      "Está seguro que quiere eliminar el registro?"
    );
    if (resp) {
      await proyeccionesService.ActivarDesactivar(item);
      await Buscar();
    }
  }
  

  async function Grabar(item) {
    // agregar o modificar
    try
    {
      await proyeccionesService.Grabar(item);
    }
    catch (error)
    {
      alert(error?.response?.data?.message ?? error.toString())
      return;
    }
    await Buscar();
    Volver();
  
    setTimeout(() => {
      alert(
        "Registro " +
          (AccionABMC === "A" ? "agregado" : "modificado") +
          " correctamente."
      );
    }, 0);
  }
  

  // Volver/Cancelar desde Agregar/Modificar/Consultar
  function Volver() {
    setAccionABMC("L");
  }

  return (
    <div>
      <div className="tituloPagina">
      Proyecciones <small>{TituloAccionABMC[AccionABMC]}</small>
      </div>

      {AccionABMC === "L" && <ProyeccionesBuscar
        Proy_Hora={Proy_Hora}
        setProy_Hora={setProy_Hora}
        Buscar={Buscar}
        Agregar={Agregar}
      />}

      {/* Tabla de resutados de busqueda y Paginador */}
      {AccionABMC === "L" && Items?.length > 0 && <ProyeccionesListado
        {...{
          Items,
          Consultar,
          Modificar,
          ActivarDesactivar,
          Imprimir,
          Pagina,
          RegistrosTotal,
          Paginas,
          Buscar,
        }}
      />}

      {AccionABMC === "L" && Items?.length === 0 && <div className="alert alert-info mensajesAlert">
      <i className="fa fa-exclamation-sign"></i>
          No se encontraron registros...
      </div> }

      {/* Formulario de alta/modificacion/consulta */}
      {AccionABMC !== "L" && <ProyeccionesRegistro
        {...{ AccionABMC, ProyeccionesFamilias, Item, Grabar, Volver }}
      />}
    </div>
  );
}
export { Proyecciones };