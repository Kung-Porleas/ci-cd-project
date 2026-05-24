import { AfterViewInit, Component, OnInit, signal, Signal, ViewChild } from '@angular/core';
import { ApexOptions, ChartComponent } from 'ng-apexcharts';

@Component({
  selector: 'app-donut-chart',
  imports: [ChartComponent],
  templateUrl: './donut-chart.html',
  styleUrl: './donut-chart.css',
})
export class DonutChart implements OnInit, AfterViewInit {
  @ViewChild('chart') chartComponent!: ChartComponent;
  public chartOptions = signal<ApexOptions>({});

  ngOnInit(): void {
    this.initChart();
  }

  initChart(): void {
    this.chartOptions.set({
      // series: [44, 55, 41, 17, 15],
      series: [
       // ~1.61
        Math.log10(99),          // ~1.23
        Math.log10(88999999) // ~29.95
      ],
      colors: ['#1f77d2', '#ff6b6b'],
      chart: {
        type: 'donut',
        width: 400,
        height: 400,
        events: {
          click: (event, chartContext, config) => {
            // Force show tooltip after a small delay
            setTimeout(() => {
              const tooltip = document.querySelector('.apexcharts-tooltip');
              if (tooltip) {
                console.log(tooltip);
                
                (tooltip as HTMLElement).style.display = 'block';
              }
            }, 100);
          }
        }
      },
      labels: ['Series A', 'Series B', 'Series C', 'Series D', 'Series E'],
      plotOptions: {
        pie: {
          donut: {
            size: '65%'
          }
        }
      },
     tooltip: {
    enabled: true,
    shared: true,       // Show all series data at once
    intersect: false,   // Trigger based on the nearest data point
    followCursor: false // This is often more stable on mobile
  },
  // For line charts, you can also make the markers larger for easier tapping
  markers: {
    size: 6, // Increase marker size on mobile
    hover: {
      size: 9
    }
  },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
            // tooltip: {
           
            //   enabled: true,
            //   shared: true,
            //   followCursor: true
            // },
            // state: {
            //   allowMultipleDataPointsSelection: false,
            //   active: {
            //     filter: {
            //       type: 'darken',
            //     },
            //   },
            // },
          },
        },
      ],
    });
  }

  handleChartClick(event: any, chartContext: any, config: any): void {
    this.chartOptions.update((options) => {
      options.tooltip = {
        enabled: true,
        followCursor: true
      };
      return options;
    });
  }


  isMobile(): boolean {
    return window.innerWidth <= 768;
  }

  ngAfterViewInit(): void {
  const chartElement = document.querySelector('.apexcharts-canvas');
  
  if (chartElement) {
    // Handle touch/click for mobile and desktop
    chartElement.addEventListener('click', (event: Event) => {
      console.log('wokr===');
      
      const clickEvent = event as MouseEvent;
      const tooltip = document.querySelector('.apexcharts-tooltip');
      
      if (tooltip) {
        (tooltip as HTMLElement).style.display = 'block';
        (tooltip as HTMLElement).style.left = clickEvent.clientX + 'px';
        (tooltip as HTMLElement).style.top = clickEvent.clientY + 'px';
      }
    });

    chartElement.addEventListener('touchend', (event: Event) => {
      const touchEvent = event as TouchEvent;
      
      // Get the last touch point
      if (touchEvent.changedTouches.length > 0) {
        const touch = touchEvent.changedTouches[0];
        const tooltip = document.querySelector('.apexcharts-tooltip');
        
        if (tooltip) {
          (tooltip as HTMLElement).style.display = 'block';
          (tooltip as HTMLElement).style.left = touch.clientX + 'px';
          (tooltip as HTMLElement).style.top = touch.clientY + 'px';
        }
      }
    });
  }
}
  
}
