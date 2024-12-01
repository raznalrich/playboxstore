import { Component } from '@angular/core';
import { FirestoreService } from '../../../firestore.service';
import { ProductcardComponent } from "../../../ui/productcard/productcard.component";

@Component({
  selector: 'app-ps3',
  standalone: true,
  imports: [ProductcardComponent],
  templateUrl: './ps3.component.html',
  styleUrl: './ps3.component.scss'
})
export class Ps3Component {
  constructor(public firestore:FirestoreService){}
  data:any;
  // @Input() brand:any =''

  ngOnInit() {
    this.firestore.getProducts().subscribe((res: any) => {
      this.data = res.filter((product: any) =>
        product.name.toLowerCase().includes('ps3')
      );

      console.log(this.data); // Filtered data
    });
  }
}
