import { Component, OnInit } from '@angular/core';

import { Form, FormBuilder, FormControl, FormGroup, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { VacunacionApiService } from 'src/app/services/vacunacion-api.service'
import { md5 } from 'src/app/shared/md5'
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-vacunar',
  templateUrl: './vacunar.page.html',
  styleUrls: ['./vacunar.page.scss'],
})

export class VacunarPage implements OnInit {

  vacunaForm: FormGroup;
  carnetVacunacionLst : any = [];
  
  carnetVacunacion={
    CarnetVacunacionId:'',
    PersonaId:'',
    VacunaInfoId:'',
    UnidadDeVacunacion:'Estadio Nemesio Diez',
    DosisAplicada:'',
    CodigoPostal:'50200',
    Estado:'México',
    Municipio:'Toluca',
    Colonia:'San Bernardino',
    Latitud:'19.45876',
    Longitud:'-99.31579' 
  }

  vacunaInfo:any;
  personaInfo:any;

  constructor(private formBuilder:FormBuilder, private _router: Router, private apiService: VacunacionApiService, private alertController: AlertController) { 
    this.vacunaForm =  formBuilder.group(
      {
        CarnetVacunacionId:'',
        PersonaId:'',
        VacunaInfoId:'',
        UnidadDeVacunacion:'',
        DosisAplicada:'',
        CodigoPostal:'',
        Estado:'',
        Municipio:'',
        Colonia:'',
        Latitud:'',
        Longitud:''
      }
    );    
  }

  ngOnInit() {
    //REVISAR EL CASO DE LA PERSONA QUE NO SE HA REGSITRADO Y FALSIFICA EL FOLIO
  }

  onSubmit(){
    var now = new Date().toLocaleString();   

    this.apiService.getCarnetDeVacunacionByPersonaId(this.vacunaForm.get("PersonaId").value).subscribe(data => {
      this.carnetVacunacionLst=data;

      //Es la primera dosis
      if(this.carnetVacunacionLst.length==0)
      {
        this.carnetVacunacion.CarnetVacunacionId = md5(now + this.vacunaForm.get("PersonaId").value);
        this.carnetVacunacion.PersonaId = this.vacunaForm.get("PersonaId").value;
        this.carnetVacunacion.VacunaInfoId = "2"; //Aztra Zeneca   
        this.carnetVacunacion.DosisAplicada ="1"

        console.log(this.carnetVacunacion);
        this.saveRegistro();
      }

      if(this.carnetVacunacionLst.length>0 && this.carnetVacunacionLst.length < this.carnetVacunacionLst[0].Dosis)
      {
        this.carnetVacunacion.CarnetVacunacionId = md5(now + this.vacunaForm.get("PersonaId").value);
        this.carnetVacunacion.PersonaId = this.vacunaForm.get("PersonaId").value;
        this.carnetVacunacion.VacunaInfoId = "2";        
        this.carnetVacunacion.DosisAplicada = this.carnetVacunacionLst.length + 1;

        console.log(this.carnetVacunacion);
        this.saveRegistro();        

      }

      if(this.carnetVacunacionLst.length>0 && this.carnetVacunacionLst.length == this.carnetVacunacionLst[0].Dosis)
      {
        this.showOkAlert("Alerta","Informacion no válida", "No puedes aplicarte mas vacunas de las dósis especificadas");
      }               
      
    });
    
  }

  saveRegistro(){
    this.apiService.addCarnetDeVacunacion(this.carnetVacunacion).subscribe(
      (response) =>         
        //this.vacunaForm.reset() 
        this.registroExistoso()            
      ,        
      (error) => 
        //console.log(error)
        this.registroErroneo(error)
    );
  }

  registroExistoso(){
    this.vacunaForm.reset();
    this.showOkAlert("Registro", "Registro satisfactorio.","El registro de su vacuna ha sido guardado con éxito.")
  }

  registroErroneo(error: any){
    console.log(error);
    this.showOkAlert("Error", "Registro fallido.","Porfavor revisa los datos ingresados e intenta de nuevo")
  }

  showOkAlert(header: string, subheader: string,message: string){
    this.alertController.create({
      header:header,
      subHeader:subheader,
      message:message,
      buttons:['Ok']
    }).then(res => {
      res.present();
    });
  }

  async showAsyncOkAlert(header:string, subheader: string,message: string){
    const alert = await this.alertController.create({
      header: header,
      subHeader: subheader,
      message: message,
      buttons: ['OK']
    });
  }


}
