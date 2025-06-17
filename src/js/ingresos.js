import { guardarDatosEnStorage, obtenerDatosEnStorage } from "./storage.js";

let ingresos = obtenerDatosEnStorage('ingresos');
let totalIngresos = ingresos.reduce((acc, ingreso) => acc + ingreso.monto, 0);




export async function ingresosMensuales() {
    const descripcionIngreso = document.getElementById('source').value;
    const montoIngreso = parseFloat(document.getElementById('amount').value);
    const fechaIngreso = document.getElementById('date').value;

    if (descripcionIngreso && montoIngreso && fechaIngreso) {
        const nuevoIngreso = { descripcion: descripcionIngreso, monto: montoIngreso, fecha: fechaIngreso };
        ingresos.push(nuevoIngreso);
        guardarDatosEnStorage('ingresos', ingresos);
        totalIngresos += montoIngreso;
        actualizarResumenIngreso();
    } else {
        alert("Completa todos los campos");
    }
}

function actualizarResumenIngreso() {
    document.getElementById('totalIngresos').textContent = totalIngresos.toFixed(2) + "$";
    document.getElementById('resumenIngreso').textContent = totalIngresos.toFixed(2) + "$";
}


export function getTotalIngresos() {
    return totalIngresos;
}
