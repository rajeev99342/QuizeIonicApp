import { Component, OnInit, ViewChild } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ModalController, NavParams, ToastController } from '@ionic/angular';
import { ImageCroppedEvent, ImageCropperComponent } from 'ngx-image-cropper';
import { PopoverController } from '@ionic/angular';
import { DgrmImageInfoModel } from '../models/DgrmImageInfoModel'
import { Observable } from 'rxjs';
import { AddOptionsPage } from './add-options/add-options.page';
import { ImageInfoModel } from '../models/ImageInfoModel';
import { UserQuestionModel } from '../models/QuestModel';
import { OptionModel } from './add-options/OptionModel';
import { TxtQuesInfoModel } from '../models/TxtQuesInfoModel';
import * as Tesseract from 'tesseract.js'
import { KiKidderQuestModel } from '../models/KiKidderQuestModel';
import { Storage } from '@ionic/storage';
import { userModel } from 'src/app/home/user/userModel';
import { KidderQuestionModel } from '../models/KidderQuestionModel';

@Component({
  selector: 'app-add-image-question',
  templateUrl: './add-image-question.page.html',
  styleUrls: ['./add-image-question.page.scss'],
})
export class AddImageQuestionPage implements OnInit {
  @ViewChild(ImageCropperComponent, { static: true }) angularCropper: ImageCropperComponent;


  recentTextExtractedImage : boolean = false;
  dgrmList : DgrmImageInfoModel[] = [];
  previewCroppedImage: boolean = false;
  percentage = 1;
  start = 1;
  end = 100;
  selectedImage: string;
  imageText: string;
  capturedSnapURL: string;
  capturedDiagramSnapURL: string;
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
  isImageTextCorrect: boolean = false;
  isImageProcessing: boolean = false;
  questMarks : number ;
  RegExp = new RegExp(/^\d*\.?\d*$/);
  cameraOptions: CameraOptions = {
    quality: 50,
    targetWidth: 800,
    targetHeight: 600,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    correctOrientation: true,
  }

  questObject: KiKidderQuestModel;
  openPopOver: any;

  isTxtError : boolean = false;
  isMarksError : boolean = false;
  isOptionErrorA : boolean = false;
  isOptionErrorB : boolean = false;

  isOptionErrorC : boolean = false;
  isOptionErrorD : boolean = false;
  isCorrectOptionError : boolean = false;
  
  validNumeric : number ;

  userModel: userModel;
  constructor(
    private toastController : ToastController,
    private storage: Storage,
    private navParams: NavParams,
    private camera: Camera,
    private modelController: ModalController,
    private popoverController: PopoverController) {
      
  }

  ngOnInit() {

    setTimeout(() => {
      this.storage.get("kidder_user").then((user: userModel) => {
        this.userModel = user;
      })

    }, 500);




    this.questObject = this.navParams.get('questObject');
    if (this.questObject) {
      this.optionModel = new OptionModel();
      this.aOption = this.questObject.ki_kidder_quest_optionA;
      this.bOption = this.questObject.ki_kidder_quest_optionB;
      this.cOption = this.questObject.ki_kidder_quest_optionC;
      this.dOption = this.questObject.ki_kidder_quest_optionD;
      this.optionModel.correctOption = this.questObject.ki_kidder_quest_ans;
      this.questMarks = this.questObject.ki_kidder_quest_marks;
      this.optionModel.aOption = this.aOption;
      this.optionModel.bOption = this.bOption;
      this.optionModel.cOption = this.cOption;
      this.optionModel.dOption = this.dOption;
      
      if(this.questObject.dgrmImageInfoModels && this.questObject.dgrmImageInfoModels.length != 0)
      {
        this.dgrmList = this.questObject.dgrmImageInfoModels;
      }

      
      if (this.questObject.txtQuesInfoModel.quesTxt) 
      {
        this.imageText = this.questObject.txtQuesInfoModel.quesTxt
      }
      this.correctOption = this.questObject.ki_kidder_quest_ans;
      this.croppedSuccess = true;
      this.isEdit = true;
      this.isOptionsAdded = true;
      this.isImageAvailable = true;


    }
  }


  getFromCamera() {
    this.recentTextExtractedImage = false;


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

      this.capturedSnapURL = base64Image;



      this.selectedImage = base64Image;

    }, (err) => {

      console.log(err);
      // Handle error
    });


  }

  getFromGallary() {
    this.recentTextExtractedImage = false;
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

      this.capturedSnapURL = base64Image;


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


  valideForm ()
  {
      this.isTxtError = false;
      this.isMarksError = false;
      this.isCorrectOptionError = false;
      this.isOptionErrorD = false;
      this.isOptionErrorC = false;
      this.isOptionErrorA =  false;
      this.isOptionErrorB = false;
      let flag = true;

      if(!this.imageText && this.dgrmList.length == 0)
      { 
          this.isTxtError = true;
          flag = false;
      }
      if(!this.questMarks)
      {
          flag = false;
          this.isMarksError = true;
      }
      if(!this.correctOption)
      {
          flag = false;
          this.isCorrectOptionError = true;
      }
      if(!this.aOption)
      {
        flag = false;
          this.isOptionErrorA = true;
      }
      if(!this.bOption)
      {
        flag = false;
          this.isOptionErrorB = true;
      }
      if(!this.cOption)
      {
        flag = false;
          this.isOptionErrorC = true;
      }
      if(!this.dOption)
      {
        flag = false;
          this.isOptionErrorD = true;
      }

      if(flag == false)
      {
        return false;
      }else{
        return true;
      }
  }

  addQuestion() {

    if(this.valideForm() == false)
    { 
      this.presentToast("Please fill the mandatory filled");
      return ;
    }

    if(this.questMarks > 100)
    {
        this.presentToast("Question points should not greater than 100");
        this.isMarksError = true;
        return;
    }

    const user_quest_img_model: ImageInfoModel = new ImageInfoModel();
    user_quest_img_model.img_base64 = this.croppedImage;
    user_quest_img_model.img_desc = "this is question image";
    user_quest_img_model.img_path = null;
    user_quest_img_model.toBeDeleted = false;

    let txtQuestModel = new TxtQuesInfoModel();

    let dgrmImages: DgrmImageInfoModel[] = [];

    let user_questdgrm_model: DgrmImageInfoModel = new DgrmImageInfoModel();

    let imgInfoTbl: ImageInfoModel = new ImageInfoModel();

    if (this.imageText)
     {
      txtQuestModel.quesTxt = this.imageText;
      txtQuestModel.txt_ques_id = null;
      txtQuestModel.uniqueCode = null;
      imgInfoTbl = null;
      if(this.isEdit)
      {
          txtQuestModel.uniqueCode = this.questObject.txtQuesInfoModel.uniqueCode;
      }
    }else{
      txtQuestModel = null;
    }

  

    let user_questtxt_model: TxtQuesInfoModel = new TxtQuesInfoModel();
    user_questtxt_model = null;

    let kidderQuestModel: KiKidderQuestModel = new KiKidderQuestModel();
    this.username = "username";

    let imgs: ImageInfoModel[] = [];
    imgs.push(user_quest_img_model);
    kidderQuestModel.txtQuesInfoModel = txtQuestModel;
    kidderQuestModel.ki_kidder_quest_marks = 4;
    kidderQuestModel.ki_kidder_quest_optionA = this.aOption;
    kidderQuestModel.ki_kidder_quest_optionB = this.bOption;
    kidderQuestModel.ki_kidder_quest_optionC = this.cOption;
    kidderQuestModel.ki_kidder_quest_optionD = this.dOption;
    kidderQuestModel.ki_kidder_quest_ans = this.correctOption;
    kidderQuestModel.ki_kidder_quest_level = 1;
    kidderQuestModel.ki_kidder_quest_name = "kuch nhi";
    kidderQuestModel.ki_kidder_quest_sub = null;
    kidderQuestModel.ki_kidder_quest_topic = null;
    
    kidderQuestModel.ki_kidder_quest_marks = +this.questMarks;
    if(this.isEdit)
    {
        kidderQuestModel.isEdit = this.isEdit;
        kidderQuestModel.uniqueCode= this.questObject.uniqueCode;
    }else{
      kidderQuestModel.uniqueCode = null;

    }
    if(this.dgrmList.length != 0 )
    {
      kidderQuestModel.dgrmImageInfoModels = this.dgrmList;
    }
    kidderQuestModel.userModel = this.userModel;
    this.modelController.dismiss(
      kidderQuestModel
    )


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

    this.startImageProcessing().then((val) => {
      if (val == 'done') {
        
        this.isImageProcessing = false;
        this.recentTextExtractedImage = true;
      }
    })



  }




  startImageProcessing() {

    if (this.croppedImage) {
      return new Promise((resolve, reject) => {
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



  }

  onClickUseAsDiagram() {

    if(this.recentTextExtractedImage)
    {
      this.presentToast("You have extracted text from this image please chhose other image");
    }else{
      this.previewCroppedImage = true;
      let dgrm : DgrmImageInfoModel = new DgrmImageInfoModel();
      dgrm.dgrm_img_base64 = this.croppedImage;
      dgrm.dgrm_img_desc = null;
      dgrm.dgrm_img_name = null;
      dgrm.dgrm_img_path = null;
  
      this.dgrmList.push(dgrm);
      this.croppedImage = null;
      this.capturedSnapURL = null;
    }



  }

  onClickExtractImage()
  {

    if(this.imageText)
    {
        this.presentToast("You already written question. Use this image as diagram")
    }else{
      this.recognizeImage();
    }

  }



  async presentToast(ev) {
    const toast = await this.toastController.create({
      message: ev,
      duration: 2000,
      position:'top',
      color:'warning'
    });
    toast.present();
  }

  removeDgrmFromQuest(dgrm : DgrmImageInfoModel)
  {
      let index = this.dgrmList.indexOf(dgrm);
      this.dgrmList.splice(index,1);

      if(dgrm.uniqueCode != null)
      {
        dgrm.deleteFl = true;
        this.dgrmList.push(dgrm);
      }


  }

  numberOnlyValidation(event: any) {
    const pattern = /[0-9.,]/;
    let inputChar = String.fromCharCode(event.charCode);
    // inputChar = this.financial(inputChar);
 
    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }
  roundToXDigits(value: number, digits: number) {
    value = value * Math.pow(10, digits);
    value = Math.round(value);
    value = value / Math.pow(10, digits);
    return value;
}

  validate(event)
  {
    let r = new RegExp("f")
    this.questMarks = null;
    if(this.RegExp.test(event.target.value))
    {
      this.questMarks = event.target.value;
      this.validNumeric = event.target.value;
      
      console.log('###',this.questMarks)
    }else{
      this.questMarks = this.validNumeric;
      event.target.value = this.validNumeric;
      console.log('###',this.questMarks)

    }

    // if(event.target.value > 100)
    // {
    //     this.questMarks = 100;
    //     event.target.value = 100;
    // }
    // if(event.target.value <= 0)
    // {
    //     event.target.value = 1;
    //     this.questMarks = event.target.value;
    // }
    console.log('###',event.target.value)
  }

}
