import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TajnistvoService } from '../shared/tajnistvo.service';
/* import * as jsPDF from 'jspdf'
import 'jspdf-autotable'; */
import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';
declare let jsPDF;

@Component({
  selector: 'app-tajnistvo-month',
  templateUrl: './tajnistvo-month.component.html',
  styleUrls: ['./tajnistvo-month.component.css']
})
export class TajnistvoMonthComponent implements OnInit {
 
  meseci :string[] = ['Januar', 'Februar', 'Marec', 'April', 'Maj', 'Junij', 'Julij', 'Avgust', 'September', 'Oktober', 'November', 'December']
  leta : number[] = [2018,2019,2020,2021,2022,2023]
  constructor(public tajnistvoService : TajnistvoService) { }

  ngOnInit() {
    this.tajnistvoService.month = 1;
    this.tajnistvoService.year = 2018;
    this.tajnistvoService.getReportData();
  }
  selectedYear(n : number){
    this.tajnistvoService.year = n;
    this.tajnistvoService.getReportData();
    
  }
  selectedMonth(n : string){
    let k =1;
    for ( let mesec of this.meseci){
      if(mesec == n){
        this.tajnistvoService.month = k;
      }
      k+=1;
    }
    this.tajnistvoService.getReportData();
    
    
  }
  @ViewChild('content') content: ElementRef;
  downloadReportPDF(){
    
    var rows = [];
    var columns = ["Priimek", "Ime", "Soba", "Stevilo", "Tip"];
   
      for(let el of  this.tajnistvoService.resReport){
        rows.push([el.lastName, el.firstName, el.roomNumber, el.washingMachineCount, el.tip]);
      }
      

      // Only pt supported (not mm or in)
      var doc = new jsPDF('p', 'pt');
      doc.text(300, 25, 'Pranja za '+this.meseci[this.tajnistvoService.month-1] + ' '+this.tajnistvoService.year, null, null, 'center');
      doc.autoTable(columns, rows); 
      doc.save(this.meseci[this.tajnistvoService.month-1] + '_'+this.tajnistvoService.year+'.pdf');

      var docDefinition = { content: 'This is an sample PDF printed with pdfMake' };

      
      pdfMake.createPdf(docDefinition).download();
      pdfMake.createPdf(docDefinition).open();

      console.log(docDefinition);

  }

}
