import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Users } from './users.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  //readonly rootUrl = 'https://kokelj.azurewebsites.net/api/users/';
  //readonly rootUrl = 'http://178.172.15.100:8222/api/users/';
    readonly rootUrl = 'http://localhost:63315/api/users/';
  usersList : Users[];
  constructor(private http: HttpClient) {
    this.usersList = new Array<Users>();
   }

   getUsers(){
    let headers = new HttpHeaders({ 'Content-Type': 'application/json',
    'Authorization' : 'bearer ' + localStorage.getItem('userToken') });

    //var reqHeader = new HttpHeaders({'Content-Type': 'application/json' , 'No-Auth':'True'  });
    this.http.get(this.rootUrl, {headers : headers}).map((data : Users[]) => {return data as Users[]}).toPromise().then(x => {this.usersList = x});//.subscribe( (data : Room[]) =>{
      //this.roomsList = data} );   
   }

   changeUserStatus(id : string){
    let headers = new HttpHeaders({ 'Content-Type': 'application/json',
    'Authorization' : 'bearer ' + localStorage.getItem('userToken') });

    return this.http.put(this.rootUrl+id, {headers : headers});
  }

  deleteUser(id : string){
    let headers = new HttpHeaders({ 'Content-Type': 'application/json',
    'Authorization' : 'bearer ' + localStorage.getItem('userToken') });

    return this.http.delete(this.rootUrl+id, {headers : headers});
  }
}
