import { GetAllClient } from "../../wailsjs/go/main/App.js";
import { Client } from "../vite-env.js";
const $ = (id: string) => document.getElementById(id);
const tbodyClient = $("tbodyClient");
const listClient = GetAllClient().then((data) => data);

const createRowClient = (Client: Client) => {
  return `<tr id=${Client.ID}>
  <td>${Client.Name + " " + Client.Last_Name}</td>
  <td>${Client.Address}</td>
  <td>${Client.Phone}</td>
  <td>${Client.Email}</td>
  <td>${Client.DNI}</td>
  <td>${Client.CUIL}</td>
  <td>${Client.Empresa}</td>
  <td>${Client.Job}</td>
  </tr>`;
};

export const InitTableClient = async () => {
  if (tbodyClient) {
    while (tbodyClient.firstChild) {
      tbodyClient.removeChild(tbodyClient.firstChild);
    }
    (await listClient).map((client: Client) => {
      const row = createRowClient(client);
      tbodyClient.appendChild(document.createElement("tr")).innerHTML = row;
    });
  }
};
