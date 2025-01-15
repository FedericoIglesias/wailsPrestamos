import { $$ } from "../main";

const sectionTableQuotas = $$(".table-quotas") as HTMLDivElement;
const section = document.createElement("section");
section.innerHTML = `  <div>
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
  <button>Enviar</button>
</div>
<table>
  <thead>
    <tr>
        <th>Cliente</th>
        <th> Cuota Número </th>
        <th>Pago</th>
        <th>DNI</th>
        <th>Valor Cuota</th>
    </tr>
</thead>
<tbody id="tbodyQuotas">
</tbody>
</table>`;
export const initTableQuotas = () => {
  sectionTableQuotas.appendChild(section);
};
