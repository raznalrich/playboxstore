import { Component } from '@angular/core';
import { OrderproductlistComponent } from "../../../ui/orderproductlist/orderproductlist.component";
import { FirestoreService } from '../../../firestore.service';
import { FireauthService } from '../../../fireauth.service';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SellordersproductlistComponent } from "../../../ui/sellordersproductlist/sellordersproductlist.component";

@Component({
  selector: 'app-sellorders',
  standalone: true,
  imports: [OrderproductlistComponent, CurrencyPipe, DatePipe, CommonModule, FormsModule, SellordersproductlistComponent],
  templateUrl: './sellorders.component.html',
  styleUrl: './sellorders.component.scss'
})
export class SellordersComponent {
  constructor(public firestore:FirestoreService,public auth:FireauthService){}
  data:any;
  email:any;
  console:any;
  expandedIndex: number | null = null;

  ngOnInit(){
    this.firestore.getsellorders().subscribe((res:any)=>{
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
  updateStatus(orderId: string, newStatus: string,points:number,email:any): void {
    // this.email = this.auth.currentUserName()
    this.firestore.updatesellOrderStatus(orderId, newStatus,email,points).subscribe(() => {
      console.log(`Order ${orderId} status updated to ${newStatus}`);
      alert(`Status updated successfully!`);
    });
  }
}
