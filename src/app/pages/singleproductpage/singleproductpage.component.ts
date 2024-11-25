import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from '../../firestore.service';
import { CurrencyPipe } from '@angular/common';
@Component({
  selector: 'app-singleproductpage',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './singleproductpage.component.html',
  styleUrl: './singleproductpage.component.scss'
})
export class SingleproductpageComponent {
  id: any;
  constructor(private route: ActivatedRoute, public firestore:FirestoreService){}
  data:any=[];
  ngOnInit(){
    this.id = this.route.snapshot.paramMap.get('id');
console.log(this.id);

      this.data = this.firestore.getProductById(this.id).subscribe((res:any)=>{
        this.data = res;
        console.log(this.data);

      })

    }
}
