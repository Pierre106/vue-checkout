<template>
<div class="main">
   <div class="container">
    <!-- bootstrap nav bar -->
      <b-navbar type="dark" class="row" variant="secondary" toggleable>
           <!--switches between the views to show product page -->
         <b-navbar-brand class="col-lg-6" href="#" @click.prevent="isShowingCart = false">
            Checkout
         </b-navbar-brand>
         <b-navbar-toggle target="nav_dropdown_collapse">             
         </b-navbar-toggle>
         <b-collapse is-nav id="nav_dropdown_collapse">
            <b-nav-item class="d-flex">
                <!--switches between the views to show the cart -->
               <b-button variant="success" @click="isShowingCart = true">View Cart <sup>{{ cart.items.length }}</sup></b-button>
            </b-nav-item>
         </b-collapse>
      </b-navbar>
      <div v-if="!isShowingCart" id="products">
         <div class="row">
            <div class="col-lg-4 sm-1 ml-auto" v-for="(product,index ) in products" v-bind:key="index">  <!--interates through products. -->
               <div>


                  <!-- http://placehold.it/400x250/000/fff -->
                <!-- bootstrap vue cards -->
                  <b-card :title="product.name"
                     :img-src="getImagePath(product.image_path)"
                     :img-alt="getImagePath(product.image_path)"
                     img-top
                     tag="article"
                     style="max-width: 20rem;"
                     class="mb-4 mt-4 w-100 h-auto">
                     <p class="card-text">
                        {{ product.description }}
                     </p>
                     <div class="row float-lg-right">
                        <span class="instock">{{ product.inStock }} in stock</span>
                        <!--disables button if not in stock -->
                        <b-button @click="addProductToCart(product)" :disabled="product.inStock == 0" class="btn btn-success btn-sm">Add to cart</b-button>
                     </div>
                  </b-card>
               </div>
            </div>
         </div>
      </div>
      <div v-else>
         <h1>Cart</h1>
         <!-- bootstrap 4 table -->
         <table v-if="cart.items.length > 0" class="table">
            <caption>Cart List</caption>
            <thead>
               <tr>
                  <th scope="col">Product</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Price</th>
                  <th scope="col">Action</th>
               </tr>
            </thead>
            <tbody>
               <tr v-for="(item, index) in cart.items" v-bind:key="index">
                  <td>{{ item.product.name }}</td>
                  <td>
                     {{ item.quantity }}
                  </td>
                  <td>{{ item.quantity * item.product.price | currency }}</td>
                  <td> <button class="btn btn-success" @click="increaseQuantity(item)" :disabled="item.product.inStock == 0">+</button>
                     <button class="btn btn-danger" @click="decreaseQuantity(item)">-</button>
                  </td>
               </tr>
               <tr>
                  <td class="text-right" colspan="3">
                     <strong>Net Total</strong>
                  </td>
                  <td>{{ cartTotal | currency }}</td>
               </tr>
               <tr>
                  <td class="text-right" colspan="3">
                     <strong>VAT 20%</strong>
                  </td>
                  <td>{{ taxAmount | currency }}</td>
               </tr>
               <tr>
                  <td class="text-right" colspan="3">
                     <strong>Total</strong>
                  </td>
                  <td>{{ cartTotal + taxAmount | currency }}</td>
               </tr>
               <tr>
                  <td colspan="3"></td>
                  <td><button class="btn btn-success" @click="checkout">Checkout</button></td>
               </tr>
            </tbody>
         </table>
         <p v-else>Your cart is currently empty.</p>
      </div>
   </div>
</div>
</template>



<script>
export default {
data(){
  return {
    isShowingCart: false,  /*set to false as we want the front page to load first. I know this isn't best practice, but will do for this demo*/
        cart: {
            items: []  /*Array of products in the cart */
        },
        products: [
            {
                id: 1,
                name: 'Vulture spot',
                description: 'One of the fastest declining families of birds in history.',
                price: 2999,
                inStock: 50,
                image_path:'pic1.jpg'
            },
            {
                id: 2,
                name: 'Ornament pattern fractal',
                description: 'selective focus of purple and pink smoke 3D wallpaper.',
                price: 299,
                inStock: 755,
                 image_path:'pic2.jpg'
            },
            {
                id: 3,
                name: 'Oil and water abstract',
                description: 'red and black fidget spinner. Limited stock available.',
                price: 149,
                inStock: 5,
                image_path:'pic3.jpg'
            },
            {
                id: 4,
                name:  'Buble abstract',
                description: 'white and black ceramic plate, painted with an oil-based vanish.',
                price: 49,
                inStock: 42,
                 image_path:'pic4.jpg'
            },
            {
                id: 5,
                name: 'Metal Architecture',
                description: 'Interesting modern angular modern architecture at Akron Art Museum.',
                price: 599,
                inStock: 0,
                 image_path:'pic5.jpg'
            },
            {
                id: 6,
                name: 'Wallpaper abstract',
                description: 'his experimental painting features black and white paints in thin rings.',
                price: 19,
                inStock: 81,
                 image_path:'pic6.jpg'
            }
        ]
  }
},
methods: {
        getImagePath(path){
            return path ? require('../assets/'+path): '';
        },
        addProductToCart(product) {  /*pushes items to cart and subtracts the number of items in stock  */
            var cartItem = this.getCartItem(product);

            if (cartItem != null) {
                cartItem.quantity++;
            } else {
                this.cart.items.push({
                    product: product,
                    quantity: 1
                });
            }

            product.inStock--;
        },

        increaseQuantity(cartItem) {
            cartItem.product.inStock--;
            cartItem.quantity++;
        },

        decreaseQuantity(cartItem) {
            cartItem.quantity--;
            cartItem.product.inStock++;

            if (cartItem.quantity == 0) {
                this.removeItemFromCart(cartItem);
            }
        },

        removeItemFromCart(cartItem) {
            var index = this.cart.items.indexOf(cartItem);

            if (index !== -1) {
                this.cart.items.splice(index, 1);
            }
        },

        checkout() {
            // Toaster that alert show when enter check out
                if(this.$swal.fire(
                  'Thank you',
                  'For purchashing',
                   'success'
                )) 
                this.cart.items.forEach(function(item) {
                    item.product.inStock += item.quantity;
                });
                this.cart.items = [];     
        },
        getCartItem(product) {
            for (var i = 0; i < this.cart.items.length; i++) {
                if (this.cart.items[i].product.id === product.id) {
                    return this.cart.items[i];
                }
            }
            return null;
        }
    },
    computed: {
        cartTotal() {  //calculates the cost of the item added to the cart
            var total = 0;
            this.cart.items.forEach(function(item) {
                total += item.quantity * item.product.price; //multiples the quanitiy by the price of product
            });
            return total;
        },
        taxAmount() {
            return ((this.cartTotal * 20) / 100); //add 20%vat to the cart total and returns the number
        }
    }
}  
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.instock{
    color: black;
    margin-right: 10px;
    font-weight:bolder;
    font-size: 18px;
}
.b-button{
    margin-right: 30px;
}
</style>