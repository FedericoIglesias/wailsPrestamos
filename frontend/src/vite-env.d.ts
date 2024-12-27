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

export type Prestamo = {
  ID: string;
  Amount: string;
  Interest: string;
  Cuota: string;
  Date: string;
  ClientId: string;
  CheckPay: CheckPay[];
};

export type PrestamoPlus = {
  ID: string;
  Amount: string;
  Interest: string;
  Cuota: string;
  Date: string;
  ClientId: string;
  ClientName: string;
};

export type CheckPay = {
  Month: string;
  Pay: boolean;
};

export type PrestamoBrought = {
  ID: string;
  Amount: string;
  Interest: string;
  Cuota: string;
  Date: string;
  ClientId: string;
};
