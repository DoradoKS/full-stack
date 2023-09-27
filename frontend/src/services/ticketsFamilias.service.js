import axios from "axios";

const urlResource = "http://localhost:4000/api/ticketsfamilias";

async function Buscar() {
  const resp = await axios.get(urlResource);
  return resp.data;
}

export const ticketsfamiliasService = {
  Buscar
};