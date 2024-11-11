const agregarBtn = document.getElementById('agregar');
const totalIngresosElement = document.getElementById('totalIngresos')

let totalIngresos = 0;

// function capturarIngresos(event){
//     event.preventDefault();
// }

const ingresos = []

function ingresosMensuales(){
    const descripcionIngreso = document.getElementById('source').value;
    const montoIngreso = parseFloat(document.getElementById('amount').value);
    const fechaIngreso = document.getElementById('date').value

//aqui agregamos una condicion al llenar el formulario 
    if(descripcionIngreso && montoIngreso && fechaIngreso){
        ingresos.push({descripcion: descripcionIngreso, monto: montoIngreso, fecha: fechaIngreso});
        console.log('ingresos actuales', ingresos)
    }else{
        alert("Por favor, completa todos los campos antes de agregar")
    }
    
       //Total ingresos//

totalIngresos += montoIngreso;

//mostrar el total de ingresos
totalIngresosElement.textContent = totalIngresos.toFixed(2) + "$";
}

function actualizarResumenIngreso(){
    const resumenIngreso = document.getElementById('resumenIngreso');
    resumenIngreso.textContent = totalIngresos.toFixed(2) + "$";
}

agregarBtn.addEventListener("click", function(event){
    event.preventDefault();
    ingresosMensuales();
    actualizarResumenIngreso()
})

//Le agregamos funcionalidad al boton agregar 


//Resumen Ingresos
// const resumenIngresos = document.getElementById('resumenIngreso');
// resumenIngresos.push(montoIngreso);
