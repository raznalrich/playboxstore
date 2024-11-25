import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FirestoreService } from '../../firestore.service';
import { FireauthService } from '../../fireauth.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {
  constructor(public firestore:FirestoreService,public auth:FireauthService){}
  triggerSignout(){
    this.auth.signOut();
  }

}
