import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-participant-request-list',
  templateUrl: './participant-request-list.page.html',
  styleUrls: ['./participant-request-list.page.scss'],
})
export class ParticipantRequestListPage implements OnInit {

  cities2 : any = [];
  constructor() { }

  ngOnInit() {
    this.cities2 = [
      {name: 'New York', code: 'NY'},
      {name: 'Rome', code: 'RM'},
      {name: 'London', code: 'LDN'},
      {name: 'Istanbul', code: 'IST'},
      {name: 'Paris', code: 'PRS'}
    ];
  }

  filterGroup(ent)
  {
      this.ngOnInit();
      const searchItem = ent.srcElement.value;
      if(!searchItem)
      {
          return;
      }
      this.cities2 = this.cities2.filter((val)=>{
          if(val.name && searchItem)
          {
              if(val.name.toLowerCase().indexOf(searchItem.toLowerCase()) > -1)
              {
                  return true;
              }else{
                return false;
              }
          }
      })

  }

}
