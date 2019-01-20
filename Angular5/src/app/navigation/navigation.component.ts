import { Router } from '@angular/router';
import { UserService } from './../shared/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
/*   imageUrl :string = "../assets/img/"; */
  
  constructor(public userService : UserService, public router : Router) { }

  ngOnInit() {
/*     this.imageUrl = this.imageUrl.concat(localStorage.getItem('imageUrl'));
    this.imageUrl =this.imageUrl.replace('"','').replace('"',''); */

  }
  Logout(){
    localStorage.removeItem('userToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('userRoles');
    this.router.navigate(['/login']);
  }
}
