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
    path:'addaddress',component: AddAddressComponent
  },

  {
    path:'admin',component: AdminDashboardComponent,children:[
      {
        path:'productlist', component: ProductListComponent
      },
      {
        path:'orders', component: OrdersListComponent
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
