import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, PopoverController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.page.html',
  styleUrls: ['./create-group.page.scss'],
})
export class CreateGroupPage implements OnInit {
  abc: any = this.navParams.get('alarmClosureRequest');
  user_name: string;
  constructor(private pop : PopoverController,public navParams: NavParams, private storage: Storage) { }

  ngOnInit() {
    this.storage.get('kidder_user').then((username)=>{
      this.user_name = username;
    });
  }

  async createGroup() {
    this.abc = null;
    await this.pop.dismiss(true);
  }


}
