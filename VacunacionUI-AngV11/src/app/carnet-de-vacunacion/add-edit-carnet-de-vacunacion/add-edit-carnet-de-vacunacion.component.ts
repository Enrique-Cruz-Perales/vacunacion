import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NumberValueAccessor } from '@angular/forms';
import { SharedService } from 'src/app/shared.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-edit-carnet-de-vacunacion',
  templateUrl: './add-edit-carnet-de-vacunacion.component.html',
  styleUrls: ['./add-edit-carnet-de-vacunacion.component.css']
})
export class AddEditCarnetDeVacunacionComponent implements OnInit {
  public form: FormGroup;

  PersonaInfo: any = [];
  CarnetInfo: any = [];

  Folio: string="";
  PersonaId: string ="";
  
  Curp: string="";
  Dosis: number=0;

  constructor(private service: SharedService, private formBuilder: FormBuilder, private _router: Router) { 
    this.form= this.formBuilder.group({
      CURP:'',
      Vacuna:''
    });
  }

  ngOnInit(): void {
  }
  
  submitForm(){
    //console.log(this.form.value);
    var formData: any = new FormData();

    this.getPersonaInfoByCurp(this.form.get('CURP')!.value);
    //this.getNumeroDeVacunas(this.form.get('CURP')!.value);

    console.log("POST");

    formData.append("Folio", this.Folio!);
    formData.append("PersonaId", this.PersonaId!);
    formData.append("VacunaInfoId", "1");
    formData.append("FechaVacunacion","" );
    formData.append("Estado","Estado de Mexico");
    formData.append("Municipio","Toluca");
    formData.append("Colonia",'Sor Juana Ines de la Cruz');
    formData.append("UnidadDeVacunacion",'Estadio Nemezio DIez');
    formData.append("CodigoPostal",'50000');
    formData.append("Latitud",'1245.3657');
    formData.append("Longitud",'4578.3245'); 
    formData.append("DosisAplicada","1");  
        
    //COnvertimos el formData a Json para enviar a la api
    var object: any ={};
    formData.forEach(function(value: any, key: any){
      object[key]=value;
    });

    //Enviamos a la Api
    this.service.addCarnetDeVacunacion(object).subscribe(
      (response) => 
        //this.notifyService.showSuccess("Registro Exitoso. Redirigiendo...","Registro Exitoso")
        this.form.reset()
      ,        
      (error) => console.log(error)
    );
  }


  getPersonaInfoByCurp(value: any){
    console.log("personaInfo");
    this.service.getPersonaByCurp(value).subscribe(data=>{
      this.PersonaInfo=data;
      //console.log("Renapo Info: " + this.RenapoInfo[0].Nombre);
      this.PersonaId = this.PersonaInfo[0].PersonaID;
      this.Folio = this.PersonaInfo[0].Folio;
      this.Curp = this.PersonaInfo[0].Curp;
            
    });   

  }

  getNumeroDeVacunas(value: any){
    console.log("numero Vacunas")
      console.log(value);
      this.service.getCarnetDeVacunacionByCurp(value).subscribe(data => {
        this.CarnetInfo = data;
        this.Dosis = this.CarnetInfo.length + 1;    
        console.log("CarnetInfo: " + this.CarnetInfo.length);    
        console.log("Dosis: " + this.Dosis);
      });
  }

}
