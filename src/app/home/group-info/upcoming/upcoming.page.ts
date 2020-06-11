import { Component, OnInit, ViewChild } from '@angular/core';
import { GroupInfoPage } from '../group-info.page';
import { TestRoomService } from '../service/testroom.service';

@Component({
  selector: 'app-upcoming',
  templateUrl: './upcoming.page.html',
  styleUrls: ['./upcoming.page.scss'],
})
export class UpcomingPage implements OnInit {



  cities2 : any = [];
  constructor(    private testRoomService:TestRoomService ) { }

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
