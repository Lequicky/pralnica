import { Component, OnInit } from '@angular/core';
import { ReceptorService } from './shared/receptor.service';
import { ReceptorRes } from './shared/receptor-res.module';

@Component({
  selector: 'app-receptor',
  templateUrl: './receptor.component.html',
  styleUrls: ['./receptor.component.css']
})
export class ReceptorComponent implements OnInit {
  imageUrl :string = "../assets/img/default-image.png";
  imageFolder : string = "../assets/img/"
  constructor(public receptorService :ReceptorService) { }

  ngOnInit() {
    this.receptorService.getReceptorData();
  }

  startWashing(r :ReceptorRes){
    if(confirm("Oddali ste ključ osebi "+r.lastName +" "+r.firstName)){
      this.receptorService.startWashing(r.reservationId);
    }
    
  }
  stopWashing(r :ReceptorRes){
    if(confirm("Oseba "+r.lastName +" "+r.firstName +" je vrnila ključ")){
      this.receptorService.stopWashing(r.reservationId);
    }
    
  }

}
