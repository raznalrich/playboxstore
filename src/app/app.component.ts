import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from "./ui/nav/nav.component";
import { FirestoreService } from './firestore.service';
import { FireauthService } from './fireauth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'playboxecommerce';
  constructor(public firestore:FirestoreService,public auth:FireauthService){}

}
