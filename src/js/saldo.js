export function saldoNeto(totalIngresos = 0, totalGastos = 0) {
    const saldoTotal = document.getElementById('saldoNeto');
    const saldo = totalIngresos - totalGastos;
    saldoTotal.textContent = saldo.toFixed(2) + "$";
}
