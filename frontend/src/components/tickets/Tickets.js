import React, { useState, useEffect } from "react";
import moment from "moment";
import TicketsBuscar from "./TicketsBuscar";
import TicketsListado from "./TicketsListado";
import TicketsRegistro from "./TicketsRegistro";
import { ticketsService } from "../../services/tickets.service";
import { ticketsfamiliasService } from "../../services/ticketsFamilias.service";


function Tickets() {
  const TituloAccionABMC = {
    A: "(Agregar)",
    B: "(Eliminar)",
    M: "(Modificar)",
    C: "(Consultar)",
    L: "(Listado)",
  };
  const [AccionABMC, setAccionABMC] = useState("L");

  const [But_Fila, setBut_Fila] = useState("");

  const [Items, setItems] = useState(null);
  const [Item, setItem] = useState(null); // usado en BuscarporId (Modificar, Consultar)
  const [RegistrosTotal, setRegistrosTotal] = useState(0);
  const [Pagina, setPagina] = useState(1);
  const [Paginas, setPaginas] = useState([]);


  const [TicketsFamilias, setTicketsFamilias] = useState(null);

  // cargar al "montar" el componente, solo la primera vez (por la dependencia [])
  useEffect(() => {
    async function BuscarTicketsFamilas() {
      let data = await ticketsfamiliasService.Buscar();
      setTicketsFamilias(data);
    }
    BuscarTicketsFamilas();
  }, []);

  async function Buscar(_pagina) {
    if (_pagina && _pagina !== Pagina) {
      setPagina(_pagina);
    }
    // OJO Pagina (y cualquier estado...) se actualiza para el proximo render, para buscar usamos el parametro _pagina
    else {
      _pagina = Pagina;
    }

    const data = await ticketsService.Buscar(But_Fila, _pagina);
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
    const data = await ticketsService.BuscarPorId(item);
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
      Tick_Id: 0,
      Tick_FechaVenta: moment(new Date()).format("YYYY-MM-DD"),
      Cli_DNI: 0,
      But_Fila: null,
      But_Nro: 0,
      Proy_Codigo: 0,
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
      await ticketsService.ActivarDesactivar(item);
      await Buscar();
    }
  }
  

  async function Grabar(item) {
    // agregar o modificar
    try
    {
      await ticketsService.Grabar(item);
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
        Tickets <small>{TituloAccionABMC[AccionABMC]}</small>
      </div>

      {AccionABMC === "L" && <TicketsBuscar
        But_Fila={But_Fila}
        setBut_Fila={setBut_Fila}
        Buscar={Buscar}
        Agregar={Agregar}
      />}

      {/* Tabla de resutados de busqueda y Paginador */}
      {AccionABMC === "L" && Items?.length > 0 && <TicketsListado
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
      {AccionABMC !== "L" && <TicketsRegistro
        {...{ AccionABMC, TicketsFamilias, Item, Grabar, Volver }}
      />}
    </div>
  );
}
export { Tickets };
