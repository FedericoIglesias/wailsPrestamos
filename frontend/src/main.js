import { SaveClient, GetAllClient } from "../wailsjs/go/main/App.js";
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

async function InitTableClient() {
  GetAllClient().then((data) => {
    data.map(client => {
      const row = createRowClient(client.name, client.lastName, client.address, client.phone, client.email, client.dni, client.cuil, client.empresa, client.job)
      tbodyClient.appendChild(document.createElement('tr')).innerHTML = row
    })
  })
}

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
const createRowPrestamo = (Amount, Interest, Cuota, Date, Client) => {
  return `<tr>
  <td>${Amount}</td>
  <td>${Interest}</td>
  <td>${Cuota}</td>
  <td>${Date}</td>
  <td>${Client}</td>
  </tr>`
}

const createClient = () => {
  const row = createRowClient(inptName.value, inptLastName.value, inptAddress.value, inptPhone.value, inptEmail.value, inptDNI.value, inptCUIL.value, inptEmpresa.value, inptJob.value)
  tbodyClient.appendChild(document.createElement('tr')).innerHTML = row
  SaveClient(inptName.value, inptLastName.value, inptAddress.value, inptPhone.value.toString(), inptEmail.value, inptDNI.value.toString(), inptCUIL.value.toString(), inptEmpresa.value, inptJob.value)
  inptName.value = ""
  inptLastName.value = ""
  inptAddress.value = ""
  inptPhone.value = ""
  inptEmail.value = ""
  inptDNI.value = ""
  inptCUIL.value = ""
  inptEmpresa.value = ""
  inptJob.value = ""
}

const createPrestamo = () => {
  const row = createRowPrestamo(inputAmount.value, inputInterest.value, inputCuota.value, inputDate.value, selectClient.value)
  tbodyPrestamo.appendChild(document.createElement('tr')).innerHTML = row
  inputAmount.value = ''
  inputInterest.value = ''
  inputCuota.value = ''
  inputDate.value = ''
  selectClient.value = ''
}

const checkClient = () => {
  let checkCount = 0

  inptName.value == "" ? inptName.style.border = "1px solid red" : inptName.style.border = "1px solid black" & checkCount++
  inptLastName.value == "" ? inptLastName.style.border = "1px solid red" : inptLastName.style.border = "1px solid black" & checkCount++
  inptAddress.value == "" ? inptAddress.style.border = "1px solid red" : inptAddress.style.border = "1px solid black" & checkCount++
  inptPhone.value == "" ? inptPhone.style.border = "1px solid red" : inptPhone.style.border = "1px solid black" & checkCount++
  inptEmail.value == "" ? inptEmail.style.border = "1px solid red" : inptEmail.style.border = "1px solid black" & checkCount++
  inptDNI.value == "" ? inptDNI.style.border = "1px solid red" : inptDNI.style.border = "1px solid black" & checkCount++
  inptCUIL.value == "" ? inptCUIL.style.border = "1px solid red" : inptCUIL.style.border = "1px solid black" & checkCount++
  inptEmpresa.value == "" ? inptEmpresa.style.border = "1px solid red" : inptEmpresa.style.border = "1px solid black" & checkCount++
  inptJob.value == "" ? inptJob.style.border = "1px solid red" : inptJob.style.border = "1px solid black" & checkCount++

  if (checkCount >= 9) {
    return createClient()
  }
  return alert("Complete todos los campos")
}

const checkPrestamo = () => {
  let checkCount = 0;
  inputAmount.value == '' ? inputAmount.style.border = "1px solid red" : inputAmount.style.border = "1px solid black" & checkCount++
  inputInterest.value == '' ? inputInterest.style.border = "1px solid red" : inputInterest.style.border = "1px solid black" & checkCount++
  inputCuota.value == '' ? inputCuota.style.border = "1px solid red" : inputCuota.style.border = "1px solid black" & checkCount++
  inputDate.value == '' ? inputDate.style.border = "1px solid red" : inputDate.style.border = "1px solid black" & checkCount++
  selectClient.value == '' ? selectClient.style.border = "1px solid red" : selectClient.style.border = "1px solid black" & checkCount++
  if (checkCount >= 5) {
    console.log(checkCount)
    return createPrestamo()
  }
  return alert("Complete todos los campos")
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
  checkPrestamo()
})

btnClient.addEventListener("click", () => {
  checkClient()
})

sectionAddClient.addEventListener("keypress", (e) => {
  if (e.key === 'Enter') {
    checkClient()
  }
})
sectionAddPrestamo.addEventListener("keypress", (e) => {
  if (e.key === 'Enter') {
    checkPrestamo()
  }
})

InitTableClient()