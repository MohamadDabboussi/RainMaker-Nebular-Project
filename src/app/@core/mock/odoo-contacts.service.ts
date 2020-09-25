import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import * as xmlrpc from 'xmlrpc'
import express from 'express'
const app = express()
import cors from 'cors'
app.use(cors())


@Injectable()
export class OdooContactsService {

  url = 'http://mohamad.dabboussi'
  port='8069'
  db = 'mydb'
  username = 'admin'
  password = 'admin'
  uid



constructor () {
}

  data: {
    name: Number,
    country_id: String,
    comment: String
  };
  getData() {
  const common=xmlrpc.createClient('http://mohamad.dabboussi:8069/xmlrpc/2/common')
  common.methodCall('version',[],(error,value)=>{
        if(error){console.log('error:',error
        );}
        else{console.log('info:',value);}
      }
      );

  common.methodCall('authenticate',[ this.db, this.username, this.password, {}],(error,value)=>{
    if(error){console.log('error:',error
    );}
    else{this.uid=value;}
  }
  );
    const models=xmlrpc.createClient('http://mohamad.dabboussi:8069/xmlrpc/2/object')
    models.methodCall('execute_kw',[this.db, 2, this.password,
     'res.partner', 'search_read', [[]],{'fields': ['name', 'city', 'email'], 'limit': 5}],(error,value)=>{
       if(error){console.log('error:',error
       );}
       else{console.log(value);}
     }
     );
  }

}
