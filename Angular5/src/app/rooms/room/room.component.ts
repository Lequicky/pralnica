
import { Component, OnInit } from '@angular/core';

import { UserService } from '../../shared/user.service';
import { NgForm } from '@angular/forms';
import { RoomsService } from '../shared/rooms.service';


@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']


})
export class RoomComponent implements OnInit {

  
  constructor( public userService : UserService, public roomsService: RoomsService) { }

  ngOnInit() {
    
    this.resetForm()
  }


  resetForm(form? : NgForm){
    if(form != null){
      form.reset();
    }
      
    this.roomsService.selectedRoom  = {
        id: null,
        code:'',
        name:'',
        washingMachineCount:'0',
        isActive:false     
      }
      
    
  } 
 onSubmit(form : NgForm){
   if(form.value.id == null){
    this.roomsService.addNewRoom(form.value).subscribe(data => {
      this.resetForm(form);
      this.roomsService.getRooms();
     })
   }else{
     this.roomsService.updateRoom(form.value).subscribe(data => {
      this.resetForm(form);
      this.roomsService.getRooms();
   })
  }
  
}


 
 
}
