import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FireauthService } from '../../fireauth.service';
import { FirestoreService } from '../../firestore.service';

@Component({
  selector: 'app-adminnav',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './adminnav.component.html',
  styleUrl: './adminnav.component.scss'
})
export class AdminnavComponent {
  constructor(public firestore:FirestoreService,public auth:FireauthService,private router: Router){}

  signingOut(){
    this.auth.signOut();
    this.router.navigate(['/']);

  }
}
