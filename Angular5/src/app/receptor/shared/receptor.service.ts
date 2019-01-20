import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ReceptorRes } from './receptor-res.module';

@Injectable({
  providedIn: 'root'
})
export class ReceptorService {
  readonly rootUrl = 'http://178.172.15.100:8222/api/reservations/';
 // readonly rootUrl = 'http://178.172.15.100:8201/api/reservations/';
   // readonly rootUrl = 'http://localhost:63315/api/reservations/';
  res : ReceptorRes[];
  constructor(private http: HttpClient) { }

  getReceptorData() {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json',
                     'Authorization' : 'bearer ' + localStorage.getItem('userToken') });
    this.http.get(this.rootUrl+'receptor', {headers : headers}).subscribe((data : any) =>
     {
        this.res = data;
      } );
  }

  startWashing(id :number){
    let headers = new HttpHeaders({ 'Content-Type': 'application/json',
    'Authorization' : 'bearer ' + localStorage.getItem('userToken') });
    this.http.post(this.rootUrl+'receptor/start/'+id, {headers : headers}).subscribe((data : any) =>
    {
       //this.res = data;
       this.getReceptorData();
     } );
  }
  stopWashing(id :number){
    let headers = new HttpHeaders({ 'Content-Type': 'application/json',
    'Authorization' : 'bearer ' + localStorage.getItem('userToken') });
    this.http.post(this.rootUrl+'receptor/end/'+id, {headers : headers}).subscribe((data : any) =>
    {
       //this.res = data;
       this.getReceptorData();
     } );
  }
}
