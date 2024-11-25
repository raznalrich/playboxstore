import { Component, Input } from '@angular/core';
import { FirestorageService } from '../../firestorage.service';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FirestoreService } from '../../firestore.service';

@Component({
  selector: 'app-productcard',
  standalone: true,
  imports: [CommonModule,RouterLink,NgOptimizedImage],
  templateUrl: './productcard.component.html',
  styleUrl: './productcard.component.scss'
})
export class ProductcardComponent {
  constructor(public firestore:FirestoreService){}
  @Input() cards:any={
    id: 0,
    title: '',
    price: 0,
    image:'',

  }
}
