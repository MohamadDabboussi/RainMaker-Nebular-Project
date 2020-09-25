import { RainMakerTableService } from './../../@core/mock/rain-maker-table.service';
import { MyChartService } from './../../@core/mock/myChart.service';
import { OdooContactsService } from './../../@core/mock/odoo-contacts.service';
import { MyChart } from './rain-maker-table/myChart.component';
import { ChartjsPieComponent } from 'app/pages/charts/chartjs/chartjs-pie.component';
import { ChartModule } from 'angular2-chartjs';


import { NgModule } from '@angular/core';
import { NbCardModule, NbIconModule, NbInputModule, NbTreeGridModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { TablesRoutingModule, routedComponents } from './tables-routing.module';
import { FsIconComponent } from './tree-grid/tree-grid.component';
import { RouterOutlet } from '@angular/router';
import { ContactsTableComponent } from './odoo-contacts-table/contacts-table/contacts-table.component';

@NgModule({
  imports: [
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    ThemeModule,
    TablesRoutingModule,
    Ng2SmartTableModule,
    ChartModule,
  ],
  declarations: [
    ...routedComponents,
    FsIconComponent,
    MyChart,
    ContactsTableComponent,
  ],
  providers: [RainMakerTableService, MyChartService,OdooContactsService],
})
export class TablesModule { }

