import { User } from './user.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';




@Injectable()
export class UserService {
  readonly rootUrl = 'http://localhost:63315/api/user/';
  //readonly rootUrl = 'http://178.172.15.100:8222/api/User/';
  //readonly rootUrl = 'https://kokelj.azurewebsites.net/api/user/';
  


  constructor(    private http: HttpClient ) {};

  registerUser(user : User){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let body: User = {
      UserName : user.UserName,
      RoomNumber: user.RoomNumber,
      Password: user.Password,
      Email: user.Email,
      FirstName: user.FirstName,
      LastName: user.LastName
    }
    let bodyJson = JSON.stringify( user)
    var reqHeader = new HttpHeaders({'Content-Type': 'application/json' , 'No-Auth':'True'  });
    return this.http.post(this.rootUrl+'register' , bodyJson, {headers : reqHeader});
  }

  userAuthentication(userName, password){
    //let headers = new HttpHeaders();
    //headers.append('Content-Type', 'application/json');
    var reqHeader = new HttpHeaders({'Content-Type': 'application/json' , 'No-Auth':'True' });
    return this.http
      .post(
      this.rootUrl + 'login',JSON.stringify({ userName, password }),{headers : reqHeader});
      
     }

     getUserClaims(){
       //return localStorage.getItem('userToken');
         return this.http.get(this.rootUrl +'roles', {headers : new HttpHeaders({'Authorization' : 'bearer ' + localStorage.getItem('userToken')})});
     }


     roleMatch(allowedRoles): boolean {
      var isMatch = false;
      var userRoles: string[] = JSON.parse(localStorage.getItem('userRoles'));
      //console.log(userRoles);
      allowedRoles.forEach(element => {
        if (userRoles.indexOf(element) > -1) {
          isMatch = true;
          return false;
        }
      });
      return isMatch;
  
    }

    resetPassword(passwordNow:string, passwordAfter: string){
      let headers = new HttpHeaders({ 'Content-Type': 'application/json',
      'Authorization' : 'bearer ' + localStorage.getItem('userToken') });
      let userId = localStorage.getItem('userToken').replace('"','').replace('"','');
      let p1 = passwordNow;
      let p2 = passwordAfter;
      console.log(p1 + "neki " + p2);
      let body = {
        UserId : userId,
        PasswordNow: p1,
        PasswordAfter : p2
      }
      let bodyJson = JSON.stringify(body)
      console.log(bodyJson);
      console.log("1");
      return this.http
        .post(
        this.rootUrl + 'reset',bodyJson,{headers : headers});
        
    }



}
