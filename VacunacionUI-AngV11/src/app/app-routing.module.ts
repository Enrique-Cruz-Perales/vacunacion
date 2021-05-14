import { RecursiveTemplateAstVisitor } from '@angular/compiler';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PersonaComponent} from './persona/persona.component';
import { StaffComponent} from './staff/staff.component';
import { VacunaInfoComponent} from './vacuna-info/vacuna-info.component';
import { CarnetDeVacunacionComponent} from './carnet-de-vacunacion/carnet-de-vacunacion.component';
import { HomeComponent } from './home/home.component';
import { QrInfoComponent } from './qr-info/qr-info.component';
import { AcuseDeRegistroComponent } from './acuse-de-registro/acuse-de-registro.component';


const routes: Routes = [

  {path:'registro', component:PersonaComponent},
  {path:'carnet', component:CarnetDeVacunacionComponent},
  {path:'staff', component:StaffComponent},
  {path:'vacuna', component:VacunaInfoComponent},
  {path:'home', component:HomeComponent},
  {path:'info', component:QrInfoComponent},
  {path:'acuse', component:AcuseDeRegistroComponent},
  {path:'', redirectTo:'home', pathMatch:'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

