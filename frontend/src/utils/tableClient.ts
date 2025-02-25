import { GetAllClient, GetClientPopUp } from "../../wailsjs/go/main/App.js";
import { models } from "../../wailsjs/go/models.js";
import { popUpClientInfo } from "./ClientpopUp.js";
import { detailsPrestamos } from "./tablePrestamo.js";
import { capitalize, checkLong } from "./utils.js";
const $ = (id: string) => document.getElementById(id);
const tbodyClient = $("tbodyClient");
const body = document.getElementsByTagName("body");

const createRowClient = (Client: models.Client) => {
  return `<tr id=${Client.ID}>
  <td>${checkLong(capitalize(Client.Name + " " + Client.Last_Name))}</td>
  <td>${checkLong(capitalize(Client.Address))}</td>
  <td>${checkLong(capitalize(Client.Zone))}</td>
  <td>${checkLong(Client.Phone)}</td>
  <td>${checkLong(Client.DNI)}</td>
  <td>${checkLong(capitalize(Client.Empresa))}</td>
  <td>${checkLong(capitalize(Client.Job))}</td>
  <td><button class="infoClient" id="${Client.ID}">&#128269</button></td>
  </tr>`;
};

export const InitTableClient = async () => {
  if (tbodyClient) {
    while (tbodyClient.firstChild) {
      tbodyClient.removeChild(tbodyClient.firstChild);
    }
    const listClient = GetAllClient().then((data) => {
      return data;
    });
    (await listClient).map((client: models.Client) => {
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
