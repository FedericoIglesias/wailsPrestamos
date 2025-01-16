import { checkClient } from "./utils/createClient.js";
import {
  calculatePrestamo,
  checkPrestamo,
  fillSelectClient,
  showCalculated,
} from "./utils/createPrestamo.js";
import { InitTableClient } from "./utils/tableClient.js";
import { initTablePrestamo } from "./utils/tablePrestamo.js";
import { initTableQuotas } from "./utils/tableQuotas.js";
export const $ = (id: string) => document.getElementById(id);
export const $$ = (name: string) => document.querySelector(name);
const addClient = $("add-client");
const addPrestamo = $("add-prestamo");
const tablePrestamo = $("table-prestamo");
const tableClient = $("table-client");
const tableQuotas = $("table-quotas");
const sectionTableQuotas = $$(".table-quotas") as HTMLDivElement;
const sectionAddPrestamo = $$(".add-prestamo") as HTMLDivElement;
const sectionAddClient = $$(".add-client") as HTMLDivElement;
const sectionTableClient = $$(".table-client") as HTMLDivElement;
const sectionTablePrestamo = $$(".table-prestamo") as HTMLDivElement;
const btnPrestamo = $("btnPrestamo") as HTMLButtonElement;
const btnClient = $("btnClient") as HTMLButtonElement;

tablePrestamo?.addEventListener("click", async () => {
  await initTablePrestamo();
  sectionAddClient.style.display = "none";
  sectionAddPrestamo.style.display = "none";
  sectionTableClient.style.display = "none";
  sectionTablePrestamo.style.display = "block";
  sectionTableQuotas.style.display = "none";
});

addClient?.addEventListener("click", () => {
  sectionAddClient.style.display = "block";
  sectionAddPrestamo.style.display = "none";
  sectionTableClient.style.display = "none";
  sectionTablePrestamo.style.display = "none";
  sectionTableQuotas.style.display = "none";
});
addPrestamo?.addEventListener("click", () => {
  fillSelectClient();
  sectionAddClient.style.display = "none";
  sectionAddPrestamo.style.display = "block";
  sectionTableClient.style.display = "none";
  sectionTablePrestamo.style.display = "none";
  sectionTableQuotas.style.display = "none";
});

tableClient?.addEventListener("click", () => {
  InitTableClient();
  sectionAddClient.style.display = "none";
  sectionAddPrestamo.style.display = "none";
  sectionTableClient.style.display = "block";
  sectionTablePrestamo.style.display = "none";
  sectionTableQuotas.style.display = "none";
});

tableQuotas?.addEventListener("click", () => {
  initTableQuotas()
  sectionAddClient.style.display = "none";
  sectionAddPrestamo.style.display = "none";
  sectionTableClient.style.display = "none";
  sectionTablePrestamo.style.display = "none";
  sectionTableQuotas.style.display = "block";
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
  showCalculated(Number(toPay));
});

btnClient.addEventListener("click", () => {
  checkClient();
});

sectionAddClient.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    checkClient();
  }
});
