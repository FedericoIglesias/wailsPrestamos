import { ClientPopUp, PrestamoToPopUpClient } from "../vite-env";

export const popUpClientInfo = (client: ClientPopUp) => {
  const { AmountPaid, AmountToPay } = calculateAmount(client.Prestamos);

  return `<body class="popUp">
  <section>
    <header>
      <p></p>
      <p id="close">&#10060</p>
    </header>
    <section>
      <div>
        <p>Información Personal:</p>
        <p>Nombre: ${client.Name}</p>
        <p>Apellido: ${client.Last_Name}</p>
        <p>DNI: ${client.DNI}</p>
        <p>CUIL: ${client.CUIL}</p>
        <p>Teléfono: ${client.Phone}</p>
        <p>Dirección: ${client.Address}</p>
        <p>Empresa: ${client.Empresa}</p>
        <p>Puesto: ${client.Job}</p>
      </div>
      <div>
        <p>Información Prestamos:</p>
        <p>Cantidad de Prestamos: ${client.PrestamoAmount}</p>
        <p>Cantidad de Monto a pagar: ${AmountToPay}</p>
        <p>Cantidad de Monto pagado: ${AmountPaid}</p>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>Monto</th>
              <th>Intereses</th>
              <th>Fecha</th>
              <th>Cuotas</th>
            </tr>
          </thead>
          <tbody id="tbodyPrestamo">
          ${
            client.Prestamos?.map((prestamo) => {
              return `<tr>
              <td>${prestamo.Amount}</td>
              <td>${prestamo.Interest}</td>
              <td>${new Date(prestamo.Date).toLocaleDateString("es-ES")}</td>
              <td>${prestamo.Cuota}</td>
              <td><button class="infoPrestamo" id="${
                prestamo.ID
              }">&#128269</button></td>
            </tr>`;
            }) || ""
          }
          </tbody>
        </table>
      </div>
    </section>
  </section>
</body>`;
};

const calculateAmount = (listPrestamo: PrestamoToPopUpClient[]) => {
  let AmountToPay = 0;
  let AmountPaid = 0;

  listPrestamo?.map((prestamo) => {
    AmountToPay += Number(prestamo.TotalAmount) - Number(prestamo.AmountPaid);
    AmountPaid += Number(prestamo.AmountPaid);
  });
  return { AmountPaid, AmountToPay };
};
