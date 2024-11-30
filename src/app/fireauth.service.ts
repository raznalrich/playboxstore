import { Injectable, signal } from '@angular/core';
import { Auth, authState, signInWithEmailAndPassword, User, UserCredential,createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { FirestorageService } from './firestorage.service';

@Injectable({
  providedIn: 'root'
})
export class FireauthService {

private user:User | null = null
  constructor(private auth:Auth,private firestore:Firestore) { }
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
  checkauth(storedemail:string){
    this.authenticate.set(true);
    this.currentUserName.set(storedemail);


  }


  login(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  signup(email: string, password: string, fullname: string): Promise<void> {
    return createUserWithEmailAndPassword(this.auth, email, password).then(
      async (userCredential: UserCredential) => {
        const user = userCredential.user;
        if (user) {
          // Additional user data to store
          const userData = {
            address: '',
            avatar: '/images/defaultAvatar.4e9edb2a624547982816014bf128fcd5.jpg',
            banner: '/images/defaultBanner.accdc757f2c48d61f24c4fbcef2742fd.jpg',
            basket: [],
            dateJoined: new Date().toUTCString(),
            email: user.email,
            fullname: fullname,
            points: 0,
            role: 'USER',
          };

          // Save user data to Firestore
          const userDocRef = doc(this.firestore, `users/${user.uid}`);
          await setDoc(userDocRef, userData);
        }
      }
    );
  }

  signOut(){
    this.auth.signOut();
    localStorage.removeItem('email'); // Clear stored email
      // this.authenticate.set(false);
      // this.currentUserName.set(null);
    this.listenToAuthStateChanges();

  }
}
