import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function ProyeccionesRegistro({
  AccionABMC,
  Item,
  Grabar,
  Volver,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isValid, isSubmitted },
  } = useForm({ values: Item });

  const onSubmit = (data) => {
    Grabar(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="container-fluid">

        <fieldset disabled={AccionABMC === "C"}>

            {/* campo Proy_Fecha */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="Proy_Fecha">
              Fecha <span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="date"
                {...register("Proy_Fecha", {
                  required: { value: true, message: "Fecha es requerido" }
                })}
                className={
                  "form-control " + (errors?.Proy_Fecha ? "is-invalid" : "")
                }
              />
              <div className="invalid-feedback">
                {errors?.Proy_Fecha?.message}
              </div>
            </div>
          </div>

          {/* campo Proy_Hora */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="Proy_Hora">
              Hora <span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="text"
                {...register("Proy_Hora", {
                  required: { value: true, message: "Hora es requerido" }
                })}
                className={
                  "form-control " + (errors?.Proy_Hora ? "is-invalid" : "")
                }
              />
              <div className="invalid-feedback">
                {errors?.Proy_Hora?.message}
              </div>
            </div>
          </div>      

          
          {/* campo Proy_NroSala */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="Proy_NroSala">
              Nro Sala <span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="number"
                {...register("Proy_NroSala", {
                  required: { value: true, message: "Nro Sala es requerido" },
                  min: {
                    value: 1,
                    message: "Nro Sala debe ser mayor a 1",
                  },
                  max: {
                    value: 4,
                    message: "Nro Sala debe ser menor o igual a 4",
                  },
                })}
                className={
                  "form-control " + (errors?.Proy_NroSala ? "is-invalid" : "")
                }
              />
              <div className="invalid-feedback">{errors?.Proy_NroSala?.message}</div>
            </div>
          </div>
          
           {/* campo Peli_Codigo */}
           <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="Peli_Codigo">
              Codigo Pelicula<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="number"
                {...register("Peli_Codigo", {
                  required: { value: true, message: "Codigo Pelicula es requerido" },
                  min: {
                    value: 1,
                    message: "Codigo Pelicula debe ser mayor a 1",
                  },
                  max: {
                    value: 99999999,
                    message: "Codigo Pelicula debe ser menor o igual a 99999999",
                  },
                })}
                className={
                  "form-control " + (errors?.Peli_Codigo ? "is-invalid" : "")
                }
              />
              <div className="invalid-feedback">{errors?.Peli_Codigo?.message}</div>
            </div>
          </div>

        </fieldset>

        {/* Botones Grabar, Cancelar/Volver' */}
        <hr />
        <div className="row justify-content-center">
          <div className="col text-center botones">
            {AccionABMC !== "C" && (
              <button type="submit" className="btn btn-primary">
                <i className="fa fa-check"></i> Grabar
              </button>
            )}
            <button
              type="button"
              className="btn btn-warning"
              onClick={() => Volver()}
            >
              <i className="fa fa-undo"></i>
              {AccionABMC === "C" ? " Volver" : " Cancelar"}
            </button>
          </div>
        </div>

        {/* texto: Revisar los datos ingresados... */}
        {!isValid && isSubmitted && (
          <div className="row alert alert-danger mensajesAlert">
            <i className="fa fa-exclamation-sign"></i>
            Revisar los datos ingresados...
          </div>
        )}

      </div>
    </form>
  );

}