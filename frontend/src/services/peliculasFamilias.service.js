import axios from "axios";

const urlResource = "http://localhost:4000/api/peliculasfamilias";

async function Buscar() {
  const resp = await axios.get(urlResource);
  return resp.data;
}

export const peliculasfamiliasService = {
  Buscar
};