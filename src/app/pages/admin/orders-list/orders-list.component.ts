import { Component } from '@angular/core';
import { FirestoreService } from '../../../firestore.service';
import { FireauthService } from '../../../fireauth.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-orders-list',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './orders-list.component.html',
  styleUrl: './orders-list.component.scss'
})
export class OrdersListComponent {
  constructor(public firestore:FirestoreService,public auth:FireauthService){}
  data:any;
  console:any;

  ngOnInit(){
    this.firestore.getProducts().subscribe((res:any)=>{
      this.data = res;
      // console.log(this.data);
      // console.log(this.auth.authenticate());



    });
    // console.log('hgsf');

  }
}
