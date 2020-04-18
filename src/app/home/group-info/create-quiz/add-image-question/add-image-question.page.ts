import { Component, OnInit, ViewChild } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ModalController } from '@ionic/angular';
import { ImageCroppedEvent, ImageCropperComponent  } from 'ngx-image-cropper';
import { PopoverController } from '@ionic/angular';

import { Observable } from 'rxjs';
import { AddOptionsPage } from './add-options/add-options.page';
import { QuestImageModel } from '../models/QuestImageModel';
import { QuestDgrmModel } from '../models/QuestDgrmModel';
import { QuestTxtModel } from '../models/QuestTxtModel';
import { QuestModel } from '../models/QuestModel';
import { OptionModel } from './add-options/OptionModel';
import { asLiteral } from '@angular/compiler/src/render3/view/util';
@Component({
  selector: 'app-add-image-question',
  templateUrl: './add-image-question.page.html',
  styleUrls: ['./add-image-question.page.scss'],
})
export class AddImageQuestionPage implements OnInit {
  @ViewChild(ImageCropperComponent,{static:true}) angularCropper : ImageCropperComponent;
  capturedSnapURL:string;
  username : string;
  grp_name : string;
  isImageAvailable : boolean = false;
  croppedImage = null;
  croppedSuccess : boolean = false;
  aOption : any;
  bOption: any;
  cOption : any;
  dOption : any;
  something : any;
  correctOption : any;
  isEdit : boolean = false;
  obj : OptionModel 
  cameraOptions: CameraOptions = {
    quality: 20,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    correctOrientation : true,
  }


  openPopOver : any;
  constructor(private camera: Camera,
    private modelController : ModalController ,
    private popoverController : PopoverController)
    {

   }

  ngOnInit() {
  }
  

  getFromCamera() {

    this.isImageAvailable = true; 
    this.capturedSnapURL = null;
    this.camera.getPicture(this.cameraOptions).then((imageData) => {
      
      
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.capturedSnapURL = base64Image;
    }, (err) => {
      
      console.log(err);
      // Handle error
    });
  }

  getFromGallary()
  {
      this.capturedSnapURL = null;
      console.log('get from gallary')
      const options : CameraOptions = {
          quality : 70,
          destinationType : this.camera.DestinationType.DATA_URL,
          sourceType:this.camera.PictureSourceType.PHOTOLIBRARY,
          saveToPhotoAlbum : false,
          correctOrientation : true,

      }

      this.camera.getPicture(options).then((imageData)=>{
          this.capturedSnapURL = 'data:image/jpeg;base64,' + imageData;
      },(err)=>{
          console.log('err while getting image from gallary')
      })


  }

  imageCropped(event : ImageCroppedEvent)
  {
    console.log('crop iamge');
    this.croppedImage = event.base64;


  }
  

  getImageToCropped()
  {
    console.log('rotate image')
    this.reset();
    this.convertBase64();

  }

  cancelAddQues()
  {
      this.modelController.dismiss(false);
  }

  convertBase64()
  {
      this.convertHelper(`assets/imgs/Capture.PNG`).subscribe((base64)=>{
          this.capturedSnapURL = base64;
      })
  }
  
  convertHelper(url : string)
  {
      return Observable.create(observer=>{
          let xhr : XMLHttpRequest = new XMLHttpRequest();
          xhr.onload = function(){
              let reader : FileReader = new FileReader();
              reader.onloadend = function(){
                  observer.next(reader.result);
                  observer.complete();
              };
              reader.readAsDataURL(xhr.response);
          };
          xhr.open('GET',url);
          xhr.responseType = 'blob';
          xhr.send();
      });
  }

  reset() {
    this.croppedSuccess = false;
    this.angularCropper.imageBase64 = null;
    this.capturedSnapURL = null;
    this.croppedImage = null;
  }
 
  clear() {
    this.angularCropper.crop();
  }
 

 
  zoom(zoomIn: boolean) {
    let factor = zoomIn ? 0.1 : -0.1;
    this.angularCropper.onResize();
  }
 

  save() {
      this.croppedSuccess  = true;
      this.isImageAvailable = false;
      this.capturedSnapURL = null;
  }

 async addOptions(ev)
  {

    if(this.aOption && this.bOption && this.cOption && this.dOption)
    {
        console.log('can not add more than 4 optiono');
    }else{
      this.openPopOver = await this.popoverController.create({
        component: AddOptionsPage,
        event: ev,
        animated:true,
        showBackdrop: true,
      });
      this.openPopOver.onDidDismiss().then(dataReturned => {
        if (dataReturned.data != null) {
            console.log('options added',dataReturned.data)
            this.obj = new OptionModel();
            this.obj = dataReturned.data;
            this.aOption = this.obj.aOption;
            this.bOption = this.obj.bOption;
            this.cOption = this.obj.cOption;
            this.dOption = this.obj.dOption;
            this.correctOption = this.obj.correctOption;
            this.isEdit =true;
            
          } else {
            console.log('option added canceled');
        }
      });
      return await this.openPopOver.present();
    }

  }


  addQuestion()
  {


     const user_quest_img_model : QuestImageModel =  new QuestImageModel();
     user_quest_img_model.user_quest_img_base64_url = this.croppedImage;
     user_quest_img_model.user_quest_img_desc = "this is question image";
     user_quest_img_model.user_quest_img_id = null;
     user_quest_img_model.user_quest_img_path = null;
     user_quest_img_model.user_quest_img_isDgrm = false;
     user_quest_img_model.user_quest_img_isQuest = true;

     let user_questdgrm_model : QuestImageModel = new QuestImageModel();
     user_questdgrm_model.user_quest_img_isDgrm = null;

    let user_questtxt_model : QuestTxtModel = new QuestTxtModel();
    user_questtxt_model = null;

    let user_questmodel : QuestModel = new QuestModel();
    this.username = "username";
    user_questmodel.user_questcreator = this.username;
    user_questmodel.user_quest_img_model = user_quest_img_model;
    user_questmodel.user_questdgrm_model = user_questdgrm_model;
    user_questmodel.user_questmarks = 4;
    user_questmodel.user_questoptionA = this.aOption;
    user_questmodel.user_questoptionB = this.bOption;
    user_questmodel.user_questoptionC = this.cOption;
    user_questmodel.user_questoptionD = this.dOption;
    user_questmodel.user_questans= this.correctOption;

    user_questmodel.user_questtxt_model = user_questtxt_model;

      this.modelController.dismiss(
        user_questmodel
        )
  }

  async EdiOptions(ev){

      this.openPopOver = await this.popoverController.create({
        component: AddOptionsPage,
        event: ev,
        animated:true,
        showBackdrop: true,
        componentProps: { 
         "obj": this.obj,
        }
      });
      this.openPopOver.onDidDismiss().then(dataReturned => {
        if (dataReturned.data != null) {
            console.log('options added',dataReturned.data)
              this.obj = new OptionModel();
              this.obj  = dataReturned.data;
            this.aOption =  this.obj .aOption;
            this.bOption =  this.obj .bOption;
            this.cOption =  this.obj .cOption;
            this.dOption =  this.obj .dOption;
            this.correctOption =  this.obj .correctOption;
            
          } else {
            console.log('option added canceled');
        }
      });
      return await this.openPopOver.present();
    }
  
}
