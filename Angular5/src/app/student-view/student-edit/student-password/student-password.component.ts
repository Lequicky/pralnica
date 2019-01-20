import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../../../shared/user.service';

@Component({
  selector: 'app-student-password',
  templateUrl: './student-password.component.html',
  styleUrls: ['./student-password.component.css']
})
 //import { NgForm } from '@angular/forms';
export class StudentPasswordComponent implements OnInit {
  resetPassword : NgForm;
  constructor(private userService :UserService) { }

  ngOnInit() {
  }
  
  OnSubmit(PasswordBefore:string, Password1:string, Password2:string){

    if ( Password1 === Password2 ){
      alert("novo geslo se neujema");
      (document.querySelector("resetPassword") as HTMLFormElement).reset();
    }else{
      this.userService.resetPassword(PasswordBefore,Password1).subscribe(
        
      );
      alert("Uspešno spremenjen password!");
      
    }
    
  }

}
