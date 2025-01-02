import { GetAllPrestamoTable, GetPrestamo } from "../../wailsjs/go/main/App.js";
import { PrestamoPlus } from "../vite-env.js";
import { PopUpPrestamoInfo } from "./PrestamoPopUp.js";
const $ = (id: string) => document.getElementById(id);
const tbodyPrestamo = $("tbodyPrestamo");
const body = document.getElementsByTagName("body");
const listPrestamoPlus = GetAllPrestamoTable().then((data) => data || []);

const createRowPrestamo = (prestamo: PrestamoPlus) => {
  const date = new Date(prestamo.Date).toLocaleDateString("es-ES");
  return `<tr>
  <td>${prestamo.ClientName}</td>
  <td>${prestamo.Amount}</td>
  <td>${prestamo.Interest}</td>
  <td>${date}</td>
  <td>${prestamo.Cuota}</td>
  <td>${null}</td>
  <td><td><button class="infoPrestamo" id="${
    prestamo.ID
  }">&#128269</button></td></td>
  </tr>`;
};

export const initTablePrestamo = async () => {
  if (tbodyPrestamo) {
    while (tbodyPrestamo.firstChild) {
      tbodyPrestamo.removeChild(tbodyPrestamo.firstChild);
    }
    if (listPrestamoPlus)
      (await listPrestamoPlus).map((Prestamo: PrestamoPlus) => {
        const row = createRowPrestamo(Prestamo);
        tbodyPrestamo.appendChild(document.createElement("tr")).innerHTML = row;
      });
    detailsPrestamos();
  }
};

export const detailsPrestamos = () => {
  const rows = Array.from(document.querySelectorAll(".infoPrestamo"));

  if (rows.length)
    for (const row of rows) {
      row.addEventListener("click", async () => {
        const prestamo = await GetPrestamo(row.id);
        const section = document.createElement("body");
        section.className = "popUpClient";
        section.innerHTML = await PopUpPrestamoInfo(prestamo);
        body[0].appendChild(section);
        $("closeP")?.addEventListener("click", () => {
          body[0].removeChild(section);
        });
      });
    }
};
