import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) { }

  deleteItem(id: number): Observable<any> {
    return this.http.delete(`/api/items/${id}`);
  }
}
