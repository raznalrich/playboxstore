import { Component, Input } from '@angular/core';
import { ProductcardComponent } from '../ui/productcard/productcard.component';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FirestoreService } from '../firestore.service';

@Component({
  selector: 'app-productsbybrand',
  standalone: true,
  imports: [ProductcardComponent,CarouselModule,CommonModule,NgOptimizedImage],
  templateUrl: './productsbybrand.component.html',
  styleUrl: './productsbybrand.component.scss'
})
export class ProductsbybrandComponent {
  constructor(public firestore:FirestoreService){}
  data:any;
  @Input() brand:any =''

  ngOnInit(){
    this.firestore.getProductsByBrand(this.brand).subscribe((res:any)=>{
      this.data = res;
      console.log(this.data);

    });
    // console.log('hgsf');

  }
  customOptions: OwlOptions = {
    autoplay:true,
    autoWidth: true,
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,

    navText: ['<', '>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }
}
