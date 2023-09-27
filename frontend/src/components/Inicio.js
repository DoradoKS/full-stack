import React from 'react';     //necesaria en stackblitz 
import { Link } from "react-router-dom";
function Inicio() {
  return (
    <div className="mt-4 p-5 rounded" style={{ backgroundColor: "lightgray" }}>
      <h1>¡¡¡ BIENVENIDOS A GALAXY MEOW CINEMA !!!</h1>
      <p>Pagina aun en desarrollo ... pero funcional :D 
        Podras ver que peliculas oferecemos, sus fechas y horarios de proyeccion y comprar tickets.
      </p>
      <p>¡Bienvenidos a Galaxy Meow Cinema! Sumérgete en un universo lleno de magia cinematográfica donde 
      las estrellas del cine y los gatos se fusionan en una experiencia única. Nuestro cine te transportará 
      a través de las galaxias de la imaginación, ofreciendo una amplia selección de películas que te harán 
      soñar, reír y emocionarte. Disfruta de nuestras cómodas butacas, rodeado de un ambiente acogedor y 
       temático, mientras te deleitas con las últimas producciones cinematográficas de diversas dimensiones. 
      Desde épicos espaciales hasta encantadoras historias felinas, en Galaxy Meow Cinema encontrarás un catálogo 
      de películas para satisfacer todos los gustos. ¡Déjate llevar por el brillo de las estrellas y 
      el ronroneo de la gran pantalla en Galaxy Meow Cinema!</p>
   

    </div>
  );
}
export { Inicio };
