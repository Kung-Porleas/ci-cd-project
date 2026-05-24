import { Component } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexFill, ApexGrid, ApexLegend, ApexMarkers, ApexStroke, ApexTooltip, ApexXAxis, ApexYAxis, NgApexchartsModule } from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  stroke: ApexStroke;
  fill: ApexFill;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  grid: ApexGrid;
  tooltip: ApexTooltip;
  legend: ApexLegend;
  colors: string[];
};

@Component({
  selector: 'app-chart',
  imports: [NgApexchartsModule],
  templateUrl: './chart.html',
  styleUrl: './chart.css',
})
export class Chart {
  curveOptions = ['smooth', 'straight', 'stepline', 'monotoneCubic'];
  selectedCurve: 'smooth' | 'straight' | 'stepline' | 'monotoneCubic' = 'smooth';
  fillOpacity = 40; // 0–100 range for the slider
  stacked = false;
 
  readonly categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];
  readonly seriesData: ApexAxisChartSeries = [
    { name: 'Series A', data: [31, 40, 28, 51, 42, 85, 100, 78, 92] },
    { name: 'Series B', data: [0, 32, 45, 32, 34, 52, 41, 62, 45] },
  ];
 
  /** Converts slider 0–100 to 0.00–1.00 */
  get opacityValue(): number {
    return +(this.fillOpacity / 100).toFixed(2);
  }
 
  /** Recomputed whenever a control changes (used with [options] binding) */
  get chartOptions(): ChartOptions {
    return {
      series: this.seriesData,
      chart: {
        type: 'area',
        height: 220,
        stacked: this.stacked,
        toolbar: { show: false },
        background: 'transparent',
        animations: { enabled: true, speed: 400 },
      },
      colors: ['red', 'purple'],
      stroke: {
        curve: this.selectedCurve,
        width: 2,
      },
      fill: {
        type: 'gradient',
        gradient: {
          opacityFrom: this.opacityValue,
          opacityTo: +(this.opacityValue * 0.1).toFixed(4),
        },
      },
      dataLabels: { enabled: false },
      markers: { size: 0, hover: { size: 5 } },
      xaxis: {
        categories: this.categories,
        labels: { style: { colors: '#73726c', fontSize: '11px' } },
        axisBorder: { show: false },
        axisTicks: { show: false },
      },
      yaxis: {
        labels: { style: { colors: '#73726c', fontSize: '11px' } },
      },
      grid: {
        borderColor: 'rgba(0,0,0,0.06)',
        strokeDashArray: 0,
      },
      tooltip: { 
        style: { fontSize: '14px' },
        hideEmptySeries: true,
       },
      legend: { fontSize: '12px' },
    };
  }
}
