import { actualizarGrafico } from './chart.js';
import { saldoNeto } from './saldo.js';
import { getTotalIngresos } from './ingresos.js';
import { obtenerDatosEnStorage, guardarDatosEnStorage } from './storage.js';

let totalGastos = 0;
// const gastos = obtenerDatosEnStorage('gastos')
const gastos = obtenerDatosEnStorage('gastos');

export function calcularTotalGastos() {
    totalGastos = 0;
    // gastos.length = 0; // Limpiar el array

    const montoGastos = document.querySelectorAll('#montoGastos');
    const labelGastos = document.querySelectorAll('#descripcionGasto');


// label y data para el grafico
    const labels = [];
    const data = [];

    // const gastos = obtenerDatosEnStorage('gasto s');

    montoGastos.forEach((gasto, index) => {
        const monto = parseFloat(gasto.value) || 0;
        const label = labelGastos[index].textContent.trim();

        totalGastos += monto;
        gastos.push(monto);

        labels.push(label);
        data.push(monto);

        const nuevoGasto = {
            descripcion: label,
            monto: monto,
            total_gasto : saldoNeto,
            fecha: new Date().toISOString().split('T')[0]
        };

        gastos.push(nuevoGasto)
    });

    document.getElementById('totalGastos').textContent = totalGastos.toFixed(2) + "$";
    actualizarGrafico(labels, data);
    saldoNeto(getTotalIngresos(), totalGastos);

    //storage

    guardarDatosEnStorage('gastos', gastos);
}

export function actualizarResumenGastos() {
    document.getElementById('resumenGastos').textContent = totalGastos.toFixed(2) + "$";
}
