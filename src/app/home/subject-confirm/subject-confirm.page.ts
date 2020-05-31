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

  }

  // clickOnOK()
  // {
  //     console.log('Subject seleted')
  // }








}
