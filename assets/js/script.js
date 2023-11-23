const conversorInput = document.getElementById("input-1");
const conversorResultado = document.getElementById("resultado");
const botonConversor = document.getElementById("btn-1");
const alertId1 = document.getElementById("alert-1");
const alertId2 = document.getElementById("alert-2");
let dolarURL = "https://www.mindicador.cl/api/dolar";
let euroURL = "https://www.mindicador.cl/api/euro";
let ufURL = "https://www.mindicador.cl/api/uf";
let divisas = "https://www.mindicador.cl/api";

//funciones que hacen una petición a una API, y lo transforman a objeto
async function dolarConversor() {
  try {
    const respuesta = await fetch(divisas);
    const data = await respuesta.json();
    return data;
  } catch (error) {
    conversorResultado.textContent = `Algo salió mal :( ${error.message} ;`;
  }
}
async function euroConversor() {
  try {
    const respuesta = await fetch(divisas);
    const data = await respuesta.json();
    return data;
  } catch (error) {
    conversorResultado.textContent = `Algo salió mal :( ${error.message} ;`;
  }
}
async function ufConversor() {
  try {
    const respuesta = await fetch(divisas);
    const data = await respuesta.json();
    return data;
  } catch (error) {
    conversorResultado.textContent = `Algo salió mal :( ${error.message} ;`;
  }
}

//funciones que reciben una promesa desde API monedas y calcula en base al valor recibido de un input
async function renderDolar() {
  const dolares = await dolarConversor();
  let dolarValue = dolares.dolar;
  let valor = dolarValue.valor;
  let inputValue = conversorInput.value;
  resultado = Number(inputValue) / valor;
  conversorResultado.textContent = `Resultado: $${resultado.toFixed(2)} USD`;
}
async function renderEuro() {
  const euros = await euroConversor();
  let euroValue = euros.euro;
  let valor = euroValue.valor;
  let inputValue = conversorInput.value;
  resultado = Number(inputValue) / valor;
  conversorResultado.textContent = `Resultado: $${resultado.toFixed(2)} EUR`;
}
async function renderuf() {
  const uf = await ufConversor();
  let ufValue = uf.uf;
  let valor = ufValue.valor;
  let inputValue = conversorInput.value;
  resultado = Number(inputValue) / valor;
  conversorResultado.textContent = `Resultado: $${resultado.toFixed(1)} UF`;
}

//función que muestra la conversión de moneda de peso a dolar
botonConversor.addEventListener("click", () => {
  let select = document.getElementById("select-1");
  if (select.value === "coin") {
    alertId2.textContent = "Selecciona una moneda";
  } else {
    alertId2.textContent = "";
  }
  if (select.value === "dolar") {
    if (conversorInput.value === "")
      (alertId1.textContent = "ingresa un monto"),
        (conversorResultado.textContent = "...");
    else {
      renderDolar();
      renderDolarGrafica();
      alertId1.textContent = "";
    }
  } else if (select.value === "euro") {
    if (conversorInput.value === "")
      (alertId1.textContent = "ingresa un monto"),
        (conversorResultado.textContent = "...");
    else {
      renderEuro();
      rendereuroGrafica();
      alertId1.textContent = "";
    }
  }else if(select.value === "uf"){
    if (conversorInput.value === "")
    (alertId1.textContent = "ingresa un monto"),
      (conversorResultado.textContent = "...");
  else {
    renderuf();
    renderufGrafica() 
    alertId1.textContent = "";
  }
  }
});

//funcione que obtiene y retorna la data para la gráfica en dolares
async function getAndCreateDataToChartDolar() {
  let titulo = "Valor de los últimos 10 días";
  let color = "rgb(255, 99, 132)";
  try {
    const respuesta = await fetch(dolarURL);
    const series = await respuesta.json();
    const labels = series.serie.map((serie) => serie.fecha.slice(0, 10));
    labels.length = 10;
    const data = series.serie.map((serie) => {
      const valor = serie.valor;
      return Number(valor);
    });
    const datasets = [
      {
        label: titulo,
        borderColor: color,
        data,
      },
    ];
    return { labels, datasets };
  } catch (error) {
    alert(error.message);
  }
}

//funcion que renderiza la grafica en dolares
async function renderDolarGrafica() {
  let tipoDeGrafica = "line";
  const data = await getAndCreateDataToChartDolar();
  const config = {
    type: tipoDeGrafica,
    data,
  };
  const myChart = document.getElementById("myChart");
  myChart.style.backgroundColor = "white";
  new Chart(myChart, config);
}

//funcion que obtiene y retorna la data para la gráfica en euros
async function getAndCreateDataToChartEuro() {
  let titulo = "Valor de los últimos 10 días";
  let color = "rgb(255, 99, 132)";
  try {
    const respuesta = await fetch(euroURL);
    const series = await respuesta.json();
    const labels = series.serie.map((serie) => serie.fecha.slice(0, 10));
    labels.length = 10;
    const data = series.serie.map((serie) => {
      const valor = serie.valor;
      return Number(valor);
    });
    const datasets = [
      {
        label: titulo,
        borderColor: color,
        data,
      },
    ];
    return { labels, datasets };
  } catch (error) {
    alert(error.message);
  }
}

//funcion que renderiza la grafica en euros
async function rendereuroGrafica() {
  let tipoDeGrafica = "line";
  const data = await getAndCreateDataToChartEuro();
  const config = {
    type: tipoDeGrafica,
    data,
  };
  const myChart = document.getElementById("myChart");
  myChart.style.backgroundColor = "white";
  new Chart(myChart, config);
}

//funcion que obtiene y retorna la data para la gráfica en uf
async function getAndCreateDataToChartEuro() {
  let titulo = "Valor de los últimos 10 días";
  let color = "rgb(255, 99, 132)";
  try {
    const respuesta = await fetch(ufURL);
    const series = await respuesta.json();
    const labels = series.serie.map((serie) => serie.fecha.slice(0, 10));
    labels.length = 10;
    const data = series.serie.map((serie) => {
      const valor = serie.valor;
      return Number(valor);
    });
    const datasets = [
      {
        label: titulo,
        borderColor: color,
        data,
      },
    ];
    return { labels, datasets };
  } catch (error) {
    alert(error.message);
  }
}

//funcion que renderiza la grafica en uf
async function renderufGrafica() {
  let tipoDeGrafica = "line";
  const data = await getAndCreateDataToChartEuro();
  const config = {
    type: tipoDeGrafica,
    data,
  };
  const myChart = document.getElementById("myChart");
  myChart.style.backgroundColor = "white";
  new Chart(myChart, config);
}