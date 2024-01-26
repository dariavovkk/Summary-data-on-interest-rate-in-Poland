import React from 'react';
import { Chart } from 'chart.js';
import 'chartjs-adapter-date-fns';

class Dane extends React.Component {
  chartRef = React.createRef();

  componentDidMount() {
    this.createChart();
  }

  componentDidUpdate() {
    this.createChart();
  }

  createChart() {
    const ctx = this.chartRef.current.getContext('2d');
    const existingChart = Chart.getChart(ctx);

    if (existingChart) {
      existingChart.destroy();
    }
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj'],
        datasets: [
          {
            label: 'Dane dla województwa',
            data: [100, 150, 120, 200, 180],
            backgroundColor: 'rgba(0, 123, 255, 0.5)',
            borderColor: 'rgba(0, 123, 255, 1)',
            borderWidth: 1,
          },
          {
            label: 'Dane dla miast',
            data: [150, 160, 180, 120, 140],
            backgroundColor: 'rgba(255, 123, 0, 0.5)',
            borderColor: 'rgba(255, 123, 0, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'month',
            },
            ticks: {
              source: 'auto',
            },
          },
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  render() {
    return (
      <div>
        <h1>Wykres danych województw</h1>
        <canvas ref={this.chartRef} id="wykres"></canvas>
      </div>
    );
  }
}

export default Dane;
