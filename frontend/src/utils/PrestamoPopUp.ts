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
      <p>Monto prestado: ${prestamo.Amount} $</p>
      <p>Intereses: ${prestamo.Interest}</p>
      <p>Fecha: ${new Date(Number(prestamo.Date)).toLocaleDateString(
        "es-ES"
      )}</p>
      <p>Cuotas: ${prestamo.Quota}</p>
      <p>Total: ${prestamo.TotalAmount} $</p>
      <p>Pagado: ${prestamo.AmountPaid} $</p>
      <p>Restante: ${(
        Number(prestamo.TotalAmount) - Number(prestamo.AmountPaid)
      ).toFixed(2)} $</p>
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
    text += `<tr id="miniLoanTable">
    <td>${listCheckPay[i].QuotaNumber}</td>
    <td>${formatDate(listCheckPay[i].DatePay)}</td>
    <td style="text-aling:center"><input type="checkbox" ${
      listCheckPay[i].Pay ? `checked="checked"` : null
    } id="checked${i}" ></td>
    </tr>`;
  }
  return text;
};

const formatDate = (date: string) => {
  const newDate = new Date(Number(date));
  return newDate.getMonth() + 1 + "/" + newDate.getFullYear();
};
