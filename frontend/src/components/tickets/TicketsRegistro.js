import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function TicketsRegistro({
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

           
          {/* campo FechaAlta */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="Tick_FechaVenta">
                Fecha Alta<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="date"
                {...register("Tick_FechaVenta", {
                  required: { value: true, message: "Fecha Alta es requerido" }
                })}
                className={
                  "form-control " + (errors?.Tick_FechaVenta ? "is-invalid" : "")
                }
              />
              <div className="invalid-feedback">
                {errors?.Tick_FechaVenta?.message}
              </div>
            </div>
          </div>

          {/* campo Cli_DNI */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="Cli_DNI">
                DNI<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="number"
                {...register("Cli_DNI", {
                  required: { value: true, message: "DNI es requerido" },
                  min: {
                    value: 0,
                    message: "DNI debe ser mayor a 0",
                  },
                  max: {
                    value: 99999999,
                    message: "DNI debe ser menor o igual a 99999999",
                  },
                })}
                className={
                  "form-control " + (errors?.Cli_DNI ? "is-invalid" : "")
                }
              />
              <div className="invalid-feedback">{errors?.Cli_DNI?.message}</div>
            </div>
          </div>

            {/* campo Fila Butaca */}
            <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="But_Fila">
              Fila Butaca<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="text"
                {...register("But_Fila", {
                  required: { value: true, message: "Fila Butaca es requerido" },
                  minLength: {
                    value: 1,
                    message: "Fila Butaca debe tener al menos 1 caracter",
                  },
                  maxLength: {
                    value: 1,
                    message: "Fila Butaca debe tener como máximo 1 caracter",
                  },
                  pattern: {
                    value: /^[A-Za-z]+$/,
                    message: "Solo se permiten caracteres de la A a la Z",
                  }
                })}
                autoFocus
                className={
                  "form-control " + (errors?.But_Fila ? "is-invalid" : "")
                }
              />
              {errors?.But_Fila && touchedFields.But_Fila && (
                <div className="invalid-feedback">
                  {errors?.But_Fila?.message}
                </div>
              )}
            </div>
          </div>

            {/* campo Nro Butaca */}
            <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="But_Nro">
              Nro Butaca<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="number"
                {...register("But_Nro", {
                  required: { value: true, message: "Nro Butaca es requerido" },
                  min: {
                    value: 1,
                    message: "Nro Butaca debe ser mayor a 0",
                  },
                  max: {
                    value: 50,
                    message: "Nro Butaca debe ser menor o igual a 50",
                  },
                })}
                className={
                  "form-control " + (errors?.But_Nro ? "is-invalid" : "")
                }
              />
              <div className="invalid-feedback">{errors?.But_Nro?.message}</div>
            </div>
          </div>

        {/* campo Codigo Proyeccion */}
        <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="Proy_Codigo">
              Codigo Proyeccion<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="number"
                {...register("Proy_Codigo", {
                  required: { value: true, message: "Codigo Proyeccion es requerido" },
                  min: {
                    value: 1,
                    message: "Codigo Proyeccion debe ser mayor a 1",
                  },
                  max: {
                    value: 10,
                    message: "Codigo Proyeccion debe ser menor o igual a 10",
                  },
                })}
                className={
                  "form-control " + (errors?.Proy_Codigo ? "is-invalid" : "")
                }
              />
              <div className="invalid-feedback">{errors?.Proy_Codigo?.message}</div>
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
