import { UsersService } from './shared/users.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [UsersService]
})
export class UsersComponent implements OnInit {

  constructor(public userService :UserService, public router : Router, public usersService: UsersService) { }

  ngOnInit() {
  }
  Logout(){
    localStorage.removeItem('userToken');
    this.router.navigate(['/login']);
  }

}
