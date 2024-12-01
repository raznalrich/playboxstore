import { Component } from '@angular/core';
import { FirestoreService } from '../../../firestore.service';
import { ProductcardComponent } from "../../../ui/productcard/productcard.component";

@Component({
  selector: 'app-ps4games',
  standalone: true,
  imports: [ProductcardComponent],
  templateUrl: './ps4games.component.html',
  styleUrl: './ps4games.component.scss'
})
export class Ps4gamesComponent {

  constructor(public firestore:FirestoreService){}
  data:any;
  // @Input() brand:any =''

  ngOnInit() {
    this.firestore.getProducts().subscribe((res: any) => {
      this.data = res.filter((product: any) =>
        product.name.toLowerCase().includes('ps4')
      );

      console.log(this.data); // Filtered data
    });
  }
}
