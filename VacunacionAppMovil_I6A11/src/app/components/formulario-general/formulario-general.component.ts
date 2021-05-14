import { Component, Input, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { VacunacionApiService } from 'src/app/services/vacunacion-api.service'
import { md5 } from 'src/app/shared/md5'
import { AlertController } from '@ionic/angular';

// import { ComponentsModule } from '../components.module';
// import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-formulario-general',
  templateUrl: './formulario-general.component.html',
  styleUrls: ['./formulario-general.component.scss'],
})
export class FormularioGeneralComponent implements OnInit {
  registroForm: FormGroup;

  //ESTOS SON LOS DATOS QUE MANDAMOS A LA BASE DE DATOS, YA CON DATOS CALCULADOS
  persona ={
    PersonaID:'', //MD5 HASH
    Folio:'',
    Curp:'',
    NoPasaporte:'',
    Nombre:'',
    ApellidoPaterno:'',
    ApellidoMaterno:'',
    FechaDeNacimiento:'',
    Edad:'',
    Sexo:'',
    Nacionalidad:'',
    CodigoPostal:'0',
    Estado:'',
    Municipio:'',
    Colonia:'',
    Calle:'',
    Numero:'0',
    Correo:'',
    Telefono:'',
    HuellaId:'',    //BASE64 HASH
    RostroId:''     //BASE64 HASH
  }

  renapoInfo: any;
  domicilioInfo: any;
  consecutivoInfo: any;
  c: number;
  

  api: string = "https://jsonplaceholder.typicode.com/posts";
  data = [];

  @Input() type: number=0;  

  //ESTOS SON LOS DATOS QUE TOMAMOS DEL FORMULARIO, LOS DEMÁS LOS CALCULAMOS
  constructor(private formBuilder:FormBuilder, private _router: Router, 
              private apiService: VacunacionApiService, private alertController: AlertController) { 

    this.registroForm = this.formBuilder.group({   
      Curp:'',   
      NoPasaporte:'',
      Nombre:'',
      ApellidoPaterno:'',
      ApellidoMaterno:'',
      FechaDeNacimiento:'',
      Sexo:'',
      Nacionalidad:'',
      CodigoPostal:'',
      Estado:'',
      Localidad:'',
      Colonia:'',
      Calle:'',
      Numero:'',
      Correo:'',
      Telefono:''
    });    
  } 

  ngOnInit() {
   
   console.log("ngOnInit formulario tipo: " + this.type);
   
  }

  onSubmit(){

    switch(this.type.toString()){
      case "1":        
        this.postPersonaConCurp();
        break;
      case "2":
          this.personasinCurp();
        break;
      case "3":
          this.extranjeroConPasaporte();
        break;
      case "4":
          this.extranjeroSinDocumentos();
        break;
      default:
        console.log("Tipo de formulario incorrecto");
        break;
    }     

  }
//SET PERSONA INFO
  setPersonalInfo(){
    if(this.registroForm.get("Curp").value!=""){
      let curp = this.registroForm.get("Curp").value;
      this.apiService.getRenapoDummy(curp).subscribe(data=>{
        this.renapoInfo=data;
        
        var now = new Date().toLocaleString();
        
        this.persona.Curp = this.registroForm.get("Curp").value;
        this.persona.Nombre = this.renapoInfo[0].Nombre;
        this.persona.ApellidoPaterno = this.renapoInfo[0].ApellidoPAterno;
        this.persona.ApellidoMaterno = this.renapoInfo[0].ApellidoMaterno;
        this.persona.FechaDeNacimiento= this.renapoInfo[0].FechaDeNacimiento;
        this.persona.Edad = this.getEdad(this.registroForm.get("Curp").value).toString();
        this.persona.Sexo = this.renapoInfo[0].Sexo;
        this.persona.Nacionalidad = "MX";  
        
        this.persona.Folio = md5(this.persona.Nacionalidad+ now + this.persona.Curp)
        this.persona.PersonaID = md5(this.persona.Curp + now);
              
        console.log(this.persona);

        this.showAsyncOkAlert("CURP VÁLIDO.", this.persona.Curp,          
              this.persona.Nombre + " " + 
              this.persona.ApellidoPaterno + " " +
              this.persona.ApellidoMaterno
        );        
      });
    }
    else{
      this.showAsyncOkAlert("Warning!","Datos no válidos.","Debe introducir un CURP válido.");
    }
  }

  setDomicilioInfo(){
    console.log(this.registroForm.get("CodigoPostal").value);
    if(this.registroForm.get("CodigoPostal").value!=""){
      this.apiService.getEdoMunByCodigoPostal(this.registroForm.get("CodigoPostal").value).subscribe(data => {
        this.domicilioInfo=data;

        this.persona.CodigoPostal = this.registroForm.get("CodigoPostal").value;
        this.persona.Estado = this.domicilioInfo[0].Estado;
        this.persona.Municipio = this.domicilioInfo[0].Municipio;  
        console.log(this.persona); 
        
        this.showAsyncOkAlert("CP VÁLIDO.", this.persona.CodigoPostal,          
              ""
        );
      });
    }
    else{
      this.showAsyncOkAlert("Warning!","Datos no válidos.","Debe introducir un codigo postal válido.");
    }
  }

//POST PERSONA INFO
  postPersonaConCurp(){
    var formData: any = new FormData();
    this.persona.Colonia = this.registroForm.get("Colonia").value;
    this.persona.Calle = this.registroForm.get("Calle").value;
    this.persona.Numero = this.registroForm.get("Numero").value; 
    this.persona.Correo = this.registroForm.get("Correo").value;
    this.persona.Telefono = this.registroForm.get("Telefono").value;
    

    console.log("Persona: ");
    console.log(this.persona);

    formData.append("PersonaID", this.persona.PersonaID);
    formData.append("Folio", this.persona.Folio);
    formData.append("Curp", this.persona.Curp);
    formData.append("NoPasaporte",this.persona.NoPasaporte );
    formData.append("Nombre", this.persona.Nombre);
    formData.append("ApellidoPaterno", this.persona.ApellidoPaterno);
    formData.append("ApellidoMaterno", this.persona.ApellidoMaterno);
    formData.append("FechaDeNacimiento", this.persona.FechaDeNacimiento);
    formData.append("Edad", this.persona.Edad);
    formData.append("Sexo", this.persona.Sexo);
    formData.append("Nacionalidad", this.persona.Nacionalidad);
    formData.append("CodigoPostal", this.persona.CodigoPostal);
    formData.append("Estado", this.persona.Estado);
    formData.append("Municipio", this.persona.Municipio);
    formData.append("Colonia", this.persona.Colonia);
    formData.append("Calle", this.persona.Calle);
    formData.append("Numero",this.persona.Numero );
    formData.append("Correo", this.persona.Correo);
    formData.append("Telefono", this.persona.Telefono);
    formData.append("HuellaId", this.persona.HuellaId);
    formData.append("RostroId", this.persona.RostroId);

    var p: any ={};
    formData.forEach(function(value: any, key: any){
      p[key]=value;
    });
    console.log("P Object: ");
    console.log(p);

    this.apiService.addPersona(this.persona).subscribe(
      (response) =>         
        this.crearQR()        
      ,        
      (error) => 
        //console.log(error)
        this.showAsyncOkAlert("Error", "Registro fallido.","Porfavor revisa los datos ingresados e intenta de nuevo")
    );
  }

  personasinCurp(){
    var formData: any = new FormData();
    var now = new Date().toLocaleString();
    this.persona.Folio = md5("MX"+ now + this.persona.Curp)
    this.persona.PersonaID = md5(this.persona.Curp + now);
    this.persona.Curp="";
    this.persona.NoPasaporte=""
    this.persona.Nombre = this.registroForm.get("Nombre").value;
    this.persona.ApellidoPaterno = this.registroForm.get("ApellidoPaterno").value;
    this.persona.ApellidoMaterno = this.registroForm.get("ApellidoMaterno").value;
    //Arreglar el formato a yyyy7mm7dd    
    this.persona.FechaDeNacimiento = "1987/08/26";
    //Calcular la edad en base a la fecha
    this.persona.Edad = '0';
    this.persona.Sexo = this.registroForm.get("Sexo").value;
    this.persona.Nacionalidad = this.registroForm.get("Nacionalidad").value; 
    this.persona.CodigoPostal = this.registroForm.get("CodigoPostal").value;
    this.persona.Estado = this.registroForm.get("Estado").value;
    this.persona.Municipio = this.registroForm.get("Localidad").value;
    this.persona.Colonia = this.registroForm.get("Colonia").value; 
    this.persona.Calle = this.registroForm.get("Calle").value;
    this.persona.Numero = this.registroForm.get("Numero").value;
    this.persona.Correo = this.registroForm.get("Correo").value;
    this.persona.Numero = this.registroForm.get("Numero").value; 
    this.persona.Correo = this.registroForm.get("Correo").value;
    this.persona.Telefono = this.registroForm.get("Telefono").value;
    this.persona.HuellaId = "";
    this.persona.RostroId = "";

    console.log("Persona: ");
    console.log(this.persona);

    formData.append("PersonaID", this.persona.PersonaID);
    formData.append("Folio", this.persona.Folio);
    formData.append("Curp", this.persona.Curp);
    formData.append("NoPasaporte",this.persona.NoPasaporte );
    formData.append("Nombre", this.persona.Nombre);
    formData.append("ApellidoPaterno", this.persona.ApellidoPaterno);
    formData.append("ApellidoMaterno", this.persona.ApellidoMaterno);
    formData.append("FechaDeNacimiento", this.persona.FechaDeNacimiento);
    formData.append("Edad", this.persona.Edad);
    formData.append("Sexo", this.persona.Sexo);
    formData.append("Nacionalidad", this.persona.Nacionalidad);
    formData.append("CodigoPostal", this.persona.CodigoPostal);
    formData.append("Estado", this.persona.Estado);
    formData.append("Municipio", this.persona.Municipio);
    formData.append("Colonia", this.persona.Colonia);
    formData.append("Calle", this.persona.Calle);
    formData.append("Numero",this.persona.Numero );
    formData.append("Correo", this.persona.Correo);
    formData.append("Telefono", this.persona.Telefono);
    formData.append("HuellaId", this.persona.HuellaId);
    formData.append("RostroId", this.persona.RostroId);

    var p: any ={};
    formData.forEach(function(value: any, key: any){
      p[key]=value;
    });
    console.log("P Object: ");
    console.log(p);

    this.apiService.addPersona(this.persona).subscribe(
      (response) =>         
        this.crearQR()        
      ,        
      (error) => 
        //console.log(error)
        this.showAsyncOkAlert("Error", "Registro fallido.","Porfavor revisa los datos ingresados e intenta de nuevo")
    );
  }
  extranjeroConPasaporte(){
    var formData: any = new FormData();
    var now = new Date().toLocaleString();
    this.persona.Folio = md5("DE"+ now + this.persona.Curp)
    this.persona.PersonaID = md5(this.persona.Curp + now);
    this.persona.Curp="";
    this.persona.NoPasaporte= this.registroForm.get("NoPasaporte").value;
    this.persona.Nombre = this.registroForm.get("Nombre").value;
    this.persona.ApellidoPaterno = this.registroForm.get("ApellidoPaterno").value;
    this.persona.ApellidoMaterno = this.registroForm.get("ApellidoMaterno").value;
    //Arreglar el formato a yyyy7mm7dd    
    this.persona.FechaDeNacimiento = "1990/01/01";
    //Calcular la edad en base a la fecha
    this.persona.Edad = '0';
    this.persona.Sexo = this.registroForm.get("Sexo").value;
    this.persona.Nacionalidad = this.registroForm.get("Nacionalidad").value; 
    this.persona.CodigoPostal = "0";//this.registroForm.get("CodigoPostal").value;
    this.persona.Estado = this.registroForm.get("Estado").value;
    this.persona.Municipio = this.registroForm.get("Localidad").value;
    this.persona.Colonia = this.registroForm.get("Colonia").value; 
    this.persona.Calle = this.registroForm.get("Calle").value;
    this.persona.Numero = "0";//this.registroForm.get("Numero").value;
    this.persona.Correo = this.registroForm.get("Correo").value;
    //this.persona.Numero = this.registroForm.get("Numero").value; 
    this.persona.Correo = this.registroForm.get("Correo").value;
    this.persona.Telefono = this.registroForm.get("Telefono").value;
    this.persona.HuellaId = "";
    this.persona.RostroId = "";

    console.log("Persona: ");
    console.log(this.persona);

    formData.append("PersonaID", this.persona.PersonaID);
    formData.append("Folio", this.persona.Folio);
    formData.append("Curp", this.persona.Curp);
    formData.append("NoPasaporte",this.persona.NoPasaporte );
    formData.append("Nombre", this.persona.Nombre);
    formData.append("ApellidoPaterno", this.persona.ApellidoPaterno);
    formData.append("ApellidoMaterno", this.persona.ApellidoMaterno);
    formData.append("FechaDeNacimiento", this.persona.FechaDeNacimiento);
    formData.append("Edad", this.persona.Edad);
    formData.append("Sexo", this.persona.Sexo);
    formData.append("Nacionalidad", this.persona.Nacionalidad);
    formData.append("CodigoPostal", this.persona.CodigoPostal);
    formData.append("Estado", this.persona.Estado);
    formData.append("Municipio", this.persona.Municipio);
    formData.append("Colonia", this.persona.Colonia);
    formData.append("Calle", this.persona.Calle);
    formData.append("Numero",this.persona.Numero );
    formData.append("Correo", this.persona.Correo);
    formData.append("Telefono", this.persona.Telefono);
    formData.append("HuellaId", this.persona.HuellaId);
    formData.append("RostroId", this.persona.RostroId);

    var p: any ={};
    formData.forEach(function(value: any, key: any){
      p[key]=value;
    });
    console.log("P Object: ");
    console.log(p);

    this.apiService.addPersona(this.persona).subscribe(
      (response) =>         
        this.crearQR()        
      ,        
      (error) => 
        //console.log(error)
        this.showAsyncOkAlert("Error", "Registro fallido.","Porfavor revisa los datos ingresados e intenta de nuevo")
    );
  }
  extranjeroSinDocumentos(){
    var formData: any = new FormData();
    var now = new Date().toLocaleString();
    this.persona.Folio = md5("DE"+ now + this.persona.Curp)
    this.persona.PersonaID = md5(this.persona.Curp + now);
    this.persona.Curp="";
    this.persona.NoPasaporte= "";
    this.persona.Nombre = this.registroForm.get("Nombre").value;
    this.persona.ApellidoPaterno = this.registroForm.get("ApellidoPaterno").value;
    this.persona.ApellidoMaterno = this.registroForm.get("ApellidoMaterno").value;
    //Arreglar el formato a yyyy7mm7dd    
    this.persona.FechaDeNacimiento = "1990/01/01";
    //Calcular la edad en base a la fecha
    this.persona.Edad = '0';
    this.persona.Sexo = this.registroForm.get("Sexo").value;
    this.persona.Nacionalidad = this.registroForm.get("Nacionalidad").value; 
    this.persona.CodigoPostal = "0";//this.registroForm.get("CodigoPostal").value;
    this.persona.Estado = this.registroForm.get("Estado").value;
    this.persona.Municipio = this.registroForm.get("Localidad").value;
    this.persona.Colonia = this.registroForm.get("Colonia").value; 
    this.persona.Calle = this.registroForm.get("Calle").value;
    this.persona.Numero = "0";//this.registroForm.get("Numero").value;
    this.persona.Correo = this.registroForm.get("Correo").value;
    //this.persona.Numero = this.registroForm.get("Numero").value; 
    this.persona.Correo = this.registroForm.get("Correo").value;
    this.persona.Telefono = this.registroForm.get("Telefono").value;
    this.persona.HuellaId = "";
    this.persona.RostroId = "";

    console.log("Persona: ");
    console.log(this.persona);

    formData.append("PersonaID", this.persona.PersonaID);
    formData.append("Folio", this.persona.Folio);
    formData.append("Curp", this.persona.Curp);
    formData.append("NoPasaporte",this.persona.NoPasaporte );
    formData.append("Nombre", this.persona.Nombre);
    formData.append("ApellidoPaterno", this.persona.ApellidoPaterno);
    formData.append("ApellidoMaterno", this.persona.ApellidoMaterno);
    formData.append("FechaDeNacimiento", this.persona.FechaDeNacimiento);
    formData.append("Edad", this.persona.Edad);
    formData.append("Sexo", this.persona.Sexo);
    formData.append("Nacionalidad", this.persona.Nacionalidad);
    formData.append("CodigoPostal", this.persona.CodigoPostal);
    formData.append("Estado", this.persona.Estado);
    formData.append("Municipio", this.persona.Municipio);
    formData.append("Colonia", this.persona.Colonia);
    formData.append("Calle", this.persona.Calle);
    formData.append("Numero",this.persona.Numero );
    formData.append("Correo", this.persona.Correo);
    formData.append("Telefono", this.persona.Telefono);
    formData.append("HuellaId", this.persona.HuellaId);
    formData.append("RostroId", this.persona.RostroId);

    var p: any ={};
    formData.forEach(function(value: any, key: any){
      p[key]=value;
    });
    console.log("P Object: ");
    console.log(p);

    this.apiService.addPersona(this.persona).subscribe(
      (response) =>         
        this.crearQR()        
      ,        
      (error) => 
        //console.log(error)
        this.showAsyncOkAlert("Error", "Registro fallido.","Porfavor revisa los datos ingresados e intenta de nuevo")
    );
  }
  
//UTILITIES FUNCTIONS
  getEdad(curpstr: string){
  
    var year=curpstr.substring(4,6);
    var month = curpstr.substring(6,8);
    var day = curpstr.substring(8,10);

    let birth:any = new Date(year+"/"+month+"/"+day);
    let currentYears = new Date(Date.now() - birth).getFullYear() - 1970;
    
    return currentYears;
  }

  crearQR()
  {    
    //console.log(this.persona.Folio)
    this.registroForm.reset();
    switch(this.type.toString()){
      case "1":        
        console.log("Do nothing");
        break;
      case "2":
        this.showAsyncOkAlert("Biometria","Registro de huella dactilar", "Para continuar con tu registro coloca tu huella.")
        break;
      case "3":
        console.log("Do nothing");
        break;
      case "4":
        this.showAsyncOkAlert("Biometria","Registro de huella dactilar", "Para continuar con tu registro coloca tu huella.")
        break;
      default:
        console.log("Tipo de formulario incorrecto");
        break;
    }    
    
    this._router.navigate(['/acuse-de-registro'], {queryParams: {folio:this.persona.PersonaID+"|"+ this.persona.Nombre +" " + this.persona.ApellidoPaterno + " " + this.persona.ApellidoMaterno}})
  }

  showOkAlert(message: string){
    this.alertController.create({
      header:'Warning!',
      subHeader:'Informacion no válida',
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

    await alert.present();
  }

  getBiometricInfo(){
  }

  validaCurp(){
  }

}
