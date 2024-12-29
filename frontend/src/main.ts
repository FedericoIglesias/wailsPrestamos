import { checkClient } from "./utils/createClient.js";
import {
  calculatePrestamo,
  checkPrestamo,
  fillSelectClient,
  showCalculated,
} from "./utils/createPrestamo.js";
import { popUpClientInfo } from "./utils/popUp.js";
import { InitTableClient } from "./utils/tableClient.js";
import { initTablePrestamo } from "./utils/tablePrestamo.js";
const $ = (id: string) => document.getElementById(id);
const $$ = (name: string) => document.querySelector(name);
const addClient = $("add-client");
const addPrestamo = $("add-prestamo");
const tablePrestamo = $("table-prestamo");
const tableClient = $("table-client");
const sectionAddPrestamo = $$(".add-prestamo") as HTMLDivElement;
const sectionAddClient = $$(".add-client") as HTMLDivElement;
const sectionTableClient = $$(".table-client") as HTMLDivElement;
const sectionTablePrestamo = $$(".table-prestamo") as HTMLDivElement;
const btnPrestamo = $("btnPrestamo") as HTMLButtonElement;
const btnClient = $("btnClient") as HTMLButtonElement;
const popUpClient = $("popUpClient");
const body = document.getElementsByTagName("body");

tablePrestamo?.addEventListener("click", async () => {
  await initTablePrestamo();
  sectionAddClient.style.display = "none";
  sectionAddPrestamo.style.display = "none";
  sectionTableClient.style.display = "none";
  sectionTablePrestamo.style.display = "block";
});

addClient?.addEventListener("click", () => {
  sectionAddClient.style.display = "block";
  sectionAddPrestamo.style.display = "none";
  sectionTableClient.style.display = "none";
  sectionTablePrestamo.style.display = "none";
});
addPrestamo?.addEventListener("click", () => {
  fillSelectClient();
  sectionAddClient.style.display = "none";
  sectionAddPrestamo.style.display = "block";
  sectionTableClient.style.display = "none";
  sectionTablePrestamo.style.display = "none";
});

tableClient?.addEventListener("click", () => {
  InitTableClient();
  sectionAddClient.style.display = "none";
  sectionAddPrestamo.style.display = "none";
  sectionTableClient.style.display = "block";
  sectionTablePrestamo.style.display = "none";
});

btnPrestamo.addEventListener("click", () => {
  checkPrestamo();
});

sectionAddPrestamo.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    checkPrestamo();
  }
});

sectionAddPrestamo.addEventListener("change", () => {
  const { toPay } = calculatePrestamo();
  showCalculated(toPay);
});

btnClient.addEventListener("click", () => {
  checkClient();
});

sectionAddClient.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    checkClient();
  }
});

popUpClient?.addEventListener("click", () => {
  const section = document.createElement("body");
  section.className = "popUpClient";
  section.innerHTML = popUpClientInfo();
  body[0].appendChild(section);
  $("close")?.addEventListener("click", () => {
    console.log("hi");
    body[0].removeChild(section);
  });
});
