import { Component, Input } from '@angular/core';
import { FirestoreService } from '../../firestore.service';

@Component({
  selector: 'app-sellordersproductlist',
  standalone: true,
  imports: [],
  templateUrl: './sellordersproductlist.component.html',
  styleUrl: './sellordersproductlist.component.scss'
})
export class SellordersproductlistComponent {
  @Input() id:string='';
  constructor( public api:FirestoreService){}
  data:any=[];
  ngOnInit(){

  console.log(this.id);

      this.data = this.api.getsellProductById(this.id).subscribe((res:any)=>{
        this.data = res;
        console.log(this.data[0].name);

      })

    }
}
