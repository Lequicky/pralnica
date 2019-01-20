import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../users/shared/users.service';
import { TajnistvoService } from '../shared/tajnistvo.service';

@Component({
  selector: 'app-tajnistvo-user',
  templateUrl: './tajnistvo-user.component.html',
  styleUrls: ['./tajnistvo-user.component.css']
})
export class TajnistvoUserComponent implements OnInit {

  constructor(public usersService : UsersService, public tajnistvoService : TajnistvoService) { }

  ngOnInit() {
  this.usersService.getUsers();
  }

  showUser(id :string){
    this.tajnistvoService.userId =id;
    this.tajnistvoService.getUserMonthReservations();
  
  }

}
