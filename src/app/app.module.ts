import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';

import { AppComponent } from './app.component';
import { FormUploadComponent } from './form-upload/form-upload.component';

import {environment} from '../environments/environment';
import { UploadFileService } from './services/upload-file.service';

@NgModule({
  declarations: [
    AppComponent,
    FormUploadComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule
  ],
  providers: [UploadFileService],
  bootstrap: [AppComponent]
})
export class AppModule { }
