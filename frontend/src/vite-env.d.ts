/// <reference types="vite/client" />

export type Client = {
  ID: string;
  Name: string;
  Last_Name: string;
  Address: string;
  Phone: string;
  Email: string;
  DNI: string;
  CUIL: string;
  Empresa: string;
  Job: string;
};

export type prestamo = {
  ID: string;
  Amount: string;
  Interest: string;
  Cuota: string;
  Date: string;
  ClientId: string;
};
