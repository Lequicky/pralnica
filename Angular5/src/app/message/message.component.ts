import { Router } from '@angular/router';
import { MessageService } from './shared/message.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  constructor(private messageService :MessageService, private router : Router) { }

  ngOnInit() {
  }



  OnSubmit(message:string){
    this.messageService.addMessage(message);
    this.router.navigate(["/student-home"]);
    
    
  }
}
