import { models } from "../../wailsjs/go/models";
import { capitalize } from "./utils";

export const popUpClientInfo = (client: models.ClientPopUp) => {
  const { AmountPaid, AmountToPay } = calculateAmount(client.Loans);

  return `<body class="popUp">
  <section>
    <header>
      <p></p>
      <p id="close">&#10060</p>
    </header>
    <section>
      <div>
        <p>Información Personal:</p>
        <p>Nombre: ${capitalize(client.Name)}</p>
        <p>Apellido: ${capitalize(client.Last_Name)}</p>
        <p>DNI: ${client.DNI}</p>
        <p>CUIL: ${client.CUIL}</p>
        <p>Teléfono: ${client.Phone}</p>
        <p>Dirección: ${capitalize(client.Address)}</p>
        <p>Empresa: ${capitalize(client.Empresa)}</p>
        <p>Puesto: ${capitalize(client.Job)}</p>
      </div>
      <div>
        <p>Información Prestamos:</p>
        <p>Cantidad de Prestamos: ${client.LoanAmount}</p>
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
            printTableLoan(client)
          }
          </tbody>
        </table>
      </div>
    </section>
  </section>
</body>`;
};

const calculateAmount = (listLoan: models.LoanToPopUpClient[]) => {
  let AmountToPay = 0;
  let AmountPaid = 0;

  listLoan?.map((loan) => {
    AmountToPay += Number(loan.TotalAmount) - Number(loan.AmountPaid);
    AmountPaid += Number(loan.AmountPaid);
  });
  return { AmountPaid, AmountToPay };
};

const printTableLoan = (client: models.ClientPopUp) => {
  let text = "";
  for (let loan of client.Loans) {
    text += `<tr>
              <td>${loan.Amount}</td>
              <td>${loan.Interest}</td>
              <td>${new Date(Number(loan.Date)).toLocaleDateString("es-ES")}</td>
              <td>${loan.Quota}</td>
              <td><button class="infoPrestamo" id="${
                loan.ID + "." + client.Name + " " + client.Last_Name
              }">&#128269</button></td>
            </tr>`;
  }
  return text;
};
