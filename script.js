const productcontainerBtn = document.getElementById("productcontainer")
const cartContainer = document.getElementById("cartContainer"); 
const feedback = document.getElementById("feedback");
const  clearCartBtn = document.getElementById("clearCart");
const SortByPriceBtn = document.getElementById("SortByPrice");
const products =[
  { "id": 1, "name": "Laptop", "price": 59999 },
  { "id": 2, "name": "Smartphone", "price": 24999 },
  { "id": 3, "name": "Wireless Earbuds", "price": 2999 },
  { "id": 4, "name": "Keyboard", "price": 1499 },
  { "id": 5, "name": "Monitor", "price": 10499 },
]
const cart =[];

products.forEach(function(product){
    //  <!-- <div class="product-row">
    //         <p>Laptop - Rs 59999</p>
    //         <button>Add to cart</button>
    //      </div>
    const {id,name,price}=product;
    const productrow = `
    <div class ="product-row" >
    <p>${name} - Rs. ${price}</p>
    <button onclick = "addToCart(${id})">Add to cart</button>
    </div>
    `;
    productcontainerBtn.insertAdjacentHTML("beforeend",productrow)
});

function addToCart(id){
console.log("addtocart button clicked",id)



//check if the product is alreadyavailablein the cart

const isproductAvailable = cart.some(function(product){
      return product.id===id;
});
 if(isproductAvailable){
  updatefeedback(` Item is already added to cart`,"error");
  //feedback.textContent=` Item is already added to cart`;
  return
 };

 const producttoCart=products.find(function(product){
    return product.id === id;
})
 //console.log(producttoCart);
 cart.push(producttoCart);
 console.log(cart);
 rendercartDetails();

const product = cart.find((product)=>product.id===id);
    //feedback.textContent=`${name} is added to cart`;
    updatefeedback(`${product.name} is added to cart`,"success");
};

function rendercartDetails(){
   cartContainer.innerHTML =""; 
  cart.forEach(function(product){
  const {name,id,price} =product;
  
  const cartItemRow = `  <div class="product-row">
            <p>${name} - Rs. ${price}</p>
            <button onclick = "removeToCart(${id})">remove</button>
         </div>`
  
         cartContainer.insertAdjacentHTML("beforeend",cartItemRow);
  })
  // let totalprice =0;
  // for(let i=0;i<cart.length;i++){
  //   totalprice = totalprice +cart[i].price;
  // }
  const totalprice = cart.reduce(function(acc,curProduct){
     return acc+curProduct.price;
  },0);
   document.getElementById("totalprice").textContent=`RS. ${totalprice}`;
}

function removeToCart(id){
  console.log(id)
   const product = cart.find((product)=>product.id===id);
  // const updatedCart = cart.filter(function(product){
  //    return product.id !== id;
  // })
  const productIndex = cart.findIndex((product)=>product.id==id)
  cart.splice(productIndex,1)
  // console.log(updatedCart)
  // cart = updatedCart;
 
  updatefeedback(`${product.name} is removed from the cart`,"error")
  rendercartDetails();
}
let timerid;
function updatefeedback(msg,type){
  clearTimeout(timerid);
  feedback.style.display ="block";
  if(type === "success"){
     feedback.style.backgroundColor ="green";
  }
  if(type==="error"){
    feedback.style.backgroundColor = "red";
  }
  feedback.textContent =msg;

  timerid=setTimeout(function(){
    feedback.style.display = "none";
  },2000);
};

clearCartBtn.addEventListener("click",()=>{
  console.log("clear cart");
  console.log("cart",cart);
  cart.length =0;
  console.log(cart);
  rendercartDetails();
  updatefeedback(`cart is clear`);
})

SortByPriceBtn.addEventListener("click",()=>{
  cart.sort(function(product1,product2){
      return product1.price-product2.price;
  });
  rendercartDetails();
});