export const popUpClientInfo = () => {
  return `<body class="popUpClient">
  <section>
    <header>
      <p id="close">Cerrar</p>
    </header>
    <section>
      <div>
        <p>Información Personal:</p>
        <p>Nombre: : ${"data"}</p>
        <p>Apellido: : ${"data"}</p>
        <p>DNI: : ${"data"}</p>
        <p>CUIL: ${"data"}</p>
        <p>Teléfono: ${"data"}</p>
        <p>Dirección: ${"data"}</p>
        <p>Empresa: ${"data"}</p>
        <p>Puesto: ${"data"}</p>
      </div>
      <div>
        <p>Información Prestamos:</p>
        <p>Cantidad de Prestamos: : ${"data"}</p>
        <p>Cantidad de Monto a pagar: : ${"data"}</p>
        <p>Cantidad de Monto pagado: : ${"data"}</p>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>Monto</th>
              <th>Intereses</th>
              <th>Fecha</th>
              <th>Cuotas</th>
              <th>Resta</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody id="tbodyPrestamo">
          </tbody>
        </table>
      </div>
    </section>
  </section>
</body>`;
};
