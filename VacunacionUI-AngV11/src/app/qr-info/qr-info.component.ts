import { Component, OnInit } from '@angular/core';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from 'src/app/shared.service'
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
//import { transporter } from 'src/email-service/email-service'


@Component({
  selector: 'app-qr-info',
  templateUrl: './qr-info.component.html',
  styleUrls: ['./qr-info.component.css']
})
export class QrInfoComponent implements OnInit {

  //Variables QR
  curp:any; 
  url: string;
  profile:string;
  elementType: any;
  errorCorrectionLevel: any;
  value: string;

  folio:any;

  //Variables Carnet Info
  carnetVacunacionInfoLst: any = [];
  Nombre: string="";
  Vacuna: string="";
  DosisRecibidas: string= "";

  //Variables PDF
  qrvalue='embedded qr'

    
  constructor(private route: ActivatedRoute, private service: SharedService) {
    this.folio = this.route.snapshot.queryParams.folio;
    //this.url = 'http://localhost:4200/info?folio=';
    this.url = 'http://189.203.240.97/vacunacion/info?folio=';
    this.profile = this.folio;
    this.elementType = NgxQrcodeElementTypes.URL;
    this.errorCorrectionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
    this.value = this.url + this.profile;
    //this.curp = this.route.snapshot.paramMap.get('curp');
  }

  ngOnInit(): void {
      
    console.log("Querystring value of personaID: " + this.folio);
    console.log("Liga de QR: " + this.value); 

    this.getCarnetVacunacionInfo(this.folio);
  }

  getCarnetVacunacionInfo(folio: string){
    if(folio!=""){
      this.service.getCarnetDeVacunacionByPersonaId(folio).subscribe(data => {
        this.carnetVacunacionInfoLst = data;
        this.Nombre = this.carnetVacunacionInfoLst[0].Nombre;
        this.Vacuna = this.carnetVacunacionInfoLst[0].Marca;
        this.DosisRecibidas = this.carnetVacunacionInfoLst.length.toString() + "/2";

        console.log(this.Nombre);
        console.log(this.Vacuna);
        console.log(this.DosisRecibidas);

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
    // const qrcode = document.getElementById('qrcode');
    // let doc = new jsPDF();

    // let imageData= this.getBase64Image(qrcode!.firstChild!.firstChild);
    // doc.text(this.Nombre,10,10)
    // doc.addImage(imageData, "JPG", 50, 50, 50, 50);

    // doc.save('FirstPdf.pdf');

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
      //const pdfWidth = doc.internal.pageSize.getWidth()-2 * bufferX;
      //const pdfHeight = (imgProps.height * pdfWidth)/ imgProps.width;
      const pdfWidth = doc.internal.pageSize.getWidth() - 200;
      const pdfHeight = doc.internal.pageSize.getHeight() - 200;

      doc.addImage(img,'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {
      docResult.save(`${new Date().toISOString()}.pdf`);
    });
  }

  enviarCorreo(){

  }
  

  


}
