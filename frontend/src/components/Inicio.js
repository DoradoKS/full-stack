import React from 'react';     //necesaria en stackblitz 
import { Link } from "react-router-dom";
function Inicio() {
  return (
    <div className="mt-4 p-5 rounded" style={{ backgroundColor: "lightgray" }}>
      <h1>¡¡¡ BIENVENIDOS A GALAXY CINEMA !!!</h1>
      <p>
        Podras ver que peliculas oferecemos, sus fechas y horarios de proyeccion.
      </p>
      <p>¡Bienvenidos a Galaxy Cinema!. 
      Nuestro cine te ofrecera una amplia selección de películas que te harán 
      soñar, reír y emocionarte. Disfruta de nuestras cómodas butacas, rodeado de un ambiente acogedor y 
      temático, mientras te deleitas con las últimas producciones cinematográficas. 
      ¡Déjate llevar por la gran pantalla en Galaxy Meow Cinema!</p>
    </div>
  );
}
export { Inicio };
