import { Component } from '@angular/core';
import { ProductcardComponent } from "../../../ui/productcard/productcard.component";
import { FirestoreService } from '../../../firestore.service';

@Component({
  selector: 'app-ps5games',
  standalone: true,
  imports: [ProductcardComponent],
  templateUrl: './ps5games.component.html',
  styleUrl: './ps5games.component.scss'
})
export class Ps5gamesComponent {
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
