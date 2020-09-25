import { Component, OnInit } from '@angular/core';
import { OdooContactsService } from './../../../../@core/mock/odoo-contacts.service';

@Component({
  selector: 'ngx-contacts-table',
  templateUrl: './contacts-table.component.html',
  styleUrls: ['./contacts-table.component.scss']
})
export class ContactsTableComponent implements OnInit {

  constructor(private service: OdooContactsService) { }

  ngOnInit(): void {
this.service.getData();
  }

}
