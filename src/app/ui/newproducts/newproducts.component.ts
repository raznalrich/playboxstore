import { Component, Input } from '@angular/core';
import { ProductcardComponent } from "../productcard/productcard.component";
import { FirestorageService } from '../../firestorage.service';
import { FirestoreService } from '../../firestore.service';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CommonModule } from '@angular/common';
import { NgOptimizedImage } from '@angular/common'

@Component({
  selector: 'app-newproducts',
  standalone: true,
  imports: [ProductcardComponent,CarouselModule,CommonModule,NgOptimizedImage],
  templateUrl: './newproducts.component.html',
  styleUrl: './newproducts.component.scss'
})
export class NewproductsComponent {
  constructor(public firestore:FirestoreService){}
  @Input() data:any=''

  ngOnInit(){
    // this.firestore.getProducts().subscribe((res:any)=>{
    //   this.data = res;
    //   console.log(this.data);

    // });
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
