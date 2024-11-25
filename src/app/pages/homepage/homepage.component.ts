import { FirestoreService } from './../../firestore.service';
import { Component } from '@angular/core';
import { NavComponent } from "../../ui/nav/nav.component";
import { CarouselComponent } from "../../ui/carousel/carousel.component";
import { NewproductsComponent } from "../../ui/newproducts/newproducts.component";
import { FireauthService } from '../../fireauth.service';
import { ProductsbybrandComponent } from "../../productsbybrand/productsbybrand.component";
import { FooterComponent } from "../../ui/footer/footer.component";

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CarouselComponent, NewproductsComponent, ProductsbybrandComponent, FooterComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {
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
    this.getConsole();
  }
  getConsole(){
    this.firestore.getProducts().subscribe((res: any) => {
      // Filter products based on brand
      const brand = 'Games'; // Replace with the desired brand
      this.console = res.filter((products: any) => products.brand == brand);

      console.log(this.console); // Filtered products
      console.log(this.auth.authenticate());
    });

  }
}
