import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function PeliculasRegistro({
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

           {/* campo Peli_Titulo */}
           <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="Peli_Titulo">
              Titulo Pelicula<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="text"
                {...register("Peli_Titulo", {
                  required: { value: true, message: "Titulo Pelicula es requerido" },
                  minLength: {
                    value: 2,
                    message: "Titulo Pelicula debe tener al menos 2 caracteres",
                  },
                  maxLength: {
                    value: 60,
                    message: "Titulo Pelicula debe tener como máximo 60 caracteres",
                  }
                })}
                autoFocus
                className={
                  "form-control " + (errors?.Peli_Titulo ? "is-invalid" : "")
                }
              />
              {errors?.Peli_Titulo && touchedFields.Peli_Titulo && (
                <div className="invalid-feedback">
                  {errors?.Peli_Titulo?.message}
                </div>
              )}
            </div>
          </div>

          {/* campo Peli_Duracion */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="Peli_Duracion">
              Duracion<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="text"
                {...register("Peli_Duracion", {
                  required: { value: true, message: "Duracion Pelicula es requerido" },
                  minLength: {
                    value: 5,
                    message: "Duracion debe tener al menos 5 caracteres",
                  },
                  maxLength: {
                    value: 10,
                    message: "Duracion debe tener como máximo 10 caracteres",
                  },
                  pattern: {
                    value: /^[0-9]+\s+min$/,
                    message: "Ingresa un número válido seguido de 'min'."
                  }
                })}
                autoFocus
                className={
                  "form-control " + (errors?.Peli_Duracion ? "is-invalid" : "")
                }
              />
              {errors?.Peli_Duracion && touchedFields.Peli_Duracion && (
                <div className="invalid-feedback">
                  {errors?.Peli_Duracion?.message}
                </div>
              )}
            </div>
          </div>

          {/* campo Peli_Genero */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="Peli_Genero">
              Genero<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="text"
                {...register("Peli_Genero", {
                  required: { value: true, message: "Genero Pelicula es requerido" },
                  minLength: {
                    value: 5,
                    message: "Genero Pelicula debe tener al menos 5 caracteres",
                  },
                  maxLength: {
                    value: 30,
                    message: "Genero Pelicula debe tener como máximo 30 caracteres",
                  }
                })}
                autoFocus
                className={
                  "form-control " + (errors?.Peli_Genero ? "is-invalid" : "")
                }
              />
              {errors?.Peli_Genero && touchedFields.Peli_Genero && (
                <div className="invalid-feedback">
                  {errors?.Peli_Genero?.message}
                </div>
              )}
            </div>
          </div>


          {/* campo Peli_Clase */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="Peli_Clase">
              Clase<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
            <select
                name="Peli_Clase"
                {...register("Peli_Clase", {
                  required: { value: true, message: "Clase es requerido" },
                })}
                className={
                  "form-control" + (errors?.Peli_Clase ? " is-invalid" : "")
                }
                
              >
                <option value={null}></option>
                <option value={"APT"}>APT - Apta para todos los públicos.</option>
                <option value={"SAM13"}>SAM13 - SOLO APTA MAYORES DE 13 AÑOS</option>
                <option value={"SAM16"}>SAM13 - SOLO APTA MAYORES DE 16 AÑOS</option>
                <option value={"SAM18"}>SAM13 - SOLO APTA MAYORES DE 18 AÑOS</option>
                <option value={"SAM13"}>SAM13 - SOLO APTA MAYORES DE 13 AÑOS</option>
              </select>
              <div className="invalid-feedback">{errors?.Peli_Clase?.message}</div>
            </div>
          </div>

          

          {/* campo Peli_FechaLanzamiento */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="Peli_FechaLanzamiento">
              Fecha Lanzamiento<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="date"
                {...register("Peli_FechaLanzamiento", {
                  required: { value: true, message: "Fecha Lanzamiento es requerido" }
                })}
                className={
                  "form-control " + (errors?.Peli_FechaLanzamiento ? "is-invalid" : "")
                }
              />
              <div className="invalid-feedback">
                {errors?.Peli_FechaLanzamiento?.message}
              </div>
            </div>
          </div>

          {/* campo Peli_CantVisualizaciones */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="Peli_CantVisualizaciones">
              Cant. Visualizaciones<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="number"
                {...register("Peli_CantVisualizaciones", {
                  required: { value: true, message: "Cant. Visualizaciones es requerido" },
                  min: {
                    value: 1,
                    message: "Cant. Visualizaciones debe ser mayor a 1",
                  },
                  max: {
                    value: 99999999,
                    message: "Cant. Visualizaciones debe ser menor o igual a 99999999",
                  },
                })}
                className={
                  "form-control " + (errors?.Peli_CantVisualizaciones ? "is-invalid" : "")
                }
              />
              <div className="invalid-feedback">{errors?.Peli_CantVisualizaciones?.message}</div>
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
