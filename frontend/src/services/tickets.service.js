import axios from "axios";

const urlResource = "http://localhost:4000/api/tickets";

async function Buscar(But_Fila,Pagina) {
  const resp = await axios.get(urlResource, {
    params: { But_Fila,Pagina},
  });
  return resp.data;
}

async function BuscarPorId(item) {
  const resp = await axios.get(urlResource + "/" + item.Tick_Id);
  return resp.data;
}

async function ActivarDesactivar(item) {
  await axios.delete(urlResource + "/" + item.Tick_Id);
}

async function Grabar(item) {
  if (item.Tick_Id === 0) {
    await axios.post(urlResource, item);
  } else {
    await axios.put(urlResource + "/" + item.Tick_Id, item);
  }
}

export const ticketsService = {
  Buscar,BuscarPorId,ActivarDesactivar,Grabar
};
