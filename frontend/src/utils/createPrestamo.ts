import { GetAllClient, SaveLoan } from "../../wailsjs/go/main/App.js";
import { models } from "../../wailsjs/go/models.js";
const $ = (id: string) => document.getElementById(id);
const $$ = (name: string) => document.querySelector(name);
const inputAmount = $("inputAmount") as HTMLInputElement;
const inputInterest = $("inputInterest") as HTMLInputElement;
const inputCuota = $("inputCuota") as HTMLInputElement;
const inputPrestmoNumber = $("inputPrestmoNumber") as HTMLInputElement;
const inputDate = $("inputDate") as HTMLInputElement;
const selectClient = $("selectClient") as HTMLSelectElement;
const descriptionPrestamo = $$(".descriptionPrestamo") as HTMLDivElement;

const createPrestamo = () => {
  const totalAmount = calculatePrestamo().toPay;
  const prestamo: models.LoanBrought = {
    ID: "P" + new Date().getTime().toString(),
    LoanNumber: inputPrestmoNumber.value,
    Amount: inputAmount.value,
    Interest: inputInterest.value,
    Quota: inputCuota.value,
    Date: new Date(inputDate.value).getTime().toString(),
    ClientId: selectClient.value,
    AmountForQuota: (Number(totalAmount) / Number(inputCuota.value))
      .toFixed(2)
      .toString(),
    TotalAmount: totalAmount.toString(),
  };
  SaveLoan(prestamo);

  inputAmount.value = "";
  inputInterest.value = "";
  inputCuota.value = "";
  inputDate.value = "";
  selectClient.value = "";
};

export const checkPrestamo = () => {
  let checkCount = 0;
  inputAmount.value == ""
    ? (inputAmount.style.border = "1px solid red")
    : ((inputAmount.style.border = "1px solid black"), checkCount++);
  inputInterest.value == ""
    ? (inputInterest.style.border = "1px solid red")
    : ((inputInterest.style.border = "1px solid black"), checkCount++);
  inputCuota.value == ""
    ? (inputCuota.style.border = "1px solid red")
    : ((inputCuota.style.border = "1px solid black"), checkCount++);
  inputDate.value == ""
    ? (inputDate.style.border = "1px solid red")
    : ((inputDate.style.border = "1px solid black"), checkCount++);
  selectClient.value == ""
    ? (selectClient.style.border = "1px solid red")
    : ((selectClient.style.border = "1px solid black"), checkCount++);
  if (checkCount >= 5) {
    if (Number(inputCuota.value) >= 1) {
      return createPrestamo();
    } else {
      return alert("Cuotas debe ser mayor a 0");
    }
  }
  return alert("Complete todos los campos correctamente");
};
export const calculatePrestamo = () => {
  const int = Number(inputInterest.value) * Number(inputCuota.value);
  const toPay = (Number(inputAmount.value) * (1 + int / 100)).toFixed(2);
  return { int, toPay };
};
export const showCalculated = (toPay: number) => {
  const amountForMonth = (toPay / Number(inputCuota.value)).toFixed(2);
  const intForMonth = (toPay - Number(inputAmount.value)).toFixed(2);
  if (descriptionPrestamo)
    return (descriptionPrestamo.innerHTML = `<div>
    <p>* Monto a devolver: <span>${toPay}</span>$</p>
    <p>* Monto por mes: <span>${amountForMonth}</span>$</p>
    <p>* Monto de interes: <span>${intForMonth}</span>$</p>
</div>`);
  return;
};

export const fillSelectClient = async () => {
  while (selectClient.firstChild) {
    selectClient.removeChild(selectClient.firstChild);
  }
  const listClient = GetAllClient().then((data) => {
    return data;
  });
  selectClient.add(document.createElement("option"));
  (await listClient).map((client: models.Client) => {
    let option: HTMLOptionElement = document.createElement("option");
    option.value = client.ID;
    option.text = client.DNI + "--" + client.Name + " " + client.Last_Name;
    selectClient.add(option);
  });
};
