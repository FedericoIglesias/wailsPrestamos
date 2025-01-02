import { models } from "../../wailsjs/go/models";

export const PopUpPrestamoInfo = async (prestamo: models.Prestamo) => {
  const CheckPay = prestamo.CheckPay || [];
  return `<body class="popUpClient">
  <section>
  <header>
    <p>Client: ${prestamo.ClientId}</p>
    <p id="close">&#10060</p>
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
        ${await CheckPay?.map((object: models.CheckPay, index) => {
          return `<tr>
            <td>${index + 1}°</td>
            <td>${object.Month}</td>
            <td style="text-aling:center"><input type="checkbox" ${
              object.Pay ? `checked="checked"` : null
            }></td>
          </tr>`;
        })}
        </tbody>
      </table>
      </div>
    </section>
  </section>
</body>
  `;
};
