import { SaveClient } from "../../wailsjs/go/main/App.js";
import { Client } from "../vite-env.js";
const $ = (id: string) => document.getElementById(id);
const inptName = $("inptName") as HTMLInputElement;
const inptLastName = $("inptLastName") as HTMLInputElement;
const inptAddress = $("inptAddress") as HTMLInputElement;
const inptPhone = $("inptPhone") as HTMLInputElement;
const inptEmail = $("inptEmail") as HTMLInputElement;
const inptDNI = $("inptDNI") as HTMLInputElement;
const inptCUIL = $("inptCUIL") as HTMLInputElement;
const inptEmpresa = $("inptEmpresa") as HTMLInputElement;
const inptJob = $("inptJob") as HTMLInputElement;

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
  inptEmail.value == ""
    ? (inptEmail.style.border = "1px solid red")
    : ((inptEmail.style.border = "1px solid black"), checkCount++);
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

  if (checkCount >= 9) {
    return createClient();
  }
  return alert("Complete todos los campos");
};

const createClient = () => {
  const client: Client = {
    ID: "C" + new Date().getTime().toString(),
    Name: inptName.value.toLowerCase(),
    Last_Name: inptLastName.value.toLowerCase(),
    Address: inptAddress.value.toLowerCase(),
    Phone: inptPhone.value.toString(),
    Email: inptEmail.value.toLowerCase(),
    DNI: inptDNI.value.toString(),
    CUIL: inptCUIL.value.toString(),
    Empresa: inptEmpresa.value.toLowerCase(),
    Job: inptJob.value.toLowerCase(),
  };
  SaveClient(client);
  inptName.value = "";
  inptLastName.value = "";
  inptAddress.value = "";
  inptPhone.value = "";
  inptEmail.value = "";
  inptDNI.value = "";
  inptCUIL.value = "";
  inptEmpresa.value = "";
  inptJob.value = "";
};
