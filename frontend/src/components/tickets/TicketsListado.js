import React from "react";
import moment from "moment";

export default function TicketsListado({
  Items,
  Consultar,
  Modificar,
  ActivarDesactivar,
  Imprimir,
  Pagina,
  RegistrosTotal,
  Paginas,
  Buscar,
}) {
  return (
    <div className="table-responsive">
      <table className="table table-hover table-sm table-bordered table-striped">
        <thead>
          <tr>
            <th className="text-center">Fecha de Alta</th>
            <th className="text-center">DNI</th>
            <th className="text-center">Fila Butaca</th>
            <th className="text-center">Num Butaca</th>
            <th className="text-center">Proyeccion ID</th>
            <th className="text-center text-nowrap">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {Items &&
            Items.map((Item) => (
              <tr key={Item.Tick_Id}>
                <td className="text-end">
                  {moment(Item.Tick_FechaVenta).format("DD/MM/YYYY")}
                </td>
                <td className="text-end">{Item.Cli_DNI}</td>
                <td>{Item.But_Fila}</td>
                <td className="text-end">{Item.But_Nro}</td>
                <td className="text-end">{Item.Proy_Codigo}</td>
                <td className="text-center text-nowrap">
                  <button
                    className="btn btn-sm btn-outline-primary"
                    title="Consultar"
                    onClick={() => Consultar(Item)}
                  >
                    <i className="fa fa-eye"></i>
                  </button>
                  <button
                    className="btn btn-sm btn-outline-primary"
                    title="Modificar"
                    onClick={() => Modificar(Item)}
                  >
                    <i className="fa fa-pencil"></i>
                  </button>
                  <button
                    className={
                        "btn btn-sm btn-outline-primary"
                    }
                    title= "Eliminar"
                    onClick={() => ActivarDesactivar(Item)}
                  >
                    <i
                      className="fa fa-trash"
                    ></i>
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      
      {/* Paginador*/}
      <div className="paginador">
        <div className="row">
          <div className="col">
            <span className="pyBadge">Registros: {RegistrosTotal}</span>
          </div>
          <div className="col text-center">
            Pagina: &nbsp;
            <select
              value={Pagina}
              onChange={(e) => {
                Buscar(e.target.value);
              }}
            >
              {Paginas?.map((x) => (
                <option value={x} key={x}>
                  {x}
                </option>
              ))}
            </select>
            &nbsp; de {Paginas?.length}
          </div>

          <div className="col">
            <button className="btn btn-primary float-end" onClick={() => Imprimir()}>
              <i className="fa fa-print"></i>Imprimir
            </button>
          </div>
        </div>
      </div>
      
    </div>
  );
}