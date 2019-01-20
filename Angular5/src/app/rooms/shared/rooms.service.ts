import { Room } from './room.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {
  //readonly rootUrl = 'http://178.172.15.100:8222/api/washingroom/';
  //readonly rootUrl = 'http://178.172.15.100:8201/api/washingroom/';
readonly rootUrl = 'http://localhost:63315/api/washingroom/';
  selectedRoom : Room;
  roomsList : Room[];
  constructor(private http: HttpClient) { 
    
  }

  addNewRoom(room : Room){
    let headers = new HttpHeaders({ 'Content-Type': 'application/json',
                                  'Authorization' : 'bearer ' + localStorage.getItem('userToken') });
    let bodyJson = JSON.stringify( room)
    return this.http.post(this.rootUrl, bodyJson, {headers : headers});
  }

  updateRoom(room : Room){
    let headers = new HttpHeaders({ 'Content-Type': 'application/json',
                                  'Authorization' : 'bearer ' + localStorage.getItem('userToken') });
    let bodyJson = JSON.stringify(room)
    return this.http.put(this.rootUrl, bodyJson, {headers : headers});
  }
  changeRoomStatus(id : number){
    let headers = new HttpHeaders({ 'Content-Type': 'application/json',
    'Authorization' : 'bearer ' + localStorage.getItem('userToken') });
    return this.http.put(this.rootUrl+id, {headers : headers});
  }

  deleteRoom(id : number){
    let headers = new HttpHeaders({ 'Content-Type': 'application/json',
    'Authorization' : 'bearer ' + localStorage.getItem('userToken') });
    return this.http.delete(this.rootUrl+id, {headers : headers});
  }

   getRooms() {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json',
                                 'Authorization' : 'bearer ' + localStorage.getItem('userToken') });
    this.http.get(this.rootUrl, {headers : headers}).map((data : Room[]) => {return data as Room[]}).toPromise().then(x => {this.roomsList = x});
  }
}
