import { ReservationsService } from './shared/reservations.service';
import { Component, OnInit } from '@angular/core';
import { Reservation } from './shared/reservation.module';


@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {

  constructor(public reservationsService :ReservationsService) { }

  ngOnInit() {
    this.reservationsService.getReservations();
  }



  chosenTermin(termin : Reservation){
    this.reservationsService.selected = 1;
    this.reservationsService.selectedTermin = termin;
    this.reservationsService.getAvailableRooms(termin.period_id, termin.datum);
    
  }

  
}
