
import { RoomsService } from './shared/rooms.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css'],
  providers: [RoomsService]
 
})
export class RoomsComponent implements OnInit {

  constructor(public roomsService : RoomsService) { }

  ngOnInit() {


  }



}
