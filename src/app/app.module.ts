import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LoginComponent } from './login/login.component';
import { VisitorComponent } from './visitor/visitor.component';
import { InviteComponent } from './invite/invite.component';
import { DialogHttpErrorComponent } from './modals/dialog-http-error/dialog-http-error.component'; 

import {MatIconModule} from '@angular/material/icon'; 
import {MatSliderModule} from '@angular/material/slider';
import {MatFormFieldModule} from '@angular/material/form-field'; 
import {MatInputModule} from '@angular/material/input'; 
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select'; 
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { MatSelectFilterModule } from 'mat-select-filter';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    VisitorComponent,
    InviteComponent,
    DialogHttpErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatSelectFilterModule
  ],
  entryComponents: [DialogHttpErrorComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
