import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirestoreService } from '../../firestore.service';
import { FireauthService } from '../../fireauth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { WhiteloaderComponent } from "../whiteloader/whiteloader.component";

@Component({
  selector: 'app-sell-single-page',
  standalone: true,
  imports: [CurrencyPipe, WhiteloaderComponent,ReactiveFormsModule,CommonModule],
  templateUrl: './sell-single-page.component.html',
  styleUrl: './sell-single-page.component.scss'
})
export class SellSinglePageComponent {
  id: any;
  cashid:number=0;
  pointsid:number=0;
  upiindex:number =0;
  bankindex:number =0;
  constructor(private route: ActivatedRoute, public firestore:FirestoreService,private router: Router,public auth:FireauthService,public api:FirestoreService){}
  data:any=[];

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
    points : new FormControl(0),

    paymentmode : new FormControl('points'),
    upi : new FormControl(''),
    accno : new FormControl(''),
    ifsc : new FormControl(''),
    branch : new FormControl(''),
    holdername : new FormControl(''),
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

  ngOnInit(){
    this.email = this.auth.currentUserName()
      this.cartproducts = this.api.cartid()
      this.total = this.api.totalcartprice()

      this.sellform.get('email')?.setValue(this.email);
      // this.sellform.get('totalAmount')?.setValue(this.total);
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
    this.id = this.route.snapshot.paramMap.get('id');
console.log(this.id);

      this.data = this.firestore.getSellProductById(this.id).subscribe((res:any)=>{
        this.data = res;
        console.log(this.data.points);
        this.sellform.get('product')?.setValue(this.id);
        this.sellform.get('totalAmount')?.setValue(this.data.price);
        this.sellform.get('points')?.setValue(this.data.points);
      })

    }



    submitAddress() {
      if (this.sellform.invalid) {
        console.error('Form is invalid');
        return;
      }

      this.isloading = true; // Start loading
      const addressDetails = this.sellform.value;
      console.log(this.sellform.value);


      this.api.addselldetails(addressDetails).subscribe({
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

    setcash(){
      this.cashid=1;
      this.sellform.get('paymentmode')?.setValue('cash');
    }
    setpoints(){
      this.cashid=0;
      this.pointsid=1;
      this.sellform.get('paymentmode')?.setValue('points');
    }
    setupi(){
this.upiindex=1;
this.bankindex = 0;
    }
    setbank(){
this.bankindex = 1;
this.upiindex=0;
    }
}
