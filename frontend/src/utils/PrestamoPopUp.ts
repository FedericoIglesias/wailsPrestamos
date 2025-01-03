import { models } from "../../wailsjs/go/models";
import { capitalize } from "./utils";

export const PopUpPrestamoInfo = (
  prestamo: models.Prestamo,
  client: string
) => {
  const CheckPay = prestamo.CheckPay || [];
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
      <p>Cuotas: ${prestamo.Cuota}</p>
      <p>Resta: ${null}</p>
      <p>Estado: ${null}</p>
    </div>
    <div>
      <table>
        <thead>
          <tr>
            <th>Cuota N°</th>
            <th>Mes</th>
            <th>Pagado</th>
          </tr>
        </thead>
        <tbody id="tbodyPrestamo">
        ${insertCheckPay(CheckPay)}
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
    text += `<tr><td>${i + 1}°</td><td>${
      listCheckPay[i].Month
    }</td><td style="text-aling:center"><input type="checkbox" ${
      listCheckPay[i].Pay ? `checked="checked"` : null
    } id="checked${i}" ></td></tr>`;
  }
  return text;
};
