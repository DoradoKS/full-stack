import React, { useState, useEffect } from "react";
import moment from "moment";
import PeliculasBuscar from "./PeliculasBuscar";
import PeliculasListado from "./PeliculasListado";
import PeliculasRegistro from "./PeliculasRegistro";
import { peliculasService } from "../../services/peliculas.service";
import { peliculasfamiliasService } from "../../services/peliculasFamilias.service";


function Peliculas() {
  const TituloAccionABMC = {
    A: "(Agregar)",
    B: "(Eliminar)",
    M: "(Modificar)",
    C: "(Consultar)",
    L: "(Listado)",
  };
  const [AccionABMC, setAccionABMC] = useState("L");

  const [Peli_Titulo, setPeli_Titulo] = useState("");

  const [Items, setItems] = useState(null);
  const [Item, setItem] = useState(null); // usado en BuscarporId (Modificar, Consultar)
  const [RegistrosTotal, setRegistrosTotal] = useState(0);
  const [Pagina, setPagina] = useState(1);
  const [Paginas, setPaginas] = useState([]);


  const [PeliculasFamilias, setPeliculasFamilias] = useState(null);

  // cargar al "montar" el componente, solo la primera vez (por la dependencia [])
  useEffect(() => {
    async function BuscarPeliculasFamilas() {
      let data = await peliculasfamiliasService.Buscar();
      setPeliculasFamilias(data);
    }
    BuscarPeliculasFamilas();
  }, []);

  async function Buscar(_pagina) {
    if (_pagina && _pagina !== Pagina) {
      setPagina(_pagina);
    }
    // OJO Pagina (y cualquier estado...) se actualiza para el proximo render, para buscar usamos el parametro _pagina
    else {
      _pagina = Pagina;
    }

    const data = await peliculasService.Buscar(Peli_Titulo, _pagina);
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
    const data = await peliculasService.BuscarPorId(item);
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
      Peli_Codigo: 0,
      Peli_Titulo: null,
      Peli_Duracion: null,
      Peli_Genero: null,
      Peli_Clase: null,
      Peli_FechaLanzamiento: moment(new Date()).format("YYYY-MM-DD"),
      Peli_CantVisualizaciones: 0,
    });
  }


  function Imprimir() {
    alert("En desarrollo...");
  }

  async function ActivarDesactivar(item) {
    const resp = window.confirm(
      "Está seguro que quiere eliminar el registro?"
    );
    if (resp) {
      await peliculasService.ActivarDesactivar(item);
      await Buscar();
    }
  }
  

  async function Grabar(item) {
    // agregar o modificar
    try
    {
      await peliculasService.Grabar(item);
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
      Peliculas <small>{TituloAccionABMC[AccionABMC]}</small>
      </div>

      {AccionABMC === "L" && <PeliculasBuscar
        Peli_Titulo={Peli_Titulo}
        setPeli_Titulo={setPeli_Titulo}
        Buscar={Buscar}
        Agregar={Agregar}
      />}

      {/* Tabla de resutados de busqueda y Paginador */}
      {AccionABMC === "L" && Items?.length > 0 && <PeliculasListado
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
      {AccionABMC !== "L" && <PeliculasRegistro
        {...{ AccionABMC, PeliculasFamilias, Item, Grabar, Volver }}
      />}
    </div>
  );
}
export { Peliculas };