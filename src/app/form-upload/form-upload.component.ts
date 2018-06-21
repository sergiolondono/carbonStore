import { Component, OnInit } from '@angular/core'; 
import {FileUpload} from '../fileupload';
import { UploadFileService } from '../services/upload-file.service';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'form-upload',
  templateUrl: './form-upload.component.html',
  styleUrls: ['./form-upload.component.css']
})
export class FormUploadComponent implements OnInit {

  selectedFiles: FileList
  currentFileUpload: FileUpload
  progress: {percentage: number} = {percentage: 0}
 
  listFiles;

  constructor(private uploadService: UploadFileService, private db: AngularFireDatabase) {

  }
 
  ngOnInit() {
     this.db.list('uploads/').valueChanges()
    .subscribe(files => {
      this.listFiles = files;
      console.log(files);
    }); 
    console.log(this.listFiles);  
  }
 
  selectFile(event) {
    this.selectedFiles = event.target.files;
  }
 
  upload() {
    const file = this.selectedFiles.item(0)
    this.currentFileUpload = new FileUpload(file);
    this.uploadService.pushFileToStorage(this.currentFileUpload, this.progress)
  }

}
