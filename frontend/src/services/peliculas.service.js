import axios from "axios";

const urlResource = "http://localhost:4000/api/peliculas";

async function Buscar(Peli_Titulo,Pagina) {
  const resp = await axios.get(urlResource, {
    params: { Peli_Titulo,Pagina},
  });
  return resp.data;
}

async function BuscarPorId(item) {
  const resp = await axios.get(urlResource + "/" + item.Peli_Codigo);
  return resp.data;
}

async function ActivarDesactivar(item) {
  await axios.delete(urlResource + "/" + item.Peli_Codigo);
}

async function Grabar(item) {
  if (item.Peli_Codigo === 0) {
    await axios.post(urlResource, item);
  } else {
    await axios.put(urlResource + "/" + item.Peli_Codigo, item);
  }
}

export const peliculasService = {
  Buscar,BuscarPorId,ActivarDesactivar,Grabar
};