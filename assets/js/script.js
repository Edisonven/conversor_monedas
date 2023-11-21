let conversorInput = document.getElementById("input-1");
let conversorResultado = document.getElementById("resultado");
let botonConversor = document.getElementById("btn-1");
let dolarURL = "https://www.mindicador.cl/api/dolar";

//función que hace una petición a una API, y lo transforma a objeto
async function dolarConversor() {
  const respuesta = await fetch(dolarURL);
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
  conversorResultado.textContent = `Resultado: $${resultado} USD`;
  conversorInput.value = "";
}

//función que muestra la conversión de moneda de peso a dolar
botonConversor.addEventListener("click", () => {
  let select = document.getElementById("select-1");
  if (select.value === "coin") {
    alert("Debes seleccionar una moneda");
  }
  if (select.value === "dolar") {
    renderDolar();
  }
});
