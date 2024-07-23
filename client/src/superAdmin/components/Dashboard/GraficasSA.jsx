import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

let beneficios = [72, 56, 20, 36, 80, 40, 30, -20, 25, 30, 12, 60];
let meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

let misoptions = {
    responsive : true,
    animation : true,
    plugins : {
        legend : {
            display : false
        }
    },
    scales : {
        y : {
            min : -25,
            max : 100
        },
        x: {
            ticks: { color: 'rgba(13, 110, 253, 1.0)'}
        }
    }
};

let midata = {
    labels: meses,
    datasets: [
        {
            label: 'Beneficios',
            data: beneficios,
            backgroundColor: 'rgba(13, 110, 253, 1.0)'
        }
    ]
};

export const GraficaSA = ()=> {
    return <Bar data={midata} options={misoptions} />
}