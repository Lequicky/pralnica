import { Component, OnInit } from '@angular/core';
import { StudentViewService } from './shared/student-view.service';

@Component({
  selector: 'app-student-view',
  templateUrl: './student-view.component.html',
  styleUrls: ['./student-view.component.css']
})
export class StudentViewComponent implements OnInit {

  constructor(public studentViewService : StudentViewService) { }

  ngOnInit() {
    this.studentViewService.getUserLastReservations();
    
  }

  deleteReservation(id :number){
    if(confirm("Ali ste prepričani da želite izbrisati rezervacijo?")){
      this.studentViewService.deleteReservation(id);
    }
    
  }

}
