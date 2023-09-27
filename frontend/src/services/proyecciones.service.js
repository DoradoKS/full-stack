import axios from "axios";

const urlResource = "http://localhost:4000/api/proyecciones";

async function Buscar(Proy_Hora,Pagina) {
  const resp = await axios.get(urlResource, {
    params: { Proy_Hora,Pagina},
  });
  return resp.data;
}

async function BuscarPorId(item) {
  const resp = await axios.get(urlResource + "/" + item.Proy_Codigo);
  return resp.data;
}

async function ActivarDesactivar(item) {
  await axios.delete(urlResource + "/" + item.Proy_Codigo);
}

async function Grabar(item) {
  if (item.Proy_Codigo === 0) {
    await axios.post(urlResource, item);
  } else {
    await axios.put(urlResource + "/" + item.Proy_Codigo, item);
  }
}

export const proyeccionesService = {
  Buscar,BuscarPorId,ActivarDesactivar,Grabar
};