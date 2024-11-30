import { FirestoreService } from './../../firestore.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoaderComponent } from "../../ui/loader/loader.component";
import { WhiteloaderComponent } from "../../ui/whiteloader/whiteloader.component";
import { Router } from '@angular/router';
import { FireauthService } from '../../fireauth.service';

@Component({
  selector: 'app-add-address',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, LoaderComponent, WhiteloaderComponent],
  templateUrl: './add-address.component.html',
  styleUrl: './add-address.component.scss'
})
export class AddAddressComponent {
  email:any = '';
  total:any = '';
  cartproducts: any[] = [];
  constructor(public api:FirestoreService,private router: Router,public auth:FireauthService,public store:FirestoreService){}


  isloading:boolean =false;
  contactForm = new FormGroup({
    firstName : new FormControl(''),
    lastName : new FormControl(''),
    // userId: new FormControl('hdfghdfghdfghdfgh'),
    product:new FormControl(['']),
    orderDate: new FormControl(Date().toString()),
    status: new FormControl('Progress'),
    totalAmount : new FormControl(0),
    email : new FormControl(this.email,[Validators.required,Validators.email]),
    phonenumber : new FormControl('',[Validators.required,Validators.pattern('^[0-9]+$')]),
    address : new FormControl(''),
    street : new FormControl(''),
    city : new FormControl(''),
    district : new FormControl(''),
    state : new FormControl(''),
    country : new FormControl(''),
    zipcode : new FormControl('',[Validators.required,Validators.minLength(6),Validators.maxLength(6)]),
    landmark : new FormControl(''),
    gender : new FormControl(''),
  })

  ngOnInit() {
    this.email = this.auth.currentUserName()
    this.cartproducts = this.store.cartid()
    this.total = this.store.totalcartprice()
    this.contactForm.get('product')?.setValue(this.cartproducts);
    this.contactForm.get('email')?.setValue(this.email);
    this.contactForm.get('totalAmount')?.setValue(this.total);
    this.contactForm.get('zipcode')?.valueChanges.subscribe((pincode) => {
      // console.log(pincode);

      if (pincode?.length === 6) {
        this.api.getPincodeData(pincode).subscribe((data) => {
          if (data && data.length > 0) {
            this.contactForm.get('state')?.setValue(data[0].stateName);
            this.contactForm.get('city')?.setValue(data[0].taluk);
            this.contactForm.get('district')?.setValue(data[0].districtName);
          }
        });
      }
    });
  }

  submitAddress() {
    if (this.contactForm.invalid) {
      console.error('Form is invalid');
      return;
    }

    this.isloading = true; // Start loading
    const addressDetails = this.contactForm.value;
    console.log(this.contactForm.value);


    this.api.addAddressDetails(addressDetails).subscribe({
      next: (response) => {
        console.log(response.message);
        this.isloading = false; // Stop loading
        this.contactForm.reset(); // Reset the form
        this.router.navigate(['/orderConfirmed']);
      },
      error: (error) => {
        console.error('Error:', error.message);
        this.isloading = false; // Stop loading
      },
    });
  }



  pinCheck()
  {
    let pincode=this.contactForm.value.zipcode
    console.log(this.contactForm.value.zipcode);

    if(pincode?.length==6)
    {
      this.api.getPincodeData(pincode).subscribe((dataa)=>{
        this.contactForm.get('state')?.setValue(dataa[0].stateName)
        this.contactForm.get('city')?.setValue(dataa[0].taluk)
        // this.loginForm.get('district')?.setValue(dataa[0])


        console.log(dataa[0])
    })
    }
  }
}
