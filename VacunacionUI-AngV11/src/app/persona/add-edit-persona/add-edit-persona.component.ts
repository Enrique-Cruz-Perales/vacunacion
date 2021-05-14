import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NumberValueAccessor} from '@angular/forms';
import { SharedService } from 'src/app/shared.service'
import { AppComponent } from '../../app.component';
import { NotificationService } from 'src/app/notification.service'
import { ThisReceiver } from '@angular/compiler';
import { NumberFormatStyle } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-edit-persona',
  templateUrl: './add-edit-persona.component.html',
  styleUrls: ['./add-edit-persona.component.css'],
  providers: [SharedService]
})
export class AddEditPersonaComponent implements OnInit {
  public form: FormGroup;
  RenapoInfo : any ;
  CodigoPostalInfo : any;
  Folio: string="";
  

  constructor(private service: SharedService, private formBuilder: FormBuilder, private notifyService: NotificationService, private _router: Router) { 
    this.form= this.formBuilder.group({
      CURP:'',
      Nombre:'',
      ApellidoPaterno:'',
      ApellidoMaterno:'',
      CorreoElectronico:'',
      Edad:'',
      Calle:'',
      Colonia:'',
      Municipio:'',
      Estado:'',
      CodigoPostal:'',
      Folio:''
    });

  }

  Nombre:string="";
  ApellidoPaterno:string="";
  ApellidoMaterno:string="";
  Edad:number = 0;
  //Colonia:string="";
  Municipio:string="";
  Estado:string="";

  ngOnInit(): void {
    
  }

  buscarCodigoPostal(val:any)
  {
    if(val!=""){
      this.service.getEdoMunByCodigoPostal(val).subscribe(data => {
        this.CodigoPostalInfo=data;

        this.Estado = this.CodigoPostalInfo[0].Estado;
        this.Municipio = this.CodigoPostalInfo[0].Municipio;
      });
    }
  }

  buscarPersona(val: any){
    if(val!=""){
      this.service.getRenapoDummy(val).subscribe(data=>{
        this.RenapoInfo=data;
        //console.log("Renapo Info: " + this.RenapoInfo[0].Nombre);
        this.Nombre = this.RenapoInfo[0].Nombre;
        this.ApellidoPaterno = this.RenapoInfo[0].ApellidoPAterno;
        this.ApellidoMaterno = this.RenapoInfo[0].ApellidoMaterno;
        this.Edad = this.getEdad(this.RenapoInfo[0].CURP);
        
      });
    }    
  }

  getEdad(curpstr: any){
  
    var year=curpstr.substring(4,6);
    var month = curpstr.substring(6,8);
    var day = curpstr.substring(8,10);

    let birth:any = new Date(year+"/"+month+"/"+day);
    let currentYears = new Date(Date.now() - birth).getFullYear() - 1970;
    
    return currentYears;
  }


  submitForm(){
    console.log(this.form.value);
    var formData: any = new FormData();

    formData.append("CURP", this.form.get("CURP")!.value)
    formData.append("Nombre", this.Nombre);
    formData.append("ApellidoPaterno", this.ApellidoPaterno);
    formData.append("ApellidoMaterno", this.ApellidoMaterno);
    formData.append("CorreoElectronico", this.form.get('CorreoElectronico')!.value);
    formData.append("Edad", this.Edad);
    formData.append("Calle", this.form.get('Calle')!.value);
    formData.append("Colonia", this.form.get('Colonia')!.value);
    formData.append("Municipio", this.Municipio);
    formData.append("Estado", this.Estado);
    formData.append("CodigoPostal", this.form.get('CodigoPostal')!.value);  
    formData.append("Folio",this.getFolio());
        

    //Convertimos el formData a Json para enviar a la api
    var object: any ={};
    formData.forEach(function(value: any, key: any){
      object[key]=value;
    });

    //Enviamos a la Api
    this.service.addPersona(object).subscribe(
      (response) => 
        //this.notifyService.showSuccess("Registro Exitoso. Redirigiendo...","Registro Exitoso")   
        this.crearQR()        
      ,        
      (error) => console.log(error)
    );
  }

  getFolio(){
    let now = new Date().toLocaleString().split(" ");
    let d = now[0].split('/')
    console.log (now);
    console.log(d[0]+d[1]+d[2]);
    return this.Folio = ( "EM" + d[0] + d[1] + d[2] + this.form.get("CURP")!.value);
  }

  crearQR()
  {
    
    let curpValue = this.form.get('CURP')!.value;
    console.log(curpValue)
    this.form.reset();
    this._router.navigate(['/acuse'], {queryParams: {curp:curpValue + "|" + this.Folio}})
  }

}
