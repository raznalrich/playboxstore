import { Component } from '@angular/core';
import { FirestoreService } from '../../../firestore.service';
import { FireauthService } from '../../../fireauth.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
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
