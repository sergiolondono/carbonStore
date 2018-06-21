import {Injectable} from '@angular/core';
import {AngularFireDatabase, snapshotChanges} from 'angularfire2/database';
import * as firebase from 'firebase';

import {FileUpload} from '../fileupload';

@Injectable()
export class UploadFileService {

  constructor(private db: AngularFireDatabase) {}

  private basePath = '/uploads';

  manageFileToStorage(fileUpload: FileUpload, progress: {percentage: number}){
    let response = this.pushFileToStorage(fileUpload, progress);
    console.log(response);
    this.saveFileData(response);
  }

  pushFileToStorage(fileUpload: FileUpload, progress: {percentage: number}) {

    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${this.basePath}/${fileUpload.file.name}`).put(fileUpload.file);
    
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        // in progress
        const snap = snapshot as firebase.storage.UploadTaskSnapshot
        progress.percentage = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);        
      },
      (error) => {
        // fail
        console.log(error);
      },
      () => {
         storageRef.child(`${this.basePath}/${fileUpload.file.name}`).getDownloadURL()
        .then((url) => {
          fileUpload.name = fileUpload.file.name;
          fileUpload.url = url;
          this.saveFileData(fileUpload);
        });
      }
    );
    return fileUpload;
  }

  private saveFileData(fileUpload: FileUpload) {
    console.log("saveFileData Reached");
    console.log(fileUpload);
    this.db.list(`${this.basePath}/`).push(fileUpload);
  }
}
