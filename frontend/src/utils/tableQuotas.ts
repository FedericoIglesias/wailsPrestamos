import { GetQuotasForMonth } from "../../wailsjs/go/main/App";
import { models } from "../../wailsjs/go/models";

const $$ = (name: string) => document.querySelector(name);

const sectionTableQuotas = $$(".table-quotas") as HTMLDivElement;
const section = document.createElement("section");

export const initTbodyQuotas = (listCheckPay: models.CheckPayAndClient[]) => {
  const tbodyQuotas = document.getElementById("tbodyQuotas");

  listCheckPay.map((checkPay: models.CheckPayAndClient) => {
    const tr = document.createElement("tr");
    tr.innerHTML = ` <td>${checkPay.ClientName}</td>
    <td>${checkPay.DNI}</td>
    <td>${checkPay.QuotaNumber}</td>
    <td>${checkPay.Pay}</td>
    `;
    tbodyQuotas?.appendChild(tr);
  });
};

section.innerHTML = `<div id="setGetQuotas">
  <label for="">Mes</label>
  <select name="" id="">
    <option>01</option>
    <option>02</option>
    <option>03</option>
    <option>04</option>
    <option>05</option>
    <option>06</option>
    <option>07</option>
    <option>08</option>
    <option>09</option>
    <option>10</option>
    <option>11</option>
    <option>12</option>
  </select>
  <label for="">Año</label>
  <input type="number">
  <button id="getQuotas">Enviar</button>
</div>
<table class="table">
  <thead>
    <tr>
        <th>Cliente</th>
        <th>DNI</th>
        <th>Cuota Número</th>
        <th>Pago</th>
        <th>Valor Cuota</th>
    </tr>
</thead>
<tbody id="tbodyQuotas">
</tbody>
</table>`;
export const initTableQuotas = () => {
  sectionTableQuotas.appendChild(section);
  document.getElementById("getQuotas")?.addEventListener("click", async () => {
    const div = document.getElementById("setGetQuotas");
    const month = (div?.children[1] as HTMLSelectElement).value;
    const year = (div?.children[3] as HTMLInputElement).value;
    const date = new Date(month + "/01/" + year).getTime();

    const listQuotas = await GetQuotasForMonth(date.toString());
    initTbodyQuotas(listQuotas);
  });
};
