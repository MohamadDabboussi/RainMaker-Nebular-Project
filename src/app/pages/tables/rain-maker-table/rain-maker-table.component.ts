import { map } from 'rxjs/operators';
import { RainMakerTableService } from './../../../@core/mock/rain-maker-table.service';
import { MyChart } from './myChart.component';
import { NbColorHelper } from '@nebular/theme';
import { ChartjsPieComponent } from 'app/pages/charts/chartjs/chartjs-pie.component';
import { Component, OnInit } from '@angular/core';
import { RainMakerTableData } from '../../../@core/data/RainMaker-table';
import { LocalDataSource } from 'ng2-smart-table';
import 'zone.js';
import 'reflect-metadata';
import { WHITE_ON_BLACK_CSS_CLASS } from '@angular/cdk/a11y/high-contrast-mode/high-contrast-mode-detector';
import { Subscription } from 'rxjs';
import { MyChartService } from './../../../@core/mock/myChart.service';
import { DataSource } from '@angular/cdk/table';


@Component({
  selector: 'ngx-rain-maker-table',
  templateUrl: './rain-maker-table.component.html',
  styleUrls: ['./rain-maker-table.component.scss'],
})

export class RainMakerTableComponent implements OnInit {

  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      id: {
        title: 'R ID',
        type: 'number',
      },
      firstName: {
        title: 'R First Name',
        type: 'string',
      },
      lastName: {
        title: 'R Last Name',
        type: 'string',
      },
      username: {
        title: 'R Username',
        type: 'string',
      },
      email: {
        title: 'R E-mail',
        type: 'string',
      },
      age: {
        title: 'R Age',
        type: 'number',
      },
    },
  };
  data = [];
  ages: number[] = [];
  agesClasses: {'Under_18': number , 'Between_18_64': number , 'Above_64': number };
  source: LocalDataSource = new LocalDataSource();
  count: number[] = [];
  c: any[] = [];
  constructor(private service: RainMakerTableService, private Chart: MyChartService) {
   // this.agesClasses.Under_18 =0; this.agesClasses.Between_18_64=0; this.agesClasses.Above_64 = 0;
    // this.agesClasses.Under_18 =count[0];
    // this.agesClasses.Between_18_64 =count[1];
    // this.agesClasses.Above_64 = count[2];
   // console.log(this.count);
  }
  UpdateAges() {
    // console.log(this.source['data']);
    this.ages = this.GetAges(this.source['data']);
    this. count = this.ClassifyAges(this.ages);
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
    // console.log(event.data.id)
    this.service.deleteRainmaker(event.data.id).subscribe(() => { // console.log('Rainmaker deleted');
    this.UpdateAges();
    this.Chart.setAgesCount(this.count); } );
    event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onSaveConfirm(event): void {
    if (window.confirm('Are you sure you want to save?')) {
      this.service.UpdateRainmaker(event.newData, event.data.id).subscribe(
        () => {
          this.UpdateAges();
          this.Chart.setAgesCount(this.count);
        }, (error) => {
         // console.log("ERROR ADDING RAINMAKER");
        });
        event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onAddRainmaker(event): void {
    if (window.confirm('Are you sure you want to add a Rainmaker?')) {
      this.service.AddRainmaker(event.newData).subscribe(
        () => {
          this.UpdateAges();
          this.Chart.setAgesCount(this.count);
        }, (error) => {
         // console.log("ERROR ADDING RAINMAKER");
        });
        event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }











  GetAges(data): number[] {
    const ages: number[] = [] ;
    for (let i = 0; i < data.length; i++) {
      ages.push(data[i]['age']);
    }
    return ages;
  }
  ClassifyAges(ages: number[]): number[] {
    const count: number[] = [ 0 , 0 , 0 ];
    for (let i = 0; i < ages.length; i++) {
      switch (true) {
        case (ages[i] < 18): {count[0]++; break; }
        case (18 <= ages[i] && ages[i] <= 64): {count[1]++; break; }
        case (ages[i] > 64 ): {count[2]++; break; }
      }
    }
       return count;
  }

  ngOnInit() {
    this.service.getData()
    .subscribe(
      res => { this.data = res;
      this.source.load(this.data),
      this.UpdateAges();
      this.Chart.setAgesCount(this.count);
      },
     // err => console.log(err)
    );
}
}

