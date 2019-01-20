import { Component, OnInit } from '@angular/core';
import { StudentViewService } from '../shared/student-view.service';

@Component({
  selector: 'app-student-before',
  templateUrl: './student-before.component.html',
  styleUrls: ['./student-before.component.css']
})
export class StudentBeforeComponent implements OnInit {

  constructor(public studentViewService : StudentViewService) { }

  ngOnInit() {
    this.studentViewService.getUserHistoryReservations();
  }

}
