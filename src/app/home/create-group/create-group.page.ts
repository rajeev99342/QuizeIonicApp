import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.page.html',
  styleUrls: ['./create-group.page.scss'],
})
export class CreateGroupPage implements OnInit {
  abc: any = this.navParams.get('alarmClosureRequest');

  constructor(private pop : PopoverController,public navParams: NavParams) { }

  ngOnInit() {
  }

  async createGroup() {
    this.abc = null;
    await this.pop.dismiss(true);
  }


}
