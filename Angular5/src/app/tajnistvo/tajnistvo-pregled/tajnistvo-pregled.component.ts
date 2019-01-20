import { TajnistvoService } from './../shared/tajnistvo.service';

import { Component, OnInit } from '@angular/core';
import { TajnistvoRes } from '../shared/tajnistvo-res.module';

@Component({
  selector: 'app-tajnistvo-pregled',
  templateUrl: './tajnistvo-pregled.component.html',
  styleUrls: ['./tajnistvo-pregled.component.css']
})
export class TajnistvoPregledComponent implements OnInit {
  meseci :string[] = ['Januar', 'Februar', 'Marec', 'April', 'Maj', 'Junij', 'Julij', 'Avgust', 'September', 'Oktober', 'November', 'December']
  leta : number[] = [2018,2019,2020,2021,2022,2023]
  admin :number = 0;
  constructor(public tajnistvoService : TajnistvoService) { }

  ngOnInit() {
    this.tajnistvoService.month = 0;
    this.tajnistvoService.year = 2018;
    this.tajnistvoService.getUserMonthReservations();
    
  }
  selectedYear(n : number){
    this.tajnistvoService.year = n;
    this.tajnistvoService.getUserMonthReservations();
    
  }
  selectedMonth(n : string){
    let k =1;
    for ( let mesec of this.meseci){
      if(mesec == n){
        this.tajnistvoService.month = k;
      }
      k+=1;
    }
    this.tajnistvoService.getUserMonthReservations();
    
    
  }
  deleteReservation(res : TajnistvoRes ){
    if(confirm("Ste prepričani da želite izbrisati rezervacijo za "+res.dateOfWashing +"?")){
      this.tajnistvoService.deleteReservation(res.id);
    }
    
  }

  

}
