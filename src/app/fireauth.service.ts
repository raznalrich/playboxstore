import { Injectable, signal } from '@angular/core';
import { Auth, authState, signInWithEmailAndPassword, User, UserCredential } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class FireauthService {
private user:User | null = null
  constructor(private auth:Auth) { }
authenticate = signal(false);
currentUserName = signal<string | null>(null);
  listenToAuthStateChanges(): void{
    authState(this.auth).subscribe((user:User | null) =>{
      if(user){
        this.authenticate.set(true);
        this.currentUserName.set(user.displayName || user.email);
      }
      else{
        this.authenticate.set(false);
        this.currentUserName.set(null);
      }
    })
  }
  checkauth(){

      this.authenticate.update(value => value = this.user ? true : false)

  }


  login(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  signOut(){
    this.auth.signOut();
    this.listenToAuthStateChanges();

  }
}
