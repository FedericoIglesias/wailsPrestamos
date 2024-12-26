const $ = (id) => document.getElementById(id);
const $$ = (name) => document.querySelector(name);

const addClient = $("add-client");
const addPrestamo = $("add-prestamo");
const tablePrestamo = $("table-prestamo");
const tableClient = $("table-client");
const sectionAddPrestamo = $$(".add-prestamo");
const sectionAddClient = $$(".add-client");
const sectionTableClient = $$(".table-client");
const sectionTablePrestamo = $$(".table-prestamo");
const btnPrestamo = $("btnPrestamo");
const inputAmount = $('inputAmount')
const inputInterest = $('inputInterest')
const inputCuota = $('inputCuota')
const inputDate = $('inputDate')
const selectClient = $('selectClient')
const btnClient = $('btnClient')
const inptName = $('inptName')
const inptLastName = $('inptLastName')
const inptAddress = $('inptAddress')
const inptPhone = $('inptPhone')
const inptEmail = $('inptEmail')
const inptDNI = $('inptDNI')
const inptCUIL = $('inptCUIL')
const inptEmpresa = $('inptEmpresa')
const inptJob = $('inptJob')
const tbodyClient = $('tbodyClient')
const tbodyPrestamo = $('tbodyPrestamo')

const createRowClient = (name, lastName, address, phone, email, dni, cuil, empresa, job) => {
  return `<tr>
  <td>${name + '' + lastName}</td>
  <td>${address}</td>
  <td>${phone}</td>
  <td>${email}</td>
  <td>${dni}</td>
  <td>${cuil}</td>
  <td>${empresa}</td>
  <td>${job}</td>
  </tr>`
}

addClient.addEventListener("click", () => {
  sectionAddClient.style.display = "block";
  sectionAddPrestamo.style.display = "none";
  sectionTableClient.style.display = "none";
  sectionTablePrestamo.style.display = "none";
});
addPrestamo.addEventListener("click", () => {
  sectionAddClient.style.display = "none";
  sectionAddPrestamo.style.display = "block";
  sectionTableClient.style.display = "none";
  sectionTablePrestamo.style.display = "none";
});
tableClient.addEventListener("click", () => {
  sectionAddClient.style.display = "none";
  sectionAddPrestamo.style.display = "none";
  sectionTableClient.style.display = "block";
  sectionTablePrestamo.style.display = "none";
});
tablePrestamo.addEventListener("click", () => {
  sectionAddClient.style.display = "none";
  sectionAddPrestamo.style.display = "none";
  sectionTableClient.style.display = "none";
  sectionTablePrestamo.style.display = "block";
});

btnPrestamo.addEventListener("click", () => {
  console.log(inputAmount.value)
  console.log(inputInterest.value)
  console.log(inputCuota.value)
  console.log(inputDate.value)
  console.log(selectClient.value)
})

btnClient.addEventListener("click", () => {
  const row = createRowClient(inptName.value, inptLastName.value, inptAddress.value, inptPhone.value, inptEmail.value, inptDNI.value, inptCUIL.value, inptEmpresa.value, inptJob.value)
  tbodyClient.appendChild(document.createElement('tr')).innerHTML = row
  inptName.value= ""
  inptLastName.value= ""
  inptAddress.value= ""
  inptPhone.value= ""
  inptEmail.value= ""
  inptDNI.value= ""
  inptCUIL.value= ""
  inptEmpresa.value= ""
  inptJob.value= ""
})

