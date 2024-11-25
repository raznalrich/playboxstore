import { Component } from '@angular/core';
import { FirestoreService } from '../../firestore.service';
import { CartsinglelistComponent } from "../../ui/cartsinglelist/cartsinglelist.component";
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CartsinglelistComponent,RouterLink,CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  constructor(public firestore:FirestoreService){}

  data:any=[]

  ngOnInit(){
    this.data = this.firestore.cartid()
  }
}
