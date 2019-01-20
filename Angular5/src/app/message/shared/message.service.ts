import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
 // readonly rootUrl = 'https://kokelj.azurewebsites.net/api/reservations/message';
  readonly rootUrl = 'http://178.172.15.100:8222/api/reservations/message';
    //readonly rootUrl = 'http://localhost:63315/api/reservations/message';
  constructor(private http: HttpClient) { }

  addMessage(message : string) {
    //let headers = new HttpHeaders({ 'Content-Type': 'application/json',
                     //             'Authorization' : 'bearer ' + localStorage.getItem('userToken') });
    let headers = new HttpHeaders({ 'Content-Type': 'application/json',
                     'Authorization' : 'bearer ' + localStorage.getItem('userToken') });
    let a :any = {}
    a.identityId = localStorage.getItem("userId");
    a.messageText = message;
    let bodyJson = JSON.stringify(a);
    //var reqHeader = new HttpHeaders({'Content-Type': 'application/json' , 'No-Auth':'True'  });
    this.http.post(this.rootUrl,a, {headers : headers}).subscribe((data : any) =>
     {
      alert("Uspešno prijavljena napaka");
      } );
  }
}
