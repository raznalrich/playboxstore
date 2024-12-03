import { Component, Input } from '@angular/core';
import { FirestoreService } from '../../../firestore.service';
import { FireauthService } from '../../../fireauth.service';
import { RouterLink } from '@angular/router';
import { OrderproductlistComponent } from "../../../ui/orderproductlist/orderproductlist.component";
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-myorders',
  standalone: true,
  imports: [RouterLink, OrderproductlistComponent,CurrencyPipe, DatePipe,CommonModule,FormsModule],
  templateUrl: './myorders.component.html',
  styleUrl: './myorders.component.scss'
})
export class MyordersComponent {
  constructor(public firestore:FirestoreService,public auth:FireauthService){}

  data:any;
  console:any;
  expandedIndex: number | null = null;
  @Input() email:any=''

  ngOnInit(){
    this.email= this.auth.currentUserName();
    this.firestore.getOrdersbyemail(this.email).subscribe((res:any)=>{
      this.data = res;
      console.log(this.data);
      // console.log(this.auth.authenticate());



    });
    // console.log('hgsf');

  }
}
