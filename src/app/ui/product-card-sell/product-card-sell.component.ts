import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FirestoreService } from '../../firestore.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-card-sell',
  standalone: true,
  imports: [CommonModule,RouterLink,NgOptimizedImage],
  templateUrl: './product-card-sell.component.html',
  styleUrl: './product-card-sell.component.scss'
})
export class ProductCardSellComponent {
  constructor(public firestore:FirestoreService){}
  @Input() cards:any={
    id: 0,
    title: '',
    price: 0,
    image:'',

  }
}
