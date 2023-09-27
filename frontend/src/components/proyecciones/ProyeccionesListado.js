import React from "react";
import moment from "moment";

export default function ProyeccionesListado({
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
            <th className="text-center">Fecha</th>
            <th className="text-center">Hora</th>
            <th className="text-center">Nro Sala</th>
            <th className="text-center">Codigo Pelicula</th>
            <th className="text-center text-nowrap">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {Items &&
            Items.map((Item) => (
              <tr key={Item.Proy_Codigo}>
                <td className="text-end">
                  {moment(Item.Proy_Fecha).format("DD/MM/YYYY")}
                </td>
                <td className="text-end">{Item.Proy_Hora}</td>
                <td className="text-end">{Item.Proy_NroSala}</td>
                <td className="text-end">{Item.Peli_Codigo}</td>              
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