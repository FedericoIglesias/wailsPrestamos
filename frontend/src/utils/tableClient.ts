import { GetAllClient, GetClientPopUp } from "../../wailsjs/go/main/App.js";
import { Client } from "../vite-env.js";
import { popUpClientInfo } from "./ClientPopUp.js";
import { detailsPrestamos } from "./tablePrestamo.js";
import { capitalize } from "./utils.js";
const $ = (id: string) => document.getElementById(id);
const tbodyClient = $("tbodyClient");
const listClient = GetAllClient().then((data) => data);
const body = document.getElementsByTagName("body");

const createRowClient = (Client: Client) => {
  return `<tr id=${Client.ID}>
  <td>${
    Client.Name.split(" ").map((word) => {
      return capitalize(word);
    }) +
    " " +
    Client.Last_Name.split(" ").map((word) => {
      return capitalize(word);
    })
  }</td>
  <td>${capitalize(Client.Address)}</td>
  <td>${Client.Phone}</td>
  <td>${Client.Email}</td>
  <td>${Client.DNI}</td>
  <td>${Client.CUIL}</td>
  <td>${capitalize(Client.Empresa)}</td>
  <td>${capitalize(Client.Job)}</td>
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
        const clientInfo = await GetClientPopUp(row.id);
        const section = document.createElement("body");
        section.className = "popUp";
        section.innerHTML = popUpClientInfo(clientInfo);
        body[0].appendChild(section);
        detailsPrestamos();
        $("close")?.addEventListener("click", () => {
          body[0].removeChild(section);
        });
      });
    }
};
