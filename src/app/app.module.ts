import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './routing/app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LoginComponent } from './components/login/login.component';
import { VisitorComponent } from './components/profile/visitor.component';
import { InviteComponent } from './components/invite/invite.component';
import { ExhibitionsComponent } from './components/profile/exhibitions/exhibitions.component';
import { DialogHttpErrorComponent } from './modals/dialog-http-error/dialog-http-error.component';
import { SpinnerFullscreenComponent } from './modals/spinner-fullscreen/spinner-fullscreen.component';
import { DialogInfoComponent } from './modals/dialog-info/dialog-info.component';
import { DashboardComponent } from './components/dashboard/dashboard.component'; 
import { ExhibComponent } from './components/exhib/exhib.component';

import {MatIconModule} from '@angular/material/icon'; 
import {MatSliderModule} from '@angular/material/slider';
import {MatFormFieldModule} from '@angular/material/form-field'; 
import {MatInputModule} from '@angular/material/input';  
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select'; 
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatAutocompleteModule} from '@angular/material/autocomplete'; 
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatCardModule} from '@angular/material/card';
import {MatMenuModule} from '@angular/material/menu';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatChipsModule} from '@angular/material/chips';

import { MatSelectFilterModule } from 'mat-select-filter';
import { NgxBarcodeComponent } from './shared/lib/ngx-barcode.component';
import { TranslatePipe } from './translate.pipe';
import { DialogConfirmComponent } from './modals/dialog-confirm/dialog-confirm.component';
import { PasswordComponent } from './components/profile/password/password.component';






@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    VisitorComponent,
    InviteComponent,
    DialogHttpErrorComponent,
    ExhibitionsComponent,
    SpinnerFullscreenComponent,
    DialogInfoComponent,
    NgxBarcodeComponent,
    DashboardComponent,
    TranslatePipe,
    ExhibComponent,
    DialogConfirmComponent,
    PasswordComponent,
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
    MatSelectFilterModule,
    MatCardModule,
    MatAutocompleteModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatMenuModule,
    MatTooltipModule,
    MatChipsModule
  ],
  entryComponents: [DialogHttpErrorComponent, DialogInfoComponent, DialogConfirmComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
