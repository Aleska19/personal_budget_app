import { guardarDatosEnStorage, obtenerDatosEnStorage } from "./storage.js";

//obtener elemento del DOM
const lista = document.getElementById('listaIngresos');
const total = document.getElementById('totalIngresos')

//inicializar ingresos desde el local storage

let ingresos = obtenerDatosEnStorage('ingresos'); // 
let totalIngresos = ingresos.reduce((acc, ingreso) => acc + ingreso.monto, 0);

//funcion principal para agregar ingresos
export async function ingresosMensuales() {
    //Obtener valores de los campos de entrada
    const descripcionIngreso = document.getElementById('source').value.trim();
    const montoIngreso = parseFloat(document.getElementById('amount').value);
    const fechaIngreso = document.getElementById('date').value;

    //validar campos de entrada
    if (!descripcionIngreso || !montoIngreso || !fechaIngreso){
        alert("completa todos los campos correctamente");
        return;
    }

    //nuevo ingreso
    const nuevoIngreso = {
        descripcion: descripcionIngreso,
        monto: montoIngreso,
        fecha: fechaIngreso
    }

    //agregar neevo ingreso al array de ingresos
    ingresos.push(nuevoIngreso);
    guardarDatosEnStorage('ingresos', ingresos);


    // Limpiar campos de entrada
    document.getElementById('source').value = '';
    document.getElementById('amount').value = '';
    document.getElementById('date').value = ''
    actualizarLista();
    actualizarTotal();
    actualizarResumenIngreso();
}

//actualizar la lista visual del dom
function actualizarLista() {
    lista.innerHTML = ''; //limpia la lista actual
    ingresos.forEach((ingreso, index) => {
        const li = document.createElement('li');
        li.textContent = `${ingreso.monto} - ${ingreso.descripcion} - ${ingreso.fecha}`;

        const btnEliminar = document.createElement('button');
        btnEliminar.textContent = 'Eliminar';
        btnEliminar.onclick = () => {
            ingresos.splice(index, 1); //eliminar ingreso del array
            guardarDatosEnStorage('ingresos', ingresos); //actualizar local storage
            actualizarLista(); //actualizar lista visual
            actualizarTotal(); //actualizat total 
            actualizarResumenIngreso();//actualizar resumen de ingresos
        }
        li.appendChild(btnEliminar);
        lista.appendChild(li);

    });
}

//actualizar total ingreos
function actualizarTotal() {
    totalIngresos = ingresos.reduce((acc, ingreso) => acc + ingreso.monto, 0);
    total.textContent = `$${totalIngresos.toFixed(2)}`;
}

//actualizar resumen de ingresos
function actualizarResumenIngreso() {
    totalIngresos = ingresos.reduce((acc, ingreso) => acc + ingreso.monto, 0);
    document.getElementById('totalIngresos').textContent = totalIngresos.toFixed(2) + "$";
    document.getElementById('resumenIngreso').textContent = totalIngresos.toFixed(2) + "$";
}

actualizarLista();
actualizarTotal();


// funcion para obtener el total de ingresos
//esta funcion se usa en el archivo gastos.js para calcular el saldo neto
export function getTotalIngresos() {
    return totalIngresos;
}
