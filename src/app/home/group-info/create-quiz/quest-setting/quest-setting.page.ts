import { Component, OnInit } from '@angular/core';
import { NavParams, PopoverController } from '@ionic/angular';
import { ImageInfoModel } from '../models/ImageInfoModel';

@Component({
  selector: 'app-quest-setting',
  templateUrl: './quest-setting.page.html',
  styleUrls: ['./quest-setting.page.scss'],
})
export class QuestSettingPage implements OnInit {

  
  questModel : ImageInfoModel;
  constructor(private popOver: PopoverController,private nav : NavParams) { }

  ngOnInit() {
    this.questModel = new ImageInfoModel();
    this.questModel = this.nav.get('questObject');
    console.log(this.questModel);
  }

  DeleteQustion()
  {
      this.questModel.isDelete = true;
      this.questModel.isEdit = false;
      this.popOver.dismiss(this.questModel)
  }

  EditQustion()
  {
      this.questModel.isDelete = false;
      this.questModel.isEdit = true;
      this.popOver.dismiss(this.questModel)
  }

}
