import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Chart } from "./chart/chart";
import { Slider } from "./slider/slider";
import { Input } from "./input/input";
import { DonutChart } from "./donut-chart/donut-chart";

@Component({
  selector: 'app-root',
  imports: [Chart, Slider, Input, DonutChart],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('chart-project');
}
