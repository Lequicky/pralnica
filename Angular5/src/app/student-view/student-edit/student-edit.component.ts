import { StudentViewService } from './../shared/student-view.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css']
})
export class StudentEditComponent implements OnInit {

  constructor(private studentService : StudentViewService) { }

  ngOnInit() {
  }

}
