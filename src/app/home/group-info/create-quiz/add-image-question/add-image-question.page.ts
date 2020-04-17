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
            if(this.aOption == null)
            {
                this.aOption = dataReturned.data;
            }else if(this.bOption == null)
            {
                this.bOption = dataReturned.data;
            }else if(this.cOption == null)
            {
                this.cOption = dataReturned.data
            }else if(this.dOption == null)
            {
                  this.dOption = dataReturned.data;
            }
          } else {
            console.log('option added canceled');
        }
      });
      return await this.openPopOver.present();
    }

  }


  addQuestion()
  {


     const quest_img_model : QuestImageModel =  new QuestImageModel();
     quest_img_model.quest_img_base64_url = this.croppedImage;
     quest_img_model.quest_img_desc = "this is question image";
     quest_img_model.quest_img_id = null;
     quest_img_model.quest_img_path = null;

     let quest_dgrm_model : QuestDgrmModel = new QuestDgrmModel();
     quest_dgrm_model = null;

    let quest_txt_model : QuestTxtModel = new QuestTxtModel();
    quest_txt_model = null;

    let quest_model : QuestModel = new QuestModel();
    quest_model.quest_ans= "ques_optionA";
    this.username = "username";
    quest_model.quest_creator = this.username;
    quest_model.quest_img_model = quest_img_model;
    quest_model.quest_dgrm_model = quest_dgrm_model;
    quest_model.quest_marks = 4;
    quest_model.quest_optionA = this.aOption;
    quest_model.quest_optionB = this.bOption;
    quest_model.quest_optionC = this.cOption;
    quest_model.quest_optionD = this.dOption;
    quest_model.quest_txt_model = quest_txt_model;

      this.modelController.dismiss(
        quest_model
        )
  }
}
