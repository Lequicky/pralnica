import { Component, OnInit } from '@angular/core';
import { ShowMessagesService } from './shared/show-messages.service';

@Component({
  selector: 'app-show-messages',
  templateUrl: './show-messages.component.html',
  styleUrls: ['./show-messages.component.css']
})
export class ShowMessagesComponent implements OnInit {

  constructor(public showMessagesService : ShowMessagesService) { }

  ngOnInit() {
    this.showMessagesService.GetMessages();

  }

}
