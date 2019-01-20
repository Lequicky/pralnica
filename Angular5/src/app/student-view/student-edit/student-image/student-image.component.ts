import { Component, OnInit } from '@angular/core';
import { StudentViewService } from '../../shared/student-view.service';

@Component({
  selector: 'app-student-image',
  templateUrl: './student-image.component.html',
  styleUrls: ['./student-image.component.css']
})
export class StudentImageComponent implements OnInit {
  imageUrl :string = "../../assets/img/default-image.png";
  fileToUpload : File = null;
    constructor(private studentService : StudentViewService) { }
  
    ngOnInit() {
    }
    handleFileInput(file : FileList){
      this.fileToUpload = file.item(0);
      var reader = new FileReader();
      reader.onload = (event:any)=>{
        this.imageUrl = event.target.result;
      }
      reader.readAsDataURL(this.fileToUpload);
    }
    OnSubmit(Image){
      this.studentService.postImage(this.fileToUpload).subscribe(data =>{
        this.imageUrl = "../assets/img/default-image.png";
      });
    }
}
