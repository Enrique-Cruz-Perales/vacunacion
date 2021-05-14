import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./pages/about/about.module').then( m => m.AboutPageModule)
  },
  {
    path: 'registro-con-curp',
    loadChildren: () => import('./pages/registro-con-curp/registro-con-curp.module').then( m => m.RegistroConCurpPageModule)
  },
  {
    path: 'registro-sin-curp',
    loadChildren: () => import('./pages/registro-sin-curp/registro-sin-curp.module').then( m => m.RegistroSinCurpPageModule)
  },
  {
    path: 'registro-con-pasaporte',
    loadChildren: () => import('./pages/registro-con-pasaporte/registro-con-pasaporte.module').then( m => m.RegistroConPasaportePageModule)
  },
  {
    path: 'registro-sin-documentos',
    loadChildren: () => import('./pages/registro-sin-documentos/registro-sin-documentos.module').then( m => m.RegistroSinDocumentosPageModule)
  },
  {
    path: 'acuse-de-registro',
    loadChildren: () => import('./pages/acuse-de-registro/acuse-de-registro.module').then( m => m.AcuseDeRegistroPageModule)
  },
  {
    path: 'vacunar',
    loadChildren: () => import('./pages/vacunar/vacunar.module').then( m => m.VacunarPageModule)
  },
  {
    path: 'home2',
    loadChildren: () => import('./pages/home2/home2.module').then( m => m.Home2PageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
