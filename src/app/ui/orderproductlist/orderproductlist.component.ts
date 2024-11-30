import { Component, Input } from '@angular/core';
import { FirestoreService } from '../../firestore.service';

@Component({
  selector: 'app-orderproductlist',
  standalone: true,
  imports: [],
  templateUrl: './orderproductlist.component.html',
  styleUrl: './orderproductlist.component.scss'
})
export class OrderproductlistComponent {
  @Input() id:string='';
  constructor( public api:FirestoreService){}
  data:any=[];
  ngOnInit(){

  console.log(this.id);

      this.data = this.api.getProductById(this.id).subscribe((res:any)=>{
        this.data = res;
        console.log(this.data[0].name);

      })

    }
}
