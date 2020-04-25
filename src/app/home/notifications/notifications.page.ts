import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  price: any = '';

  constructor(private route: ActivatedRoute) { 
    this.price = this.route.snapshot.params['price'];

  }

  ngOnInit() {
  }

}
