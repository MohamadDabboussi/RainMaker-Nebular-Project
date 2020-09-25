import { ChartjsPieComponent } from 'app/pages/charts/chartjs/chartjs-pie.component';
import { NgModule, Component, TemplateRef } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TablesComponent } from './tables.component';
import { SmartTableComponent } from './smart-table/smart-table.component';
import { RainMakerTableComponent } from './rain-maker-table/rain-maker-table.component';
import { TreeGridComponent } from './tree-grid/tree-grid.component';
import { ContactsTableComponent } from './odoo-contacts-table/contacts-table/contacts-table.component';

const routes: Routes = [{
  path: '',
  component: TablesComponent,
  children: [
    {
      path: 'odoo-contacts-table',
      component : ContactsTableComponent,
    },
    {
      path: 'rain-maker-table',
      component : RainMakerTableComponent,
    },
    {
      path: 'smart-table',
      component: SmartTableComponent,
    },
    {
      path: 'tree-grid',
      component: TreeGridComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TablesRoutingModule { }

export const routedComponents = [
  TablesComponent,
  RainMakerTableComponent,
  SmartTableComponent,
  TreeGridComponent,
];
