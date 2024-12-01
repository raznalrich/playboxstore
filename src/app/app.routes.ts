import { Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { SingleproductpageComponent } from './pages/singleproductpage/singleproductpage.component';
import { CartComponent } from './pages/cart/cart.component';

import { AddAddressComponent } from './pages/add-address/add-address.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { OrderConfirmationComponent } from './pages/order-confirmation/order-confirmation.component';
import { RentPageComponent } from './pages/rent-page/rent-page.component';
import { SellPageComponent } from './pages/sell-page/sell-page.component';
import { SellSinglePageComponent } from './ui/sell-single-page/sell-single-page.component';
import { ProductListComponent } from './pages/admin/product-list/product-list.component';
import { OrdersListComponent } from './pages/admin/orders-list/orders-list.component';
import { SignupComponent } from './pages/signup/signup.component';
import { Ps5Component } from './pages/buypages/ps5/ps5.component';
import { Ps4Component } from './pages/buypages/ps4/ps4.component';
import { Ps3Component } from './pages/buypages/ps3/ps3.component';
import { Ps5gamesComponent } from './pages/buypages/ps5games/ps5games.component';
import { Ps4gamesComponent } from './pages/buypages/ps4games/ps4games.component';
import { SellproductsComponent } from './pages/admin/sellproducts/sellproducts.component';
import { SellordersComponent } from './pages/admin/sellorders/sellorders.component';

export const routes: Routes = [

  {
    path:'',component: HomepageComponent
  },
  {
    path:'cart',component: CartComponent
  },
  {
    path:'orderConfirmed',component: OrderConfirmationComponent
  },
  {
    path:'rentPage',component: RentPageComponent
  },
  {
    path:'sell',component: SellPageComponent
  },
  {
    path:'login',component: LoginComponent
  },
  {
    path:'signup',component: SignupComponent
  },
  {
    path:'addaddress',component: AddAddressComponent
  },
  {
    path:'ps5',component: Ps5Component
  },
  {
    path:'ps4',component: Ps4Component
  },
  {
    path:'ps3',component: Ps3Component
  },
  {
    path:'ps5games',component: Ps5gamesComponent
  },
  {
    path:'ps4games',component: Ps4gamesComponent
  },

  {
    path:'admin',component: AdminDashboardComponent,children:[
      {
        path:'productlist', component: ProductListComponent
      },
      {
        path:'orders', component: OrdersListComponent
      },
      {
        path:'sellproducts', component: SellproductsComponent
      },
      {
        path:'sellorders', component: SellordersComponent
      }
    ]
  },
  {
    path:'products/:id',component: SingleproductpageComponent
  },
  {
    path:'sell/:id',component: SellSinglePageComponent
  },
];

