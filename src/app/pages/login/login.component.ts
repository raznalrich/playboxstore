import { Component } from '@angular/core';
import { FireauthService } from '../../fireauth.service';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { WhiteloaderComponent } from "../../ui/whiteloader/whiteloader.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink, WhiteloaderComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';
  isloading:boolean =false;

  constructor(private authService: FireauthService,private router: Router) {}


  onLogin() {
    this.isloading = true;
    this.authService
      .login(this.email, this.password)
      .then(() => {
        console.log('Login successful');
        this.authService.listenToAuthStateChanges();
        if(this.email!='admin@playbox.com'){
          localStorage.setItem('email', this.email);
          this.isloading = false;
          this.router.navigate(['/']);
        }
        else{
          this.router.navigate(['/admin/productlist']);

        }
      })
      .catch((error) => {
        this.errorMessage = error.message;
      });
  }


}
