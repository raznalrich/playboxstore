import { CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from '../../firestore.service';

@Component({
  selector: 'app-sell-single-page',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './sell-single-page.component.html',
  styleUrl: './sell-single-page.component.scss'
})
export class SellSinglePageComponent {
  id: any;
  constructor(private route: ActivatedRoute, public firestore:FirestoreService){}
  data:any=[];
  ngOnInit(){
    this.id = this.route.snapshot.paramMap.get('id');
console.log(this.id);

      this.data = this.firestore.getSellProductById(this.id).subscribe((res:any)=>{
        this.data = res;
        console.log(this.data);

      })

    }
}
