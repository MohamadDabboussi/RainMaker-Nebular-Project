import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RainMakerTableData } from '../data/RainMaker-table';

interface Rainmaker {
  id: Number;
  firstName: String;
  lastName: String;
  username: String;
  email: String;
  age: Number;
}

@Injectable()
export class RainMakerTableService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    } ),
  };

private RainmakersDataUrl = 'http://localhost:3000/rainmaker';
constructor (private http: HttpClient) {}

  data: {
    id: Number,
    firstName: String,
    lastName: String,
    username: String,
    email: String,
    age: Number,
  };
  // private dataSource = new BehaviorSubject([0, 0, 0]);
  // public currentData = this.dataSource.asObservable();

  getData() {
    return this.http.get<any>(this.RainmakersDataUrl);
  }
  deleteRainmaker(id: number): Observable<void> {
   return this.http.delete<void>(`${this.RainmakersDataUrl}/${id}`);
  }

  AddRainmaker(data) {
    // console.log(data);
    return this.http.post<Rainmaker>(this.RainmakersDataUrl , data , this.httpOptions);
  }

  UpdateRainmaker(data , id) {
    return this.http.put<Rainmaker>(`${this.RainmakersDataUrl}/${id}` , data , this.httpOptions);
  }

}
