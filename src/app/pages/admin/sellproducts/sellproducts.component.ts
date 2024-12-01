import { CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FirestoreService } from '../../../firestore.service';
import { FireauthService } from '../../../fireauth.service';

@Component({
  selector: 'app-sellproducts',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './sellproducts.component.html',
  styleUrl: './sellproducts.component.scss'
})
export class SellproductsComponent {
  constructor(public firestore:FirestoreService,public auth:FireauthService){}
  data:any;
  console:any;

  ngOnInit(){
    this.firestore.getSellProducts().subscribe((res:any)=>{
      this.data = res;
      // console.log(this.data);
      // console.log(this.auth.authenticate());



    });
    // console.log('hgsf');

  }

}
