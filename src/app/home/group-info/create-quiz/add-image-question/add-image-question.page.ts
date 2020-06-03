import { Component, OnInit, ViewChild } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ModalController, NavParams } from '@ionic/angular';
import { ImageCroppedEvent, ImageCropperComponent } from 'ngx-image-cropper';
import { PopoverController } from '@ionic/angular';

import { Observable } from 'rxjs';
import { AddOptionsPage } from './add-options/add-options.page';
import { ImageInfoModel } from '../models/ImageInfoModel';
import { UserQuestionModel } from '../models/QuestModel';
import { OptionModel } from './add-options/OptionModel';
import { TxtQuesInfoModel } from '../models/TxtQuesInfoModel';
import * as Tesseract from 'tesseract.js'

@Component({
  selector: 'app-add-image-question',
  templateUrl: './add-image-question.page.html',
  styleUrls: ['./add-image-question.page.scss'],
})
export class AddImageQuestionPage implements OnInit {
  @ViewChild(ImageCropperComponent, { static: true }) angularCropper: ImageCropperComponent;


  readyToUploadDiagram : boolean = false;
  isCorrectQuestion : boolean = false;
  isCorrectDiagramQUestion : boolean = false;
  isQuestionTypeChoosen : boolean = false;
  choosenQuestType : number;
  uploadingDiagram : boolean = false;
  uploadedAllDiagram : boolean = false;
  percentage = 1;
  start = 1;
  end = 100;
  selectedImage: string;
  imageText: string;
  capturedSnapURL: string;
  capturedDiagramSnapURL : string;
  username: string;
  grp_name: string;
  isImageAvailable: boolean = false;
  croppedImage = null;
  croppedSuccess: boolean = false;
  aOption: any;
  bOption: any;
  cOption: any;
  dOption: any;
  something: any;
  correctOption: any;
  isEdit: boolean = false;
  isOptionsAdded: boolean = false;
  optionModel: OptionModel
  isImageTextCorrect : boolean = false;
  isImageProcessing : boolean = false;

  cameraOptions: CameraOptions = {
    quality: 50,
    targetWidth: 800,
    targetHeight: 600,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    correctOrientation: true,
  }

  questObject: UserQuestionModel;
  openPopOver: any;
  constructor(
    private navParams: NavParams,
    private camera: Camera,
    private modelController: ModalController,
    private popoverController: PopoverController) {

  }

  ngOnInit() {
    this.questObject = this.navParams.get('questObject');
    if (this.questObject) {
      this.optionModel = new OptionModel();
      this.croppedImage = this.questObject.imgInfoTbls[0].img_base64;
      this.aOption = this.questObject.user_quest_optionA;
      this.bOption = this.questObject.user_quest_optionB;
      this.cOption = this.questObject.user_quest_optionC;
      this.dOption = this.questObject.user_quest_optionD;
      this.correctOption = this.questObject.user_quest_ans;
      this.capturedSnapURL = this.questObject.imgInfoTbls[0].img_base64;
      this.croppedSuccess = true;
      this.isEdit = true;
      this.isOptionsAdded = true;
      this.isImageAvailable = true;
      this.optionModel.aOption = this.aOption;
      this.optionModel.bOption = this.bOption;
      this.optionModel.cOption = this.cOption;
      this.optionModel.dOption = this.dOption;
      this.optionModel.correctOption = this.correctOption;

    }
  }


  getFromCamera() {

    if(this.isQuestionTypeChoosen)
    {
      const options: CameraOptions = {
        quality: 100,
  
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        correctOrientation: true,
        saveToPhotoAlbum: false,
  
      }
      this.isImageAvailable = true;
      this.capturedSnapURL = null;
      this.camera.getPicture(options).then((imageData) => {
      
  
        let base64Image = 'data:image/jpeg;base64,' + imageData;

        if(this.readyToUploadDiagram)
        {
          this.capturedDiagramSnapURL = base64Image;

        }else{
          this.capturedSnapURL = base64Image;

        }

        this.selectedImage = base64Image;
  
      }, (err) => {
  
        console.log(err);
        // Handle error
      });
    }else{

    }

  }

  getFromGallary()
  {
    this.getImageToCropped();
    this.croppedImage = this.capturedSnapURL;
  }

  // getFromGallary() {
  //     if(this.isQuestionTypeChoosen)
  //     {
  //       this.capturedSnapURL = null;
  //       console.log('get from gallary')
  //       const options: CameraOptions = {
  //         quality: 100,
    
  //         destinationType: this.camera.DestinationType.DATA_URL,
  //         sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
  //         saveToPhotoAlbum: false,
  //         correctOrientation: true,
    
  //       }
    
  //       this.camera.getPicture(options).then((imageData) => {
  //        let base64Image = 'data:image/jpeg;base64,' + imageData;
  //         if(this.readyToUploadDiagram)
  //         {
  //           this.capturedDiagramSnapURL = base64Image;
  
  //         }else{
  //           this.capturedSnapURL = base64Image;
  
  //         }
  
  //       }, (err) => {
  //         console.log('err while getting image from gallary')
  //       })
  //     }else{

  //     }
  // }

  imageCropped(event: ImageCroppedEvent) {
    console.log('crop iamge');
    this.croppedImage = event.base64;


  }


  getImageToCropped() {
    console.log('rotate image')
    this.reset();
    this.convertBase64();

  }

  cancelAddQues() {
    this.modelController.dismiss(false);
  }

  convertBase64() {
    this.convertHelper(`assets/imgs/Capture.PNG`).subscribe((base64) => {
      let base64Image = base64;
      if(this.readyToUploadDiagram)
      {
        this.capturedDiagramSnapURL = base64Image;

      }else{
        this.capturedSnapURL = base64Image;

      }
    })
  }

  convertHelper(url: string) {
    return Observable.create(observer => {
      let xhr: XMLHttpRequest = new XMLHttpRequest();
      xhr.onload = function () {
        let reader: FileReader = new FileReader();
        reader.onloadend = function () {
          observer.next(reader.result);
          observer.complete();
        };
        reader.readAsDataURL(xhr.response);
      };
      xhr.open('GET', url);
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
    this.croppedSuccess = true;
    this.isImageAvailable = false;
    this.capturedSnapURL = null;
  }

  async addOptions(ev) {

    if (this.aOption && this.bOption && this.cOption && this.dOption) {
      console.log('can not add more than 4 optiono');
    } else {
      this.openPopOver = await this.popoverController.create({
        component: AddOptionsPage,
        event: ev,
        animated: true,
        showBackdrop: true,
      });
      this.openPopOver.onDidDismiss().then(dataReturned => {
        if (dataReturned.data != null) {
          console.log('options added', dataReturned.data)
          this.optionModel = new OptionModel();
          this.optionModel = dataReturned.data;
          this.aOption = this.optionModel.aOption;
          this.bOption = this.optionModel.bOption;
          this.cOption = this.optionModel.cOption;
          this.dOption = this.optionModel.dOption;
          this.correctOption = this.optionModel.correctOption;
          // this.isEdit =true;
          this.isOptionsAdded = true;

        } else {
          console.log('option added canceled');
        }
      });
      return await this.openPopOver.present();
    }

  }


  addQuestion() {


    if(this.isQuestionTypeChoosen)
    {

      const user_quest_img_model: ImageInfoModel = new ImageInfoModel();
      user_quest_img_model.img_base64 = this.croppedImage;
      user_quest_img_model.img_desc = "this is question image";
      user_quest_img_model.img_path = null;
      user_quest_img_model.toBeDeleted = false;
  
  
      let user_questdgrm_model: ImageInfoModel = new ImageInfoModel();
  
      let user_questtxt_model: TxtQuesInfoModel = new TxtQuesInfoModel();
      user_questtxt_model = null;
  
      let user_quest_model: UserQuestionModel = new UserQuestionModel();
      this.username = "username";
      let imgInfoTbl: ImageInfoModel = new ImageInfoModel();
  
      let imgs: ImageInfoModel[] = [];
      imgs.push(user_quest_img_model);
      user_quest_model.imgInfoTbls = imgs;
      user_quest_model.user_quest_marks = 4;
      user_quest_model.user_quest_optionA = this.aOption;
      user_quest_model.user_quest_optionB = this.bOption;
      user_quest_model.user_quest_optionC = this.cOption;
      user_quest_model.user_quest_optionD = this.dOption;
      user_quest_model.user_quest_ans = this.correctOption;
      user_quest_model.isEdit = this.isEdit;
      user_quest_model.txtQuesInfoModel = user_questtxt_model;
  
      this.modelController.dismiss(
        user_quest_model
      )
    }else{

    }

  }

  // async EdiOptions(ev){

  //     this.openPopOver = await this.popoverController.create({
  //       component: AddOptionsPage,
  //       event: ev,
  //       animated:true,
  //       showBackdrop: true,
  //       componentProps: { 
  //        "obj": this.optionModel,
  //       }
  //     });
  //     this.openPopOver.onDidDismiss().then(dataReturned => {
  //       if (dataReturned.data != null) {
  //           console.log('options added',dataReturned.data)
  //             this.optionModel = new OptionModel();
  //             this.optionModel  = dataReturned.data;
  //           this.aOption =  this.optionModel .aOption;
  //           this.bOption =  this.optionModel .bOption;
  //           this.cOption =  this.optionModel .cOption;
  //           this.dOption =  this.optionModel .dOption;
  //           this.correctOption =  this.optionModel .correctOption;

  //         } else {
  //           console.log('option added canceled');
  //       }
  //     });
  //     return await this.openPopOver.present();
  //   }


 
  isAllOptionFilled() {
    if (this.aOption && this.bOption && this.cOption && this.dOption) {
      return true;
    } else {
      return false;
    }
  }

  recognizeImage() {

    if(this.isQuestionTypeChoosen)
    {
      this.isImageProcessing = true;

      this.startImageProcessing().then((val)=>{
          if(val == 'done')
          {
              this.croppedImage = null;
              this.isImageProcessing = false;
          }
      })
    }else{

    }
 

  }


  onCorrectQuestion(type)
  {

      this.isCorrectQuestion = true;
      if(type == 1 || type == 2)
      {
        this.isImageTextCorrect = true;
        this.capturedSnapURL = null;
      }else if(type == 0)
      {
        this.isCorrectDiagramQUestion = true;
      }
 
      if(type ==2 && this.isImageTextCorrect)
      {
          this.readyToUploadDiagram = true;
      }

  }

  // correctDiagramQuestion()
  // {
  //     this.isCorrectDiagramQUestion = true;
  // }

  startImageProcessing()
  {

    return new Promise((resolve,reject)=>{
      setTimeout(() => {
        this.isImageProcessing = true;
        this.percentage = 100;
        this.imageText = null;
        Tesseract.recognize(
          this.croppedImage,
          'eng',
          { logger: m => console.log(m) }
        ).then(({ data: { text } }) => {
          console.log(text);
          this.percentage = this.percentage + 1;
          this.imageText = text;
          resolve('done');
        })
      }, 1000);
    })

  }

  chooseQuestionType(type)
  {
      this.isQuestionTypeChoosen = true;
      if(type.target.value == 0)
      {
          this.choosenQuestType = 0;
      }else if(type.target.value == 1){
          this.choosenQuestType = 1;
      }else if(type.target.value == 2)
      {
          this.choosenQuestType = 2;
      }
  }
  get previewCroppedImage()
  {
        let flag = false;
      if(this.choosenQuestType == 0 && this.croppedImage )
      {
          flag = true;
      }else if(this.choosenQuestType ==2 && this.croppedImage && this.capturedDiagramSnapURL)
      {
          flag = true;
      }
      
      return flag;
  }

  get displayOptionInputText()
  {
      let flag = false;
      if(this.choosenQuestType == 0 && this.croppedImage && this.isCorrectDiagramQUestion)
      {
          flag = true;
      }else if(this.choosenQuestType == 1 && this.imageText && this.isImageTextCorrect)
      {
          flag = true;
      }else if(this.choosenQuestType == 2)
      {
          if(this.imageText && this.isImageTextCorrect && this.uploadedAllDiagram)
          {
            flag = true;
          }
      }
      return flag ;
  
    }

    onClickAddDiagram()
    {
        console.log('add diagram ')
    }

}
