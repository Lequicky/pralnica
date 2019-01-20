
import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';
import {ToastrService} from 'ngx-toastr'
import { User } from '../../shared/user.model';
import { UserService } from '../../shared/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  user: User;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  constructor(public userService: UserService, public toastr:ToastrService, public router : Router) { }

  ngOnInit() {
    this.user = new User();
    this.resetForm()
  }

  resetForm(form? : NgForm){
    if(form != null){
      form.reset();
      this.user = {
        UserName:'',
        RoomNumber:'',
        Password: '',
        Email: '',
        FirstName: '',
        LastName: ''
    }

    }
  }

  OnSubmit(form : NgForm){
    this.userService.registerUser(form.value)
    .subscribe((data:any)=> {

        this.resetForm(form);
        alert("User registration successeful");
        this.router.navigate(['/login']); 

    },
        error => {
          if(error.status == 400){
             alert("Uporabniško ime ali email je že v uporabi");
          }
        }
        );
  }
}
