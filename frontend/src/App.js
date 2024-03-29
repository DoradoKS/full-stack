import "./App.css";
import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Menu from "./components/Menu";
import { Footer } from "./components/Footer";
import { Inicio } from "./components/Inicio";
import { Tickets } from "./components/tickets/Tickets";
import { Peliculas } from "./components/peliculas/Peliculas";
import { Proyecciones } from "./components/proyecciones/Proyecciones";
function App() {
  return (
    <>
        <BrowserRouter>
          <Menu />
          <div className="divBody">
            <Routes>
              <Route path="/inicio" element={<Inicio />} />
              <Route path="/tickets" element={<Tickets/>} />
              <Route path="/proyecciones" element={<Proyecciones/>} />
              <Route path="/peliculas" element={<Peliculas/>} />
              <Route path="*" element={<Navigate to="/inicio" replace />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
    </>
  );
}
export default App;


