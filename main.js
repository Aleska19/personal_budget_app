
// const ingreso = [];
// const gastos = [];


// function ingresosMensuales(){
//     const ingresoMensual = parseFloat(prompt("Cual es tu ingreso mensual? "));
//     console.log("Tu ingreso mensual es de: " +  ingresoMensual);

//     ingreso.push({ingresoMensual})
// }

// ingresosMensuales()


// function gastosMensuales(){
//     let continuarAgregando = true;
//     while (continuarAgregando){
//         const descripcion = prompt("Me indicas la descripcion? ");
//         const monto = parseFloat(prompt("Me indicas  monto de los gastos mensuales? "));

//         gastos.push({descripcion: descripcion, monto: monto});

//         continuarAgregando = confirm("Quieres Continuar agregando? ");
//     }
// }

// gastosMensuales();

// function calcularTotalGastos(){
//     let total = 0;
//     gastos.forEach(gasto => {
//         total += gasto.monto;
//         console.log(`El Total de gastos es: ` + total + ' pesos');
//     });
// }

// calcularTotalGastos();

// function mostrarGastos(){
//     console.log('Resumen de gastos:' )
//     gastos.forEach(gasto => {
//         console.log(`${gasto.descripcion}: ${gasto.monto} pesos`);
    
//     });
// }

// mostrarGastos()

// let saldo = ingreso - gastos;
// function saldoTotal(){
//     console.log("Te queda un saldo de: " + "" +  saldo);

//     if (ingreso > gastos){
//         console.log("Vas muy bien, puedes ahorrar lo que te queda")
//     } else{
//         console.log("debes intentar reducir un poco tus gastos")
//     }
// }

// saldoTotal()



