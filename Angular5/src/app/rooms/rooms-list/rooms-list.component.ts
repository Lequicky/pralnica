import { RoomsService } from '../shared/rooms.service';
import { Component, OnInit } from '@angular/core';
import { Room } from '../shared/room.model';

@Component({
  selector: 'app-rooms-list',
  templateUrl: './rooms-list.component.html',
  styleUrls: ['./rooms-list.component.css']
})
export class RoomsListComponent implements OnInit {
  constructor(public roomsService : RoomsService) { }

  ngOnInit() {
    this.roomsService.getRooms();
  }
  showForEdit(room : Room){
    this.roomsService.selectedRoom =room;
  }
  changeStatus(id : number){
    this.roomsService.changeRoomStatus(id).subscribe(data => {
      this.roomsService.getRooms();
   })
  }
  deleteRoom(id : number){
    this.roomsService.deleteRoom(id).subscribe(data => {
      this.roomsService.getRooms();
   })
  }
}
