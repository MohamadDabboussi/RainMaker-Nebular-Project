import { Component } from '@angular/core';

@Component({
  selector: 'ngx-tables',
  template: `<router-outlet></router-outlet>`,
})

// <ngx-myChart *ngIf="{{ routerOutletComponentClass }}==''"></ngx-myChart> `

export class TablesComponent {
  // routerOutletComponent: object;
  // routerOutletComponentClassName: string;
  // onActivate(event: any): void {
  //   this.routerOutletComponent = event;
  //   this.routerOutletComponentClassName = event.constructor.name;
  //   console.log(this.routerOutletComponentClassName);
  // }
}
