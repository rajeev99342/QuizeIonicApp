import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.page.html',
  styleUrls: ['./image-modal.page.scss'],
})
export class ImageModalPage implements OnInit {
  img : any;

  // @ViewChild('slider', { read : ElementRef })slider: ElementRef;

  @ViewChild('slider',{read:ElementRef,static: false})slider : ElementRef;

  sliderOpts = {
    zoom:{
      maxRatio : 3,
      
    },
    pager:true,
    passiveListeners: false,
  };
  constructor(
    private modalController : ModalController,
    private navParams:NavParams) {

   }

  ngOnInit() {

    this.img = this.navParams.get('img');
  }

  zoom(zoomIn : boolean)
  {

    let zoom = this.slider.nativeElement.zoom;
    if(zoomIn)
    {
      this.slider.nativeElement.options.zoom.maxRatio++;
    }else{
      this.slider.nativeElement.options.zoom.maxRatio--;
      
    }
  }
  close(){
    this.modalController.dismiss();
  }
}
