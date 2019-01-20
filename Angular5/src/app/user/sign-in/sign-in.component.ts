import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from './../../shared/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  isLoginError : boolean = false;
  constructor(public userSerivce :UserService, public router : Router) { }

  ngOnInit() {
  }

  OnSubmit(userName, password){
      this.userSerivce.userAuthentication(userName, password).subscribe((data : any) => {
        localStorage.setItem('userToken', data.token);
        localStorage.setItem('userRoles', JSON.stringify(data.roles));
        localStorage.setItem('userId', JSON.stringify(data.user_id));
/*         localStorage.setItem('imageUrl', JSON.stringify(data.img)); */
        if(data.role == 'Student'){
          this.router.navigate(['/student-home']);          
        }else if (data.role == 'Accountant'){
          this.router.navigate(['/tajnistvo-home']);  
        }else if (data.role == 'Admin'){
          this.router.navigate(['/users']);
        }
        
        else if (data.role == 'Receptor'){
          this.router.navigate(['/receptor-home']); 
        }        
        else{
          this.router.navigate(['/home']);
        }
        
      },( err : HttpErrorResponse) => {
        this.isLoginError = true;
      });
  }

}
