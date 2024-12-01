import { Component } from '@angular/core';
import { FirestoreService } from '../../../firestore.service';
import { FireauthService } from '../../../fireauth.service';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { OrderproductlistComponent } from "../../../ui/orderproductlist/orderproductlist.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-orders-list',
  standalone: true,
  imports: [CurrencyPipe, OrderproductlistComponent,DatePipe,CommonModule,FormsModule],
  templateUrl: './orders-list.component.html',
  styleUrl: './orders-list.component.scss'
})
export class OrdersListComponent {
  constructor(public firestore:FirestoreService,public auth:FireauthService){}
  data:any;
  console:any;
  expandedIndex: number | null = null;

  ngOnInit(){
    this.firestore.getorders().subscribe((res:any)=>{
      this.data = res;
      console.log(this.data);
      // console.log(this.auth.authenticate());



    });
    // console.log('hgsf');

  }
  toggleDetails(index: number): void {
    this.expandedIndex = this.expandedIndex === index ? null : index;
  }

  // Get background color for status
  getStatusColor(status: string): string {
    switch (status) {
      case 'Pending':
        return '#ffcc00'; // Yellow
      case 'Progress':
        return '#00bfff'; // Light Blue
      case 'Completed':
        return '#4caf50'; // Green
      case 'Cancelled':
        return '#f44336'; // Red
      default:
        return '#e0e0e0'; // Grey
    }
  }

  // Update status in Firebase
  updateStatus(orderId: string, newStatus: string): void {
    this.firestore.updateOrderStatus(orderId, newStatus).subscribe(() => {
      console.log(`Order ${orderId} status updated to ${newStatus}`);
      alert(`Status updated successfully!`);
    });
  }

}
