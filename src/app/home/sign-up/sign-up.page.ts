import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import { MesssageServicesService } from '../services/messsage-services.service';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {


  // private popoverController: PopoverController

  username : string;

  constructor(private pop : PopoverController,
    private storage : Storage,
     private messageEventEmitterService: MesssageServicesService ) { }

  ngOnInit() {
  }


  async register(form) {
    console.log(form);

    this.storage.set("kidder_user",this.username);
    // this.popoverController.dismiss();
    console.log('Fomr submitted');
    
     await this.pop.dismiss('success');
     
        
  }

}
