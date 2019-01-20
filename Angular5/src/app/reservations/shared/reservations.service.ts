
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Reservation } from '../shared/reservation.module';
import { Room } from '../../rooms/shared/room.model';
import { ReservatioDto } from './reservatio-dto.module';


@Injectable({
  providedIn: 'root'
})
export class ReservationsService {

 //readonly rootUrl = 'https://kokelj.azurewebsites.net/api/reservations/';
  //readonly rootUrl = 'http://178.172.15.100:8222/api/reservations/';
    readonly rootUrl = 'http://localhost:63315/api/reservations/';
  termini1 : Reservation[];
  termini2 : Reservation[];
  termini3 : Reservation[];
  termini4 : Reservation[];
  dnevi : string[];
  termini : string[];

  selected : number; // da je izbran dropdown

  selectedTermin : Reservation;
  selectedWashingRoom : Room;
  availableWashingRooms : Room[];
  constructor(private http: HttpClient) { 
    
  }


  getReservations() {
    //let headers = new HttpHeaders({ 'Content-Type': 'application/json',
                     //             'Authorization' : 'bearer ' + localStorage.getItem('userToken') });
    let headers = new HttpHeaders({ 'Content-Type': 'application/json',
                     'Authorization' : 'bearer ' + localStorage.getItem('userToken') });
    //let bodyJson = JSON.stringify( room)
    //var reqHeader = new HttpHeaders({'Content-Type': 'application/json' , 'No-Auth':'True'  });
    this.http.get(this.rootUrl, {headers : headers}).subscribe((data : any) =>
     {this.termini = data.termini,
      this.termini1 = data.termin1,
      this.termini2 = data.termin2,
      this.termini3 = data.termin3,
      this.termini4 = data.termin4,
      this.dnevi = data.days
      } );
/*     this.http.get(this.rootUrl, {headers : headers}).map((data : any) => {return data.days as string[]}).toPromise().then(x => {this.dnevi = x});//.subscribe( (data : Room[]) =>{
      //this.roomsList = data} );   
    this.http.get(this.rootUrl, {headers : headers}).map((data : any) => {return data.termin1 as Reservation[]}).toPromise().then(x => {this.termini1 = x}); 
    this.http.get(this.rootUrl, {headers : headers}).map((data : any) => {return data.termin2 as Reservation[]}).toPromise().then(x => {this.termini2 = x});
    this.http.get(this.rootUrl, {headers : headers}).map((data : any) => {return data.termin3 as Reservation[]}).toPromise().then(x => {this.termini3 = x});
    this.http.get(this.rootUrl, {headers : headers}).map((data : any) => {return data.termin4 as Reservation[]}).toPromise().then(x => {this.termini4 = x});
    this.http.get(this.rootUrl, {headers : headers}).map((data : any) => {return data.termini as string[]}).toPromise().then(x => {this.termini = x}); */
  }

  getAvailableRooms(period_id : number, date : string){
    let headers = new HttpHeaders({ 'Content-Type': 'application/json',
    'Authorization' : 'bearer ' + localStorage.getItem('userToken') });
    this.http.get(this.rootUrl+'available/'+this.selectedTermin.period_id+'/'+this.selectedTermin.datum, {headers : headers}).subscribe((data : any) =>
    {
      this.availableWashingRooms = data;
    } );
  }

  AddReservation(roomId:number, washingMachineCount : number){
    let headers = new HttpHeaders({ 'Content-Type': 'application/json',
    'Authorization' : 'bearer ' + localStorage.getItem('userToken') });
    let body: ReservatioDto = {
      UserId : localStorage.getItem('userId'),
      RoomId: roomId,
      PeriodId : this.selectedTermin.period_id,
      Date : this.selectedTermin.datum,
      WashingMachineCount: washingMachineCount,

    }
    console.log(washingMachineCount);
    let bodyJson = JSON.stringify( body)
    this.http.post(this.rootUrl,bodyJson ,{headers : headers}).subscribe((data : any) =>
    {
      
      if(data.status ==1){
        
        alert("Rezervacija ni uspešna perete lahko le enkrat na 5 dni.");
      }
      this.getReservations();
    } );
  }
}


