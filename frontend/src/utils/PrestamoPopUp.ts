import { models } from "../../wailsjs/go/models";
import { capitalize } from "./utils";

export const PopUpPrestamoInfo = (prestamo: models.Loan, client: string) => {
  return `<body class="popUp">
  <section>
  <header>
    <p>${capitalize(client)}</p>
    <p id="closeP">&#10060</p>
  </header>
    <section>
    <div>
      <p>Detalles:</p>
      <p>Monto: ${prestamo.Amount}</p>
      <p>Intereses: ${prestamo.Interest}</p>
      <p>Fecha: ${new Date(prestamo.Date).toLocaleDateString("es-ES")}</p>
      <p>Cuotas: ${prestamo.Quota}</p>
    </div>
    <div>
      <table>
        <thead>
          <tr>
            <th>Cuota N°</th>
            <th>Fecha</th>
            <th>Pagado</th>
          </tr>
        </thead>
        <tbody id="tbodyPrestamo">
        ${insertCheckPay(prestamo.CheckPay)}
        </tbody>
      </table>
      </div>
      <button class="savePrestamo">Guardar</button>
    </section>
  </section>
</body>
  `;
};

const insertCheckPay = (listCheckPay: models.CheckPay[]) => {
  let text = "";
  if (!listCheckPay) return "";
  for (let i = 0; i < listCheckPay.length; ++i) {
    text += `<tr id="miniLoanTable"><td>${listCheckPay[i].QuotaNumber}</td>
    <td>${formatDate(listCheckPay[i].DatePay)}</td>
    <td style="text-aling:center"><input type="checkbox" ${
      listCheckPay[i].Pay ? `checked="checked"` : null
    } id="checked${i}" ></td></tr>`;
  }
  return text;
};

const formatDate = (date: string) => {
  const month = new Date(Number(date)).getMonth() + 1 ;
  const year = new Date(Number(date)).getFullYear();
  return month +"/" + year;
};
