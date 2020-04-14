import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { SignUpPage } from '../sign-up/sign-up.page';
import { Router } from '@angular/router';

interface City {
  name: string;
  code: string;
  expanded:boolean;
}
@Component({
  selector: 'app-subject-confirm',
  templateUrl: './subject-confirm.page.html',
  styleUrls: ['./subject-confirm.page.scss'],
})
export class SubjectConfirmPage implements OnInit {

  notAuthenticated : boolean = false;
  isOrganization : boolean = true;
  cities2: City[];
  popover : any;
  constructor(public popoverController: PopoverController,
    private router : Router) { }

  ngOnInit() {
    this.cities2 = [
      {name: 'New York', code: 'NY',expanded:false},
      {name: 'Rome', code: 'RM',expanded:false},
      {name: 'London', code: 'LDN',expanded:false},
      {name: 'Istanbul', code: 'IST',expanded:false},
      {name: 'Paris', code: 'PRS',expanded:false},
      {name: 'New York', code: 'NY',expanded:false},
      {name: 'Rome', code: 'RM',expanded:false},
      {name: 'London', code: 'LDN',expanded:false},
      {name: 'Istanbul', code: 'IST',expanded:false},
      {name: 'Paris', code: 'PRS',expanded:false},
      
  ];
  }

  // clickOnOK()
  // {
  //     console.log('Subject seleted')
  // }

  async clickOnOK(ev: any) {

    if(this.notAuthenticated)
    {
      this.popover = await this.popoverController.create({
        component: SignUpPage,
        event: ev,
        animated:true,
        
  
      });
      return await this.popover.present();
    }else{

      if(this.isOrganization)
      {
          // open payment page
          this.popover.dismiss();
          this.router.navigate(['/payment'])
          
      }else {
          // open thank you page
      }

    }


  }






}
