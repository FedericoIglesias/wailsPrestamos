import { GetAllLoanTable, GetLoan, UpdateLoan } from "../../wailsjs/go/main/App.js";
import { models } from "../../wailsjs/go/models.js";
import { PopUpPrestamoInfo } from "./PrestamoPopUp.js";
import { capitalize, checkLong } from "./utils.js";
const $ = (id: string) => document.getElementById(id);
const tbodyPrestamo = $("tbodyPrestamo");
const body = document.getElementsByTagName("body");
const listPrestamoPlus = GetAllLoanTable().then((data) => data || []);

const createRowPrestamo = (prestamo: models.LoanTable) => {
  const date = new Date(Number(prestamo.Date)).toLocaleDateString("es-ES");
  return `<tr>
  <td>${checkLong(capitalize(prestamo.ClientName))}</td>
  <td>${checkLong(prestamo.LoanNumber)}</td>
  <td>${checkLong(prestamo.Amount)}</td>
  <td>${checkLong(prestamo.Interest)}</td>
  <td>${checkLong(date)}</td>
  <td>${checkLong(prestamo.Quota)}</td>
  <td><button class="infoPrestamo" id="${
    prestamo.ID + "." + prestamo.ClientName
  }">&#128269</button></td>
  </tr>`;
};

export const initTablePrestamo = async () => {
  if (tbodyPrestamo) {
    while (tbodyPrestamo.firstChild) {
      tbodyPrestamo.removeChild(tbodyPrestamo.firstChild);
    }
    if (listPrestamoPlus)
      (await listPrestamoPlus).map((Prestamo: models.LoanTable) => {
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
        const prestamo = await GetLoan(row.id.split(".")[0]);
        const section = document.createElement("body");
        section.className = "popUp";
        section.innerHTML = PopUpPrestamoInfo(prestamo, row.id.split(".")[1]);
        body[0].appendChild(section);
        document
          .getElementsByClassName("savePrestamo")[0]
          .addEventListener("click", () => {
            savePrestamo(prestamo);
          });
        $("closeP")?.addEventListener("click", () => {
          body[0].removeChild(section);
        });
      });
    }
};

export const savePrestamo = (prestamo: models.Loan) => {
  const listRow = Array.from(document.querySelectorAll("#miniLoanTable"));
  const listCheckPay: models.CheckPay[] = [];

  for (let row of listRow) {
    const pay = (row.lastChild?.firstChild as HTMLInputElement).checked;
    const stringDate = (row.childNodes[1] as HTMLTableCellElement).nextSibling
      ?.firstChild?.nodeValue;
      let date 
    if (stringDate) {
      date = new Date("01/"+stringDate).getTime()
    }
    const checPay: models.CheckPay = {
      QuotaNumber: (row.firstChild as HTMLTableCellElement).innerText,
      DatePay: date?.toString() || "",
      Pay: pay,
    };
    console.log(checPay)
    listCheckPay.push(checPay);
  }
  prestamo.CheckPay = listCheckPay;
  UpdateLoan(prestamo);
};
