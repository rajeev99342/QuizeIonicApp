import { Component, OnInit } from '@angular/core';
interface City {
  name: string;
  code: string;
  expanded:boolean;
}
@Component({
  selector: 'app-topic',
  templateUrl: './topic.page.html',
  styleUrls: ['./topic.page.scss'],
})
export class TopicPage implements OnInit {

  cities2: City[];

  constructor() { }

  ngOnInit() {
    this.cities2 = [
      {name: 'New York', code: 'NY',expanded:false},
      {name: 'Rome', code: 'RM',expanded:false},
      {name: 'London', code: 'LDN',expanded:false},
      {name: 'Istanbul', code: 'IST',expanded:false},
      {name: 'Paris', code: 'PRS',expanded:false},
      
  ];
  }

  sample()
  {
    console.log('HI list')
  }
  expandItem(item): void {
    if (item.expanded) {
      item.expanded = false;
    } else {
      this.cities2.map(listItem => {
        if (item == listItem) {
          listItem.expanded = !listItem.expanded;
        } else {
          listItem.expanded = false;
        }
        return listItem;
      });
    }
  }
}
