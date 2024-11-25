import { Component } from '@angular/core';
import { ProductcardComponent } from "../../ui/productcard/productcard.component";
import { FireauthService } from '../../fireauth.service';
import { FirestoreService } from '../../firestore.service';
import { ProductCardSellComponent } from "../../ui/product-card-sell/product-card-sell.component";

@Component({
  selector: 'app-sell-page',
  standalone: true,
  imports: [ProductcardComponent, ProductCardSellComponent],
  templateUrl: './sell-page.component.html',
  styleUrl: './sell-page.component.scss'
})
export class SellPageComponent {
  constructor(public firestore:FirestoreService,public auth:FireauthService){}
  data:any;
  console:any;

  ngOnInit(){
    this.firestore.getSellProducts().subscribe((res:any)=>{
      this.data = res;




    });


  }
}
