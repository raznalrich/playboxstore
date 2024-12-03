import { Component, Input } from '@angular/core';
import { FirestoreService } from '../../../firestore.service';
import { FireauthService } from '../../../fireauth.service';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterLink,DatePipe],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  constructor(public firestore:FirestoreService,public auth:FireauthService){}

  data:any;
  @Input() email:any = ''

  ngOnInit(){
    this.email = this.auth.currentUserName();
    this.firestore.getUserbyemail(this.email).subscribe((res:any)=>{
      this.data = res;
      console.log(this.data);

    });
    // console.log('hgsf');

  }
}
