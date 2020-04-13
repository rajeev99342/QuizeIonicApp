import { Component, OnInit } from '@angular/core';
import {SubjectListPage} from './subject-list/subject-list.page';
import { Router } from '@angular/router';

interface City {
  name: string;
  code: string;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  cities2: City[];
  selectedCity2: City;
  selectedValue : any = "khjk";
  subjectListPage : SubjectListPage;
  constructor(private router : Router) { }

  ngOnInit() {
    this.cities2 = [
      {name: 'New York', code: 'NY'},
      {name: 'Rome', code: 'RM'},
      {name: 'London', code: 'LDN'},
      {name: 'Istanbul', code: 'IST'},
      {name: 'Paris', code: 'PRS'}
  ];
  }

  onChangeClass(event)
  {
      console.log('selected class is',this.selectedValue)
  }

  onClickNext()
  {
      console.log('hi this is next');
      // this.navCtrl.push(SubjectListPage);
  }
    
  onClickSubject()
  {

    console.log('go to subject list');
    this.router.navigate(['/subject-list']);

  }


}
