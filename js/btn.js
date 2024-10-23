//boton inicio 

const btnEmpiezaAhora = document.getElementById("btn_empieza_ahora")
btnEmpiezaAhora.addEventListener("click", function(){
    window.location.href = "./pages/simulador.html";
});

//boton agregar mas

let contadorIngresos = 1; //Contador para los ingresos 
let contadorGastos = 1; //Contador Gastos 

//Agregar Ingresos
document.getElementById('agregarIngresos').addEventListener("click", function(event){
    event.preventDefault();
    contadorIngresos ++;

    const nuevoIngreso = document.createElement("div");
    nuevoIngreso.classList.add("item");

    //descripcion de ingreso

    const nuevaDescripcion = document.createElement("input");
    nuevaDescripcion.type = "text";
    nuevaDescripcion.id = "source" + contadorIngresos;
    nuevaDescripcion.placeholder = "Salario, freenlace. etc" + contadorIngresos;

    //monto de ingreso

    const nuevoMontoIngreso = document.createElement("input")
    nuevoMontoIngreso.type = "number";
    nuevoMontoIngreso.id = "amount2" + contadorIngresos;
    nuevoMontoIngreso.placeholder = "0.00" + contadorIngresos; 

    //fecha de ingreso

    const fechaDeIngreso = document.createElement("input")
    fechaDeIngreso.type = "date";
    fechaDeIngreso.id = "date" + contadorIngresos;

    nuevoIngreso.appendChild(nuevaDescripcion);
    nuevoIngreso.appendChild(nuevoMontoIngreso);
    nuevoIngreso.appendChild(fechaDeIngreso);

    document.getElementById("form").appendChild(nuevoIngreso);
});