import { GetAllPrestamoTable } from "../../wailsjs/go/main/App.js";
import { PrestamoPlus } from "..//vite-env.js";
const $ = (id: string) => document.getElementById(id);
const tbodyPrestamo = $("tbodyPrestamo");
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
  <td>${null}</td>
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
  }
};
