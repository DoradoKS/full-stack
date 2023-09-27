import React from "react";
export default function ProyeccionesBuscar ({Proy_Hora, setProy_Hora, Buscar, Agregar}) {

    return (
    <form name="FormBusqueda">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-4 col-md-2">
            <label className="col-form-label">Hora Proyeccion:</label>
          </div>
          <div className="col-sm-8 col-md-4">
            <input
              type="time"
              className="form-control"
              onChange={(e) => setProy_Hora(e.target.value)}
              value={Proy_Hora}
              maxLength="60"
              autoFocus
            />
          </div>
        </div>
  
        <hr />
  
        {/* Botones */}
        <div className="row">
          <div className="col text-center botones">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => Buscar(1) }
          >
            <i className="fa fa-search"> </i> Buscar
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => Agregar() }
          >
            <i className="fa fa-plus"> </i> Agregar
          </button>
          </div>
        </div>
      </div>
    </form>
    )
  };