import { Component, OnInit } from '@angular/core';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from 'src/app/shared.service'
import {  jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-acuse-de-registro',
  templateUrl: './acuse-de-registro.component.html',
  styleUrls: ['./acuse-de-registro.component.css']
})
export class AcuseDeRegistroComponent implements OnInit {
  //Variables QR
  curp:any; 
  url: string;
  profile:string;
  elementType: any;
  errorCorrectionLevel: any;
  value: string;

  //Variables Carnet Info
  PersonaInfo: any = [];
  Nombre: string="";
  Vacuna: string="";
  DosisRecibidas: string="0/2"
  Folio: string="";

  //Variables PDF
  qrvalue='embedded qr'
  now = new Date().toLocaleString().split(" ");

  constructor(private route: ActivatedRoute, private service: SharedService) { 
    var params = this.route.snapshot.queryParams.curp;
    var splParams= params.split("|")
    this.curp = splParams[0];
    this.Folio = splParams[1];
    this.url = 'http://localhost:4200/info?curp=';
    this.profile = this.curp;
    this.elementType = NgxQrcodeElementTypes.URL;
    this.errorCorrectionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
    this.value = this.url + this.profile;
    //this.curp = this.route.snapshot.paramMap.get('curp');

  }

  ngOnInit(): void {
    console.log("Querystring value of curp: " + this.curp);
    console.log("Liga de QR: " + this.value); 

    this.getPersonaInfoByCurp(this.curp);
  }

  getPersonaInfoByCurp(curp: string){
    if(curp!=""){
      this.service.getPersonaByCurp(curp).subscribe(data => {
        this.PersonaInfo = data;
        this.Nombre = this.PersonaInfo[0].Nombre + " " + this.PersonaInfo[0].ApellidoPaterno + " " + this.PersonaInfo[0].ApellidoMaterno;
        //this.Vacuna = this.PersonaInfo[0].Marca;
        //this.DosisRecibidas = this.PersonaInfo.length;

        console.log(this.Nombre);
        //console.log(this.Vacuna);
        //console.log(this.DosisRecibidas);

      });
    }        
  };

  getBase64Image(img: any){
    var canvas = document.createElement("canvas");
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx!.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL("image/png");
    return dataURL;
         
  };

  descargaPDF(){   
    const Data = document.getElementById('pdfArea');
    const doc = new jsPDF('p', 'pt','a4');
    const options = {
      background : 'white',
      scale: 3
    }

    html2canvas(Data!, options).then((canvas) => {
      const img = canvas.toDataURL('image/PNG');

      //Agregamos la imagen canvas al PDF
      const bufferX = 15;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth()-2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth)/ imgProps.width;

      doc.addImage(img,'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {
      docResult.save(`${new Date().toISOString()}.pdf`);
    });
  }

 
  enviaCorreo(){
    console.log(this.now);    
    
    return alert("Folio_De_Vacunacion");
  }


}
