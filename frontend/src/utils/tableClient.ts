import { GetAllClient, GetClientPopUp } from "../../wailsjs/go/main/App.js";
import { Client } from "../vite-env.js";
import { popUpClientInfo } from "./popUp.js";
const $ = (id: string) => document.getElementById(id);
const tbodyClient = $("tbodyClient");
const listClient = GetAllClient().then((data) => data);
const body = document.getElementsByTagName("body");

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
  <td><button class="infoClient" id="${Client.ID}">&#128269</button></td>
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
  const rows = Array.from(document.querySelectorAll(".infoClient"));

  if (rows.length)
    for (const row of rows) {
      row.addEventListener("click", async () => {
        const section = document.createElement("body");
        section.className = "popUpClient";
        section.innerHTML = popUpClientInfo();
        body[0].appendChild(section);
        console.log(await GetClientPopUp(row.id));
        $("close")?.addEventListener("click", () => {
          body[0].removeChild(section);
        });
      });
    }
};
