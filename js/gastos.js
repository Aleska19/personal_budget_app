
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
                'pink',
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
}

//funcion para el resumen total de gastos

function actualizarResumen(){
    const resumenGastos = document.getElementById('resumenGastos');   
    resumenGastos.textContent = total.toFixed(2) + "$"
}

//Evento para añadir un gasto al presionar el boton 
btnAgregar.addEventListener("click", function(event){
event.preventDefault();
calcularTotalGastos();
actualizarResumen();
});



//resumen gastos//
// function resumenGastos(monto){
//     gastos += parseFloat(monto);
//     actualizarResumen();
// }

// function actualizarResumen(){
//     const resumenGastos = document.getElementById('resumenGastos');
//     resumenGastos.textContent = `Gastos Totales: $${total.toFixed(2)}`;
// }










