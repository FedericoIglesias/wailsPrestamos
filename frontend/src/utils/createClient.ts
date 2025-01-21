import { SaveClient } from "../../wailsjs/go/main/App.js";
import { models } from "../../wailsjs/go/models.js";

const $ = (id: string) => document.getElementById(id);
const inptName = $("inptName") as HTMLInputElement;
const inptLastName = $("inptLastName") as HTMLInputElement;
const inptAddress = $("inptAddress") as HTMLInputElement;
const inptPhone = $("inptPhone") as HTMLInputElement;
const inptZone = $("inptZone") as HTMLInputElement;
const inptPartido = $("inptPartido") as HTMLInputElement;
const inptDNI = $("inptDNI") as HTMLInputElement;
const inptCUIL = $("inptCUIL") as HTMLInputElement;
const inptEmpresa = $("inptEmpresa") as HTMLInputElement;
const inptJob = $("inptJob") as HTMLInputElement;
const inptJobPlace = $("inptJobPlace") as HTMLInputElement;

export const checkClient = () => {
  let checkCount = 0;

  inptName.value == ""
    ? (inptName.style.border = "1px solid red")
    : ((inptName.style.border = "1px solid black"), checkCount++);
  inptLastName.value == ""
    ? (inptLastName.style.border = "1px solid red")
    : ((inptLastName.style.border = "1px solid black"), checkCount++);
  inptAddress.value == ""
    ? (inptAddress.style.border = "1px solid red")
    : ((inptAddress.style.border = "1px solid black"), checkCount++);
  inptPhone.value == ""
    ? (inptPhone.style.border = "1px solid red")
    : ((inptPhone.style.border = "1px solid black"), checkCount++);
  inptPartido.value == ""
    ? (inptPartido.style.border = "1px solid red")
    : ((inptPartido.style.border = "1px solid black"), checkCount++);
  inptDNI.value == ""
    ? (inptDNI.style.border = "1px solid red")
    : ((inptDNI.style.border = "1px solid black"), checkCount++);
  inptCUIL.value == ""
    ? (inptCUIL.style.border = "1px solid red")
    : ((inptCUIL.style.border = "1px solid black"), checkCount++);
  inptEmpresa.value == ""
    ? (inptEmpresa.style.border = "1px solid red")
    : ((inptEmpresa.style.border = "1px solid black"), checkCount++);
  inptJob.value == ""
    ? (inptJob.style.border = "1px solid red")
    : ((inptJob.style.border = "1px solid black"), checkCount++);
  inptJobPlace.value == ""
    ? (inptJobPlace.style.border = "1px solid red")
    : ((inptJobPlace.style.border = "1px solid black"), checkCount++);
  inptZone.value == ""
    ? (inptZone.style.border = "1px solid red")
    : ((inptZone.style.border = "1px solid black"), checkCount++);

  if (checkCount >= 9) {
    return createClient();
  }
  return alert("Complete todos los campos");
};

const createClient = async () => {
  const client: models.Client = {
    ID: "C" + new Date().getTime().toString(),
    Name: inptName.value.toLowerCase(),
    Last_Name: inptLastName.value.toLowerCase(),
    Address: inptAddress.value.toLowerCase(),
    Phone: inptPhone.value.toString(),
    Zone: inptZone.value.toLowerCase(),
    Partido: inptPartido.value.toLowerCase(),
    DNI: inptDNI.value.toString(),
    CUIL: inptCUIL.value.toString(),
    Empresa: inptEmpresa.value.toLowerCase(),
    Job: inptJob.value.toLowerCase(),
    JobPlace: inptJobPlace.value.toLowerCase(),
  };
  const result = await SaveClient(client);
  if (result) {
    alert("Cliente creado con exito");
  } else {
    alert("Error al crear el cliente");
  }
  inptName.value = "";
  inptLastName.value = "";
  inptAddress.value = "";
  inptPhone.value = "";
  inptZone.value = "";
  inptPartido.value = "";
  inptDNI.value = "";
  inptCUIL.value = "";
  inptEmpresa.value = "";
  inptJob.value = "";
  inptJobPlace.value = "";
};
