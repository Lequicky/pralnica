import { UsersService } from './../shared/users.service';
import { Component, OnInit } from '@angular/core';
import { Users } from '../shared/users.model';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  imageUrl :string = "../assets/img/default-image.png";
  imageFolder : string = "../assets/img/"
  constructor(public usersService : UsersService) { }

  ngOnInit() {
    this.usersService.getUsers();
    
  }
  
  changeStatus(id : string){
    this.usersService.changeUserStatus(id).subscribe(data => {
      this.usersService.getUsers();
   })
  }

  deleteUser(user : Users){
    if(confirm("Ste prepričani da želite izbrisati uporabnika "+user.lastName +" " +user.firstName+"?")){
      this.usersService.deleteUser(user.id).subscribe(data => {
        this.usersService.getUsers();
      });
    }

  }
}
