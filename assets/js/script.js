let conversorInput = document.getElementById("input-1");
let conversorResultado = document.getElementById("resultado");
let botonConversor = document.getElementById("btn-1");
let dolarURL = "https://www.mindicador.cl/api/dolar";
let euroURL = "https://www.mindicador.cl/api/euro";

//función que hace una petición a una API, y lo transforma a objeto
async function dolarConversor() {
  const respuesta = await fetch(dolarURL);
  const data = await respuesta.json();
  return data;
}
async function euroConversor() {
  const respuesta = await fetch(euroURL);
  const data = await respuesta.json();
  return data;
}

//función que recibe una promesa desde API monedas y calcula en base al valor recibido de un input
async function renderDolar() {
  const dolares = await dolarConversor();
  series = dolares.serie;
  seriePrimerValor = series[0].valor;
  let inputValue = conversorInput.value;
  resultado = Number(inputValue) / Number(seriePrimerValor);
  conversorResultado.textContent = `Resultado: $${resultado.toFixed(2)} USD`;
}
async function renderEuro() {
  const euros = await euroConversor();
  series = euros.serie;
  seriePrimerValor = series[0].valor;
  let inputValue = conversorInput.value;
  resultado = Number(inputValue) / Number(seriePrimerValor);
  conversorResultado.textContent = `Resultado: $${resultado.toFixed(2)} EUR`;
}

//función que muestra la conversión de moneda de peso a dolar
botonConversor.addEventListener("click", () => {
  let select = document.getElementById("select-1");
  let alertId1 = document.getElementById("alert-1");
  let alertId2 = document.getElementById("alert-2");
  if (select.value === "coin") {
    alertId2.textContent = "Selecciona una moneda";
  } else {
    alertId2.textContent = "";
  }
  if (select.value === "dolar") {
    if (conversorInput.value === "")
      (alertId1.textContent = "ingresa un monto"),
        (conversorResultado.textContent = "");
    else {
      renderDolar();
      alertId1.textContent = "";
    }
  } else if (select.value === "euro") {
    if (conversorInput.value === "")
      (alertId1.textContent = "ingresa un monto"),
        (conversorResultado.textContent = "");
    else {
      renderEuro();
      alertId1.textContent = "";
    }
  }
});
