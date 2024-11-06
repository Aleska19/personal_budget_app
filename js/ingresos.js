const agregarBtn = document.getElementById('agregar');
const totalIngresosElement = document.getElementById('totalIngresos')

let totalIngresos = 0;

function capturarIngresos(event){
    event.preventDefault();
}

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

//Le agregamos funcionalidad al boton agregar 
agregarBtn.addEventListener("click", ingresosMensuales);

