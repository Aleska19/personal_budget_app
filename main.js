//DolarApi
// const API_URL = ""



//INGRESOS


// const agregarBtn = document.getElementById('agregar');
// const totalIngresosElement = document.getElementById('totalIngresos')

// let totalIngresos = 0;
// let ingresos = [];


// //funcion para guardar en el local storage// 
// function guardarDatosEnStorage(){
//     console.log('Guardando datos', ingresos);
//     localStorage.setItem('ingresos', JSON.stringify(ingresos));
// }


// //funcion para cargar localstorage//
// function obtenerDatosStorage(){
//     const datosGuardados = localStorage.getItem('ingresos');
//     if (datosGuardados){
//         ingresos = JSON.parse(datosGuardados) || [];

//         //calcular ingresos al cargar//
//         totalIngresos = ingresos.reduce((total, ingreso) => total + ingreso.monto, 0);
//         actualizarResumenIngreso();
//     }
// }

// function ingresosMensuales(){
//     const descripcionIngreso = document.getElementById('source').value;
//     const montoIngreso = parseFloat(document.getElementById('amount').value);
//     const fechaIngreso = document.getElementById('date').value

// //aqui agregamos una condicion al llenar el formulario 
//     if(descripcionIngreso && montoIngreso && fechaIngreso){
//         ingresos.push({descripcion: descripcionIngreso, monto: montoIngreso, fecha: fechaIngreso});
//         console.log('ingresos actuales', ingresos);

//         guardarDatosEnStorage();
//         //Total ingresos//
//         totalIngresos += montoIngreso;
//         actualizarResumenIngreso();

//     }else{
//         alert("Por favor, completa todos los campos antes de agregar")
//     }
// //mostrar el total de ingresos
// // totalIngresosElement.textContent = totalIngresos.toFixed(2) + "$";
// }


// function actualizarResumenIngreso(){
//     const resumenIngreso = document.getElementById('resumenIngreso');
//     totalIngresosElement.textContent = totalIngresos.toFixed(2) + "$";
//     resumenIngreso.textContent = totalIngresos.toFixed(2) + "$";

// }




// agregarBtn.addEventListener("click", function(event){
//     event.preventDefault();
//     ingresosMensuales();
//     obtenerDatosStorage();
// });


// INGRESOS
const agregarBtn = document.getElementById('agregar');
const totalIngresosElement = document.getElementById('totalIngresos');

let totalIngresos = 0;
let ingresos = [];

// API URL para manejar ingresos (simulada con JSONPlaceholder)
const API_URL = "https://jsonplaceholder.typicode.com/posts";

// Función para obtener datos desde la API
async function obtenerDatosDesdeAPI() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Error al obtener datos de la API");
        const datos = await response.json();

        // Suponiendo que los datos simulados tienen estructura similar
        ingresos = datos.map(item => ({
            descripcion: item.title,
            monto: parseFloat(item.body) || 0,
            fecha: new Date().toISOString().split('T')[0]
        }));

        totalIngresos = ingresos.reduce((total, ingreso) => total + ingreso.monto, 0);
        actualizarResumenIngreso();
        guardarDatosEnStorage();
    } catch (error) {
        console.error("Fallo al cargar datos de la API:", error);
        obtenerDatosStorage(); // Cargar respaldo local
    }
}

// Función para enviar un nuevo ingreso a la API
async function enviarIngresoAAAPI(nuevoIngreso) {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(nuevoIngreso),
        });
        if (!response.ok) throw new Error("Error al enviar datos a la API");

        const ingresoGuardado = await response.json();
        console.log("Ingreso enviado y guardado:", ingresoGuardado);
    } catch (error) {
        console.error("Fallo al enviar datos a la API:", error);
    }
}

// Función para guardar datos en localStorage
function guardarDatosEnStorage() {
    localStorage.setItem('ingresos', JSON.stringify(ingresos));
}

// Función para cargar datos desde localStorage
function obtenerDatosStorage() {
    const datosGuardados = localStorage.getItem('ingresos');
    if (datosGuardados) {
        ingresos = JSON.parse(datosGuardados) || [];
        totalIngresos = ingresos.reduce((total, ingreso) => total + ingreso.monto, 0);
        actualizarResumenIngreso();
    }
}

// Función para añadir ingresos
async function ingresosMensuales() {
    const descripcionIngreso = document.getElementById('source').value;
    const montoIngreso = parseFloat(document.getElementById('amount').value);
    const fechaIngreso = document.getElementById('date').value;

    if (descripcionIngreso && montoIngreso && fechaIngreso) {
        const nuevoIngreso = {
            descripcion: descripcionIngreso,
            monto: montoIngreso,
            fecha: fechaIngreso
        };
        ingresos.push(nuevoIngreso);

        guardarDatosEnStorage();
        totalIngresos += montoIngreso;
        actualizarResumenIngreso();

        // Enviar el ingreso a la API
        await enviarIngresoAAAPI(nuevoIngreso);
    } else {
        alert("Por favor, completa todos los campos antes de agregar");
    }
}

// Función para actualizar el resumen de ingresos
function actualizarResumenIngreso() {
    const resumenIngreso = document.getElementById('resumenIngreso');
    totalIngresosElement.textContent = totalIngresos.toFixed(2) + "$";
    resumenIngreso.textContent = totalIngresos.toFixed(2) + "$";
}

// Evento al presionar el botón
agregarBtn.addEventListener("click", function (event) {
    event.preventDefault();
    ingresosMensuales();
});

// Cargar datos iniciales al inicio
obtenerDatosDesdeAPI();




//GASTOS Y GRAFICO

const ctx = document.getElementById("myChart").getContext('2d');

const gastosChart = new Chart (ctx, {
    type: 'bar',
    data:{
        labels:[],
        datasets: [{
            label:'distribucion de Gastos (%)',
            data: [],
            backgroundColor: [
                '#FFFFFF',
                '#F1C40F',
                'black',
            ],
            borderColor: [
                'black',
            ],
            bordeWidth: 2
        }]
    },
    option:{
        responsive: true,
        plugins:{
            tooltip:{
                callbacks:{
                    label: function(context){
                        const label = context.label ||'';
                        const value = context.raw || 0;
                        return`${label}: ${value.toFixed(2)}%`;
                    }
                }
            },
            legend:{
                display: true,
                position:'bottom'
            }
        }
    }
});
//variables simulador
const btnAgregar= document.getElementById('agregarGastos');
const totalGastosElement= document.getElementById('totalGastos');
let total = 0;

//Array para almacenar los gastos
const gastos = [];

//Funcion para calcular los gastos y actualizar grafico de chart.ja
function calcularTotalGastos(){
    // let total = 0;

//Obtener el valor del input y label
    const montoGastos = document.querySelectorAll('#montoGastos');
    const labelGastos = document.querySelectorAll('#descripcionGasto');

//Reiniciar datos de gastos y etiquetas en el grafico;
    gastosChart.data.labels = [];
    gastosChart.data.datasets[0].data = [];

//Recorrer cada input y aggregar valores al grafico 
    montoGastos.forEach((gasto, index)=>{
        const monto = parseFloat(gasto.value) || 0;
        const label = labelGastos[index].textContent.trim();

//Sumar el total de gastos
        total += monto;
        

//agregar los datos a mi array vacio 
        gastos.push(monto);
        console.log('Descripcion:', label + " " + 'Gastos:', monto);
        console.log("Total:", total)

//Agregar al grafico 
        gastosChart.data.labels.push(label);
        gastosChart.data.datasets[0].data.push(monto);
    });

//Actualizar el elemneto del dom para agregar el tortal.
    totalGastosElement.textContent = total.toFixed(2) + "$";
    
//actualizar graficos para agregar los nuevos datos
    gastosChart.update();

    //actualizar saldo neto
    saldoNeto();
}

//funcion para el resumen total de gastos

function actualizarResumen(){
    const resumenGastos = document.getElementById('resumenGastos');   
    resumenGastos.textContent = total.toFixed(2) + "$"
};

//SALDO NETO 
function saldoNeto() {
    const saldoTotal = document.getElementById('saldoNeto');
    saldoTotal.textContent = (totalIngresos - total).toFixed(2) + "$";
};

//Evento para añadir un gasto al presionar el boton 
btnAgregar.addEventListener("click", function(event){
event.preventDefault();
calcularTotalGastos();
actualizarResumen();
});







