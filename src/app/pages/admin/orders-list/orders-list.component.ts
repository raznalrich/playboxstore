import { Component } from '@angular/core';
import { FirestoreService } from '../../../firestore.service';
import { FireauthService } from '../../../fireauth.service';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { OrderproductlistComponent } from "../../../ui/orderproductlist/orderproductlist.component";

@Component({
  selector: 'app-orders-list',
  standalone: true,
  imports: [CurrencyPipe, OrderproductlistComponent,DatePipe],
  templateUrl: './orders-list.component.html',
  styleUrl: './orders-list.component.scss'
})
export class OrdersListComponent {
  constructor(public firestore:FirestoreService,public auth:FireauthService){}
  data:any;
  console:any;

  ngOnInit(){
    this.firestore.getorders().subscribe((res:any)=>{
      this.data = res;
      console.log(this.data);
      // console.log(this.auth.authenticate());



    });
    // console.log('hgsf');

  }

}
