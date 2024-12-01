import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FirestoreService } from '../../firestore.service';
import { Router, RouterLink } from '@angular/router';
import { FireauthService } from '../../fireauth.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { WhiteloaderComponent } from "../whiteloader/whiteloader.component";

@Component({
  selector: 'app-product-card-sell',
  standalone: true,
  imports: [CommonModule, RouterLink, NgOptimizedImage, FormsModule, WhiteloaderComponent,ReactiveFormsModule],
  templateUrl: './product-card-sell.component.html',
  styleUrl: './product-card-sell.component.scss'
})
export class ProductCardSellComponent {
  constructor(public firestore:FirestoreService,private router: Router,public auth:FireauthService,public api:FirestoreService){}
  @Input() cards:any={
    id: 0,
    title: '',
    price: 0,
    image:'',

  }

  email:any = '';
  total:any = '';
  cartproducts: any[] = [];



  isloading:boolean =false;
  sellform = new FormGroup({
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
    this.cartproducts = this.api.cartid()
    this.total = this.api.totalcartprice()
    this.sellform.get('product')?.setValue(this.cartproducts);
    this.sellform.get('email')?.setValue(this.email);
    this.sellform.get('totalAmount')?.setValue(this.total);
    this.sellform.get('zipcode')?.valueChanges.subscribe((pincode) => {
      // console.log(pincode);

      if (pincode?.length === 6) {
        this.api.getPincodeData(pincode).subscribe((data) => {
          if (data && data.length > 0) {
            this.sellform.get('state')?.setValue(data[0].stateName);
            this.sellform.get('city')?.setValue(data[0].taluk);
            this.sellform.get('district')?.setValue(data[0].districtName);
          }
        });
      }
    });
  }

  submitAddress() {
    if (this.sellform.invalid) {
      console.error('Form is invalid');
      return;
    }

    this.isloading = true; // Start loading
    const addressDetails = this.sellform.value;
    console.log(this.sellform.value);


    this.api.addAddressDetails(addressDetails).subscribe({
      next: (response) => {
        console.log(response.message);
        this.isloading = false; // Stop loading
        this.sellform.reset(); // Reset the form
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
    let pincode=this.sellform.value.zipcode
    console.log(this.sellform.value.zipcode);

    if(pincode?.length==6)
    {
      this.api.getPincodeData(pincode).subscribe((dataa)=>{
        this.sellform.get('state')?.setValue(dataa[0].stateName)
        this.sellform.get('city')?.setValue(dataa[0].taluk)
        // this.loginForm.get('district')?.setValue(dataa[0])


        console.log(dataa[0])
    })
    }
  }
}
