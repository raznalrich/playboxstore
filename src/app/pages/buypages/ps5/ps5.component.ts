import { Component, Input } from '@angular/core';
import { FirestoreService } from '../../../firestore.service';
import { ProductsbybrandComponent } from "../../../productsbybrand/productsbybrand.component";
import { ProductcardComponent } from "../../../ui/productcard/productcard.component";

@Component({
  selector: 'app-ps5',
  standalone: true,
  imports: [ProductsbybrandComponent, ProductcardComponent],
  templateUrl: './ps5.component.html',
  styleUrl: './ps5.component.scss'
})
export class Ps5Component {
  constructor(public firestore:FirestoreService){}
  data:any;
  // @Input() brand:any =''

  ngOnInit() {
    this.firestore.getProducts().subscribe((res: any) => {
      this.data = res.filter((product: any) =>
        product.name.toLowerCase().includes('ps5') 
      );

      console.log(this.data); // Filtered data
    });
  }

}
