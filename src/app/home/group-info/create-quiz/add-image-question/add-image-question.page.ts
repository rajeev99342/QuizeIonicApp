import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
@Component({
  selector: 'app-add-image-question',
  templateUrl: './add-image-question.page.html',
  styleUrls: ['./add-image-question.page.scss'],
})
export class AddImageQuestionPage implements OnInit {
  capturedSnapURL:string;
  isImageAvailable : boolean = false;
  cameraOptions: CameraOptions = {
    quality: 20,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }
  constructor(private camera: Camera) {


   }

  ngOnInit() {
  }
  

  getFromCamera() {

    this.isImageAvailable = true; 

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
      console.log('get from gallary')
  }

  cropImage()
  {
    console.log('crop iamge');

  }
  

  rotateImage()
  {
    console.log('rotate image')
  }

}
