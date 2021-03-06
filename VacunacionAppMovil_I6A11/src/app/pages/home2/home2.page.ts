import { Component, ElementRef, InjectionToken, OnInit, ViewChild } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import jsQR from 'jsqr';


import { AnonymousSubject } from 'rxjs/internal/Subject';
import { stringify } from '@angular/compiler/src/util';


@Component({
  selector: 'app-home2',
  templateUrl: './home2.page.html',
  styleUrls: ['./home2.page.scss'],
})
export class Home2Page implements OnInit {

  scanActive=true;
  scanResult=null;
  @ViewChild('video', {static: false}) video:ElementRef;
  @ViewChild('canvas', {static: false}) canvas:ElementRef;


  videoElement: any;
  canvasElement: any;
  canvasContext: any;

  loading: HTMLIonLoadingElement;


  constructor(private toastController:ToastController, private loadingController: LoadingController) { }

  ngOnInit() {
  }

  ngAfterViewInit(){
    this.videoElement = this.video.nativeElement;
    this.canvasElement = this.canvas.nativeElement;
    this.canvasContext = this.canvasElement.getContext("2d");
  }

  async startScan(){
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {facingMode: 'user'}
    });
    this.videoElement.srcObject = stream;
    this.videoElement.setAttribute('playinline', true);
    this.videoElement.play();  
    
    
    this.loading = await this.loadingController.create({});
    await this.loading.present();
    requestAnimationFrame(this.scan.bind(this));
  }


  async scan(){
    console.log('SCAN');

    if(this.videoElement.readyState === this.videoElement.HAVE_ENOUGH_DATA)
    {
      if(this.loading)
      {
        await this.loading.dismiss();
        this.loading = null;
        this.scanActive = true
      }   
      
      this.canvasElement.height = this.videoElement.videoHeight;
      this.canvasElement.width = this.videoElement.videoWidth;

      this.canvasContext.drawImage(
        this.videoElement,
        0,
        0,
        this.canvasElement.width,
        this.canvasElement.height
      );

      const imageData = this.canvasContext.getImageData(        
        0,
        0,
        this.canvasElement.width,
        this.canvasElement.height
      );

      const code = jsQR(imageData.data, imageData.width, imageData.height,{
        inversionAttempts : 'dontInvert'
      });

      console.log('code: ', code);


      if(code){

      }
      else{
        if(this.scanActive){
          requestAnimationFrame(this.scan.bind(this));
        }
        
      }

    }
    else
    {
      requestAnimationFrame(this.scan.bind(this));
    }

  }

  reset(){
    this.scanResult = null;
  }

  async showQRToast(){
    const toast= await  this.toastController.create({
      message: "Open ${this.scanResult}?",
      position: 'top',
      buttons:[
        {
          text:"Open",
          handler:() => {
            window.open(this.scanResult, "_system", "location=yes")
          }
        }
      ] 
    });
    toast.present();
  }

  //Helper Functions
  stopScan(){
    this.scanActive = false;
  }

}
