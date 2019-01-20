import { TajnistvoRes } from './tajnistvo-res.module';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TajnistvoService {
  //readonly rootUrl = 'https://kokelj.azurewebsites.net/api/reservations/';
  //readonly rootUrl = 'http://178.172.15.100:8222/api/reservations/';
    readonly rootUrl = 'http://localhost:63315/api/reservations/';
  
  userId : string;
  month : number;
  year : number;
  res : TajnistvoRes[];

  resReport : TajnistvoRes[];
  constructor(private http: HttpClient) { 
    
  }


  getUserMonthReservations() {
    //let headers = new HttpHeaders({ 'Content-Type': 'application/json',
                     //             'Authorization' : 'bearer ' + localStorage.getItem('userToken') });
    let headers = new HttpHeaders({ 'Content-Type': 'application/json',
                     'Authorization' : 'bearer ' + localStorage.getItem('userToken') });
    //let bodyJson = JSON.stringify( room)
    //var reqHeader = new HttpHeaders({'Content-Type': 'application/json' , 'No-Auth':'True'  });
    let date  = this.month+'.01.'+this.year;
    this.http.get(this.rootUrl+this.userId+'/'+date, {headers : headers}).subscribe((data : any) =>
     {
      this.res = data;
      } );
/*     this.http.get(this.rootUrl, {headers : headers}).map((data : any) => {return data.days as string[]}).toPromise().then(x => {this.dnevi = x});//.subscribe( (data : Room[]) =>{
      //this.roomsList = data} );   
    this.http.get(this.rootUrl, {headers : headers}).map((data : any) => {return data.termin1 as Reservation[]}).toPromise().then(x => {this.termini1 = x}); 
    this.http.get(this.rootUrl, {headers : headers}).map((data : any) => {return data.termin2 as Reservation[]}).toPromise().then(x => {this.termini2 = x});
    this.http.get(this.rootUrl, {headers : headers}).map((data : any) => {return data.termin3 as Reservation[]}).toPromise().then(x => {this.termini3 = x});
    this.http.get(this.rootUrl, {headers : headers}).map((data : any) => {return data.termin4 as Reservation[]}).toPromise().then(x => {this.termini4 = x});
    this.http.get(this.rootUrl, {headers : headers}).map((data : any) => {return data.termini as string[]}).toPromise().then(x => {this.termini = x}); */
  }

  getReportData(){
    let headers = new HttpHeaders({ 'Content-Type': 'application/json',
    'Authorization' : 'bearer ' + localStorage.getItem('userToken') });
      //let bodyJson = JSON.stringify( room)
      //var reqHeader = new HttpHeaders({'Content-Type': 'application/json' , 'No-Auth':'True'  });
      let date  = this.month+'.01.'+this.year;
      this.http.get(this.rootUrl+'report/'+date, {headers : headers}).subscribe((data : any) =>
      {
      this.resReport = data;
      console.log(this.resReport);
      } );
  }

  deleteReservation(id :number){
    let headers = new HttpHeaders({ 'Content-Type': 'application/json',
                     'Authorization' : 'bearer ' + localStorage.getItem('userToken') });
    this.http.delete(this.rootUrl+id, {headers : headers}).subscribe((data : any) =>
    {
      this.getUserMonthReservations();
    } );
  }

  


}
