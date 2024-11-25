import { Component, Input } from '@angular/core';
import { FirestoreService } from '../../firestore.service';

@Component({
  selector: 'app-cartsinglelist',
  standalone: true,
  imports: [],
  templateUrl: './cartsinglelist.component.html',
  styleUrl: './cartsinglelist.component.scss'
})
export class CartsinglelistComponent {
  @Input() id:string='';
  constructor( public api:FirestoreService){}
  data:any=[];
  ngOnInit(){

  console.log(this.id);

      this.data = this.api.getProductById(this.id).subscribe((res:any)=>{
        this.data = res;
        // console.log(this.data[0].name);

      })

    }
}
