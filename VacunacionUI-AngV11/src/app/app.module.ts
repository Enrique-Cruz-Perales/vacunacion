import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { PersonaComponent } from './persona/persona.component';
import { VacunaInfoComponent } from './vacuna-info/vacuna-info.component';
import { CarnetDeVacunacionComponent } from './carnet-de-vacunacion/carnet-de-vacunacion.component';
import { StaffComponent } from './staff/staff.component';

import { ShowStaffComponent } from './staff/show-staff/show-staff.component';
import { AddEditStaffComponent } from './staff/add-edit-staff/add-edit-staff.component';
import { ShowPersonaComponent } from './persona/show-persona/show-persona.component';
import { AddEditPersonaComponent } from './persona/add-edit-persona/add-edit-persona.component';
import { ShowCarnetDeVacunacionComponent } from './carnet-de-vacunacion/show-carnet-de-vacunacion/show-carnet-de-vacunacion.component';
import { AddEditCarnetDeVacunacionComponent } from './carnet-de-vacunacion/add-edit-carnet-de-vacunacion/add-edit-carnet-de-vacunacion.component';
import { ShowVacunaInfoComponent } from './vacuna-info/show-vacuna-info/show-vacuna-info.component';
import { AddEditVacunaInfoComponent } from './vacuna-info/add-edit-vacuna-info/add-edit-vacuna-info.component';

import { SharedService} from './shared.service';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HomeComponent } from './home/home.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { QrInfoComponent } from './qr-info/qr-info.component';
import { AcuseDeRegistroComponent } from './acuse-de-registro/acuse-de-registro.component';


@NgModule({
  declarations: [
    AppComponent,
    PersonaComponent,
    VacunaInfoComponent,
    CarnetDeVacunacionComponent,
    ShowPersonaComponent,
    AddEditPersonaComponent,
    ShowCarnetDeVacunacionComponent,
    AddEditCarnetDeVacunacionComponent,
    ShowVacunaInfoComponent,
    AddEditVacunaInfoComponent,
    StaffComponent,
    ShowStaffComponent,
    AddEditStaffComponent,
    HomeComponent,
    QrInfoComponent,
    AcuseDeRegistroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxQRCodeModule
  ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
