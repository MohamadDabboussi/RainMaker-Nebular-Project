import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class MyChartService {
  public agesCount: number[];
  private dataSource = new BehaviorSubject([0, 0, 0]);
  public currentData = this.dataSource.asObservable();

  constructor() { }

  setAgesCount(data: number[]) {
    this.agesCount = data;
    this.dataSource.next(data);
  }
  getAgesCount(): Observable<number[]> {
    return this.dataSource;
  }
}
