import { StudentViewService } from './../../student-view/shared/student-view.service';
import { Component, OnInit } from '@angular/core';
import { ReservationsService } from '../shared/reservations.service';
import { Reservation } from '../shared/reservation.module';
import { Room } from '../../rooms/shared/room.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-termin',
  templateUrl: './termin.component.html',
  styleUrls: ['./termin.component.css']
})
export class TerminComponent implements OnInit {
  constructor(public reservationsService : ReservationsService,  private router : Router, public studentService :StudentViewService) { }
  chosenRoom: Room;
  isSelected : number = 0;
  numberOfWashingMachines : number;
  ngOnInit() {
    this.reservationsService.selectedTermin = new Reservation();
    this.chosenRoom = new Room();
    this.numberOfWashingMachines =1;
  }


  changeRoom(room :string){
    for(let k of this.reservationsService.availableWashingRooms){
      if (k.name ==room){
        this.chosenRoom = k;
        this.isSelected = 1;
      }
    }
    
  }

  test(cnt : number){
    this.numberOfWashingMachines = cnt;
  }

  OnSubmit(){
    if(this.numberOfWashingMachines > 3){
      alert("Pralnih strojev je lahko največ 3");
    }else{
      this.reservationsService.AddReservation(this.chosenRoom.id, this.numberOfWashingMachines);
      this.studentService.getUserLastReservations();
      this.reservationsService.getReservations();
      this.router.navigate(['/student-home']);
    }

    
  }
}
