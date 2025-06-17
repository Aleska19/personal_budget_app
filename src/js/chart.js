let chart;

export function inicializarGrafico() {
    const ctx = document.getElementById("myChart").getContext('2d');

    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [{
                label: 'Distribución de Gastos (%)',
                data: [],
                backgroundColor: ['#FFFFFF', '#F1C40F', 'black'],
                borderColor: ['black'],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.raw || 0;
                            return `${label}: ${value.toFixed(2)}%`;
                        }
                    }
                },
                legend: {
                    display: true,
                    position: 'bottom'
                }
            }
        }
    });
}

export function actualizarGrafico(labels, data) {
    if (!chart) return;
    chart.data.labels = labels;
    chart.data.datasets[0].data = data;
    chart.update();
}
