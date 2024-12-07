import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, doc, docData, getDocs, query, updateDoc, where } from '@angular/fire/firestore';
import { catchError, map, Observable, throwError } from 'rxjs';

export interface Product {
  id?: string;
  name: string;
  price: number;
  description?: string;
  // Add other product properties as needed
}

export interface User {
  id?: string;
  fullname: string;
  dateJoined: string;
  points: number;
  mobile: number;
  avatar?: string;
  // Add other product properties as needed
}

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: Firestore,private http: HttpClient) { }


  // Fetch all products
  getProducts(): Observable<Product[]> {
    const productsRef = collection(this.firestore, 'products');
    console.log(collectionData(productsRef, { idField: 'id' }));

    return collectionData(productsRef, { idField: 'id' });
  }

  // getsellProducts(): Observable<Product[]> {
  //   const productsRef = collection(this.firestore, 'sell_products');
  //   console.log(collectionData(productsRef, { idField: 'id' }));

  //   return collectionData(productsRef, { idField: 'id' });
  // }

  getorders(): Observable<Product[]> {
    const productsRef = collection(this.firestore, 'orders');
    console.log(collectionData(productsRef, { idField: 'id' }));

    return collectionData(productsRef, { idField: 'id' });
  }

  getsellorders(): Observable<Product[]> {
    const productsRef = collection(this.firestore, 'sell_orders');
    console.log(collectionData(productsRef, { idField: 'id' }));

    return collectionData(productsRef, { idField: 'id' });
  }
  getSellProducts(): Observable<Product[]> {
    const productsRef = collection(this.firestore, 'sell_products');
    console.log(collectionData(productsRef, { idField: 'id' }));

    return collectionData(productsRef, { idField: 'id' });
  }
  cartcount = signal(0);
  totalcartprice = signal(0);
  cartid = signal<any[]>([]);
//payment
address = signal('');
mobile = signal(0);

//sell orders

updatesellOrderStatus(orderId: string, status: string, userEmail: string,productpoints:any): Observable<void> {
  if (!orderId || !userEmail) {
    return throwError(() => new Error('Order ID and User Email are required'));
  }

  // Reference to the specific order document
  const orderDocRef = doc(this.firestore, `sell_orders/${orderId}`);

  return new Observable<void>((observer) => {
    updateDoc(orderDocRef, { status })
      .then(() => {
        console.log(`Order ${orderId} status updated to ${status}`);
        // Fetch the user document based on the email
        const userQuery = query(
          collection(this.firestore, 'users'),
          where('email', '==', userEmail)
        );

        getDocs(userQuery)
          .then((querySnapshot) => {
            if (querySnapshot.empty) {
              console.error('No matching user found');
              observer.error(new Error('No matching user found'));
              return;
            }

            const userDoc = querySnapshot.docs[0];
            const userRef = doc(this.firestore, `users/${userDoc.id}`);
            const userData = userDoc.data();
            const currentPoints = userData['points'] || 0;
            console.log(currentPoints);


            // Determine points to add based on the status
            let pointsToAdd = 0;
            switch (status) {
              case 'Completed':
                pointsToAdd = productpoints; // Example points for a completed order
                break;
              case 'Cancelled':
                pointsToAdd = 0; // Example deduction for a cancelled order
                break;
            }

            updateDoc(userRef, { points: currentPoints + pointsToAdd })
              .then(() => {
                console.log(`User points updated to ${currentPoints + pointsToAdd}`);
                observer.next();
                observer.complete();
              })
              .catch((error) => {
                console.error('Error updating user points:', error);
                observer.error(error);
              });
          })
          .catch((error) => {
            console.error('Error fetching user data:', error);
            observer.error(error);
          });
      })
      .catch((error) => {
        console.error('Error updating order status:', error);
        observer.error(error);
      });
  });
}

// Update order status
updateOrderStatus(orderId: string, status: string): Observable<void> {
  if (!orderId) {
    return throwError(() => new Error('Order ID is required'));
  }

  // Reference to the specific order document
  const orderDocRef = doc(this.firestore, `orders/${orderId}`);

  return new Observable<void>((observer) => {
    updateDoc(orderDocRef, { status })
      .then(() => {
        console.log(`Order ${orderId} status updated to ${status}`);
        observer.next();
        observer.complete();
      })
      .catch((error) => {
        console.error('Error updating order status:', error);
        observer.error(error);
      });
  });
}

getUserbyemail(email: string): Observable<User[]> {
  if (!email) {
    return throwError(() => new Error('Brand is required'));
  }

  // Reference to the 'products' collection with a query filter for the brand
  const productsRef = query(
    collection(this.firestore, 'users'),
    where('email', '==', email)
  );

  return collectionData(productsRef, { idField: 'id' }).pipe(
    map(users => {
      if (!users) {
        throw new Error('No user found for the specified brand');
      }
      return users as User[];
    }),
    catchError(error => {
      console.error('Error fetching user by brand:', error);
      return throwError(() => error);
    })
  );
}

getOrdersbyemail(email: string): Observable<any[]> {
  if (!email) {
    return throwError(() => new Error('Brand is required'));
  }

  // Reference to the 'products' collection with a query filter for the brand
  const productsRef = query(
    collection(this.firestore, 'orders'),
    where('email', '==', email)
  );

  return collectionData(productsRef, { idField: 'id' }).pipe(
    map(orders => {
      if (!orders) {
        throw new Error('No user found for the specified brand');
      }
      return orders as any[];
    }),
    catchError(error => {
      console.error('Error fetching user by brand:', error);
      return throwError(() => error);
    })
  );
}

getProductsByBrand(brand: string): Observable<Product[]> {
  if (!brand) {
    return throwError(() => new Error('Brand is required'));
  }

  // Reference to the 'products' collection with a query filter for the brand
  const productsRef = query(
    collection(this.firestore, 'products'),
    where('brand', '==', brand)
  );

  return collectionData(productsRef, { idField: 'id' }).pipe(
    map(products => {
      if (!products) {
        throw new Error('No products found for the specified brand');
      }
      return products as Product[];
    }),
    catchError(error => {
      console.error('Error fetching products by brand:', error);
      return throwError(() => error);
    })
  );
}

addAddressDetails(addressDetails: any): Observable<any> {
  const ordersRef = collection(this.firestore, 'orders');

  return new Observable((observer) => {
    addDoc(ordersRef, addressDetails)
      .then(() => {
        observer.next({ success: true, message: 'Address added successfully!' });
        observer.complete();
      })
      .catch((error) => {
        console.error('Error adding address:', error);
        observer.error({ success: false, message: error.message });
      });
  });
}

addselldetails(addressDetails: any): Observable<any> {
  const ordersRef = collection(this.firestore, 'sell_orders');

  return new Observable((observer) => {
    addDoc(ordersRef, addressDetails)
      .then(() => {
        observer.next({ success: true, message: 'Address added successfully!' });
        observer.complete();
      })
      .catch((error) => {
        console.error('Error adding address:', error);
        observer.error({ success: false, message: error.message });
      });
  });
}


  addcartcount(id:number){
    this.cartcount.update(value => value + 1);

    // this.cartid.update(items => [...items, id]);
    this.cartid.update(value => [...value,id]);
    console.log(this.cartid());
    this.gettotalprice();

  }

  removecartcount(id: number) {

    this.cartcount.update(value => value - 1 );
    this.cartid.update(value => value.filter(item => item !== id));
    this.gettotalprice();
  }
  gettotalprice() {
    const cartIds = this.cartid();
    this.getProducts().subscribe((res:any)=> {
      if (!Array.isArray(res)) {
        console.error('Invalid products data', res);
        return;
      }

      const cartProducts = res.filter(product => cartIds.includes(product.id));

      const totalPrice = cartProducts.reduce((sum, product) => sum + product.price, 0);

      this.totalcartprice.set(totalPrice);

      console.log('Total Price:', this.totalcartprice());
    });
  }


  // Fetch a single product by ID
  // getProductById(productId: string): Observable<Product> {
  //   const productDocRef = doc(this.firestore, `products/${productId}`);
  //   return docData(productDocRef, { idField: 'id' });
  // }

  getPincodeData(pin: any) {
    return this.http.get('json/pincodes.json').pipe(
      map((data:any) => {
        const filteredData = data.filter((item:any) => item.pincode === Number( pin));
        return filteredData;
      })
    );
  }


  getProductById(productId: string): Observable<Product> {
    if (!productId) {
      return throwError(() => new Error('Product ID is required'));
    }

    const productDocRef = doc(this.firestore, `products/${productId}`);
    return docData(productDocRef, { idField: 'id' })
      .pipe(
        map(product => {
          if (!product) {
            throw new Error('Product not found');
          }
          return product as Product;
        }),
        catchError(error => {
          console.error('Error fetching product:', error);
          return throwError(() => error);
        })
      );
  }

  getsellProductById(productId: string): Observable<Product> {
    if (!productId) {
      return throwError(() => new Error('Product ID is required'));
    }

    const productDocRef = doc(this.firestore, `sell_products/${productId}`);
    return docData(productDocRef, { idField: 'id' })
      .pipe(
        map(product => {
          if (!product) {
            throw new Error('Product not found');
          }
          return product as Product;
        }),
        catchError(error => {
          console.error('Error fetching product:', error);
          return throwError(() => error);
        })
      );
  }
  getSellProductById(productId: string): Observable<Product> {
    if (!productId) {
      return throwError(() => new Error('Product ID is required'));
    }

    const productDocRef = doc(this.firestore, `sell_products/${productId}`);
    return docData(productDocRef, { idField: 'id' })
      .pipe(
        map(product => {
          if (!product) {
            throw new Error('Product not found');
          }
          return product as Product;
        }),
        catchError(error => {
          console.error('Error fetching product:', error);
          return throwError(() => error);
        })
      );
  }

  // Add a new product
  addProduct(product: Product) {
    const productsRef = collection(this.firestore, 'products');
    return collectionData(productsRef).pipe(
      // Additional logic for adding product can be implemented here
    );
  }

  // Update an existing product
  updateProduct(productId: string, productData: Partial<Product>) {
    const productDocRef = doc(this.firestore, `products/${productId}`);
    // Implement update logic
  }

  // Delete a product
  deleteProduct(productId: string) {
    const productDocRef = doc(this.firestore, `products/${productId}`);
    // Implement delete logic
  }
}
