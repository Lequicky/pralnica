import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Messages } from './messages';

@Injectable({
  providedIn: 'root'
})
export class ShowMessagesService {
  messages : Messages[]
  //readonly rootUrl = 'https://kokelj.azurewebsites.net/api/reservations/message';
  readonly rootUrl = 'http://178.172.15.100:8222/api/reservations/message';
  //readonly rootUrl = 'http://localhost:63315/api/reservations/message';
  constructor(private http: HttpClient) { }

  GetMessages() {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json',
                     'Authorization' : 'bearer ' + localStorage.getItem('userToken') });

    this.http.get(this.rootUrl, {headers : headers}).subscribe((data : any) =>
     {
      this.messages = data;
      } );
  }
}
