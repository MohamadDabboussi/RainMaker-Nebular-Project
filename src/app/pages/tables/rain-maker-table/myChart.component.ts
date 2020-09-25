import { LiveUpdateChart } from './../../../@core/data/earning';
import { EarningLiveUpdateChartComponent } from './../../e-commerce/earning-card/front-side/earning-live-update-chart.component';
import { MyChartService } from './../../../@core/mock/myChart.service';
import { Component, OnDestroy, Input, OnInit, ViewChild } from '@angular/core';
import { NbThemeService } from '@nebular/theme';


@Component({
  selector: 'ngx-mychart',
  template: `
    <chart type="pie" [data]="data" [options]="options"></chart>
  `,
})
export class MyChart implements OnDestroy , OnInit {


 d: number[];

  data: any;
  options: any;
  themeSubscription: any;
  constructor(private theme: NbThemeService, private Chart: MyChartService) {
  }
  ngOnInit() {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      const colors: any = config.variables;
      const chartjs: any = config.variables.chartjs;
      this.Chart.getAgesCount().subscribe(( count: number[] ) => { this.d = count;
      this.data = {
        labels: ['Under 18', 'Between 18 and 64', 'Above 64'],
        datasets: [{
          data: this.d,
          backgroundColor: [colors.primaryLight, colors.infoLight, colors.successLight ] ,
        }],
      };
    },
      );

      this.options = {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          xAxes: [
            {
              display: false,
            },
          ],
          yAxes: [
            {
              display: false,
            },
          ],
        },
        legend: {
          labels: {
            fontColor: chartjs.textColor,
          },
        },
      };
    });
  }
  ngOnDestroy(): void {
    // this.ngOnInit();
    this.themeSubscription.unsubscribe();
  }
}
