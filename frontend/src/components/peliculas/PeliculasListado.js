import React from "react";
import moment from "moment";

export default function PeliculasListado({
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
            <th className="text-center">Titulo</th>
            <th className="text-center">Duracion</th>
            <th className="text-center">Genero</th>
            <th className="text-center">Clase</th>
            <th className="text-center">Fecha Lanzamiento</th>
            <th className="text-center">Cant. Vis.</th>
            <th className="text-center text-nowrap">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {Items &&
            Items.map((Item) => (
              <tr key={Item.Peli_Codigo}>
                <td>{Item.Peli_Titulo}</td>
                <td>{Item.Peli_Duracion}</td>
                <td>{Item.Peli_Genero}</td>
                <td>{Item.Peli_Clase}</td>
                <td className="text-end">
                  {moment(Item.Peli_FechaLanzamiento).format("DD/MM/YYYY")}
                </td>
                <td className="text-end">{Item.Peli_CantVisualizaciones}</td>
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