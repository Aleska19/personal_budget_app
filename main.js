import { ingresosMensuales } from './src/js/ingresos.js';
import { calcularTotalGastos, actualizarResumenGastos } from './src/js/gastos.js';
import { saldoNeto } from './src/js/saldo.js';
import { inicializarGrafico } from './src/js/chart.js';

document.addEventListener("DOMContentLoaded", () => {
    inicializarGrafico();
});

document.getElementById('agregar').addEventListener("click", function (event) {
    event.preventDefault();
    ingresosMensuales();
});

document.getElementById('agregarGastos').addEventListener("click", function(event){
    event.preventDefault();
    calcularTotalGastos();
    actualizarResumenGastos();
});
