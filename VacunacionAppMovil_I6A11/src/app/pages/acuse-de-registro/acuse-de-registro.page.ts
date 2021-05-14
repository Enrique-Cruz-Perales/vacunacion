import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VacunacionApiService } from 'src/app/services/vacunacion-api.service';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';



@Component({
  selector: 'app-acuse-de-registro',
  templateUrl: './acuse-de-registro.page.html',
  styleUrls: ['./acuse-de-registro.page.scss'],
})
export class AcuseDeRegistroPage implements OnInit {

  carnetVacunacionInfo = {
    Nombre:'',
    CarnetVacunacionId:'',
    PersonaId: '',
    VacunaInfoId:'',
    UnidadDeVacunacion:'Estadio Nemezio Diez',
    FechaDeVacunacion:'',
    DosisAplicada:'',
    CodigoPostal:'50000',
    Estado:'México',
    Municipio:'Toluca',
    Colonia:'',
    Latitud:'19.292545',
    Longitud:'-99.6569007',
    Marca:'',
    Dosis:''
  }

  vacunaInfo = {
    VacunaInfoId:'',
    Marca:'',
    Dosis:''
  }

  now = new Date().toLocaleString();


  //Variables QR
  PersonaId:string;
  url: string;
  profile:string;
  elementType: any;
  errorCorrectionLevel: any;
  value: string;

  //Variables Carnet Info
  carnetVacunacionInfoLst: any = [];
  Nombre: string="";
  Vacuna: string="";
  DosisRecibidas: string="/2"

  //Variables PDF
  qrvalue='embedded qr'

  noRegistros: any;
  pData:any;


  constructor(private route: ActivatedRoute, private apiService: VacunacionApiService) { 
    this.PersonaId = this.route.snapshot.queryParams.folio;
    this.pData = this.PersonaId.split('|');
    console.log(this.PersonaId);

    //LOCAL
    //this.url = 'http://localhost:8100/acuse-de-registro?folio='; 
    //DESARROLLO
    //this.url = 'http://189.195.136.238/vacunacion/info?folio=';
    //PRODUCCION
    this.url = 'http://189.203.240.97/vacunacion/info?folio=';

    this.profile = this.pData[0];
    this.elementType = NgxQrcodeElementTypes.URL;
    this.errorCorrectionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
    this.value = this.url + this.pData[0];    
  }

  ngOnInit() {
    console.log(this.pData[0]);
    this.getCarnetVacunacionInfo(this.pData[0]);
  }

  getCarnetVacunacionInfo(PersonaId: string){

    if(PersonaId!=""){
      this.apiService.getCarnetDeVacunacionByPersonaId(PersonaId).subscribe(data => {
        this.carnetVacunacionInfoLst = data;        
        this.noRegistros = this.carnetVacunacionInfoLst.length;
        console.log("Numero de registro: " + this.noRegistros);

        if(this.carnetVacunacionInfoLst.length >0)
        {
          this.Nombre = this.carnetVacunacionInfoLst[0].Nombre + " "
        }
          
        // this.Nombre = this.carnetVacunacionInfoLst[0].Nombre + " " + this.carnetVacunacionInfoLst[0].ApellidoPaterno + " " + this.carnetVacunacionInfoLst[0].ApellidoMaterno;
        // this.Vacuna = this.carnetVacunacionInfoLst[0].Marca;
        // this.DosisRecibidas = this.carnetVacunacionInfoLst.length;

        // console.log(this.Nombre);
        // console.log(this.Vacuna);
        // console.log(this.DosisRecibidas);

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
      scale: 4
    }

    html2canvas(Data!, options).then((canvas) => {
      const img = canvas.toDataURL('image/PNG');

      //Agregamos la imagen canvas al PDF
      const bufferX = 100; //pading
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      // const pdfWidth = doc.internal.pageSize.getWidth()-2 * bufferX;
      // const pdfHeight = (imgProps.height * pdfWidth)/ imgProps.width;
      const pdfWidth = doc.internal.pageSize.getWidth() - 200;
      const pdfHeight = doc.internal.pageSize.getHeight() - 200;


      doc.addImage(img,'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {
      docResult.save(`${new Date().toISOString()}.pdf`);
    });
  }
}
