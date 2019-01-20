import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StudentReservation } from './student-reservation.model';

@Injectable({
  providedIn: 'root'
})
export class StudentViewService {
  readonly rootUrl = 'http://localhost:63315/api/reservations/';
 // readonly rootUrl = 'http://178.172.15.100:8222/api/reservations/';
  //readonly rootUrl = 'https://kokelj.azurewebsites.net/api/reservations/';
  reservations : StudentReservation[];
  reservationsHistory : StudentReservation[];
  constructor(private http: HttpClient) { }

  getUserLastReservations() {
    //let headers = new HttpHeaders({ 'Content-Type': 'application/json',
                     //             'Authorization' : 'bearer ' + localStorage.getItem('userToken') });
    let headers = new HttpHeaders({ 'Content-Type': 'application/json',
                     'Authorization' : 'bearer ' + localStorage.getItem('userToken') });
    let bodyJson = JSON.stringify( this.rootUrl+localStorage.getItem("userId"))
    //var reqHeader = new HttpHeaders({'Content-Type': 'application/json' , 'No-Auth':'True'  });
    this.http.get(this.rootUrl+localStorage.getItem("userId").replace('"','').replace('"',''), {headers : headers}).subscribe((data : any) =>
     {
       this.reservations = data
      
      } );
  }

  getUserHistoryReservations() {
    //let headers = new HttpHeaders({ 'Content-Type': 'application/json',
                     //             'Authorization' : 'bearer ' + localStorage.getItem('userToken') });
    let headers = new HttpHeaders({ 'Content-Type': 'application/json',
                     'Authorization' : 'bearer ' + localStorage.getItem('userToken') });
    let bodyJson = JSON.stringify( this.rootUrl+localStorage.getItem("userId"))
    //var reqHeader = new HttpHeaders({'Content-Type': 'application/json' , 'No-Auth':'True'  });
    this.http.get(this.rootUrl+'h/'+localStorage.getItem("userId").replace('"','').replace('"',''), {headers : headers}).subscribe((data : any) =>
     {
       this.reservationsHistory = data
      
      } );
  }

  deleteReservation(id :number){
    let headers = new HttpHeaders({ 'Content-Type': 'application/json',
                     'Authorization' : 'bearer ' + localStorage.getItem('userToken') });
    this.http.delete(this.rootUrl+id, {headers : headers}).subscribe((data : any) =>
    {
      this.getUserLastReservations();
    } );
  }
  postImage(fileToUpload : File){
    const formData : FormData = new FormData();
    formData.append('Image', fileToUpload, fileToUpload.name);
    //formData.append('UserId', localStorage.getItem("userId"));
    return this.http.post(this.rootUrl+localStorage.getItem("userId").replace('"','').replace('"','')+'/image', formData);
  }
  
}
