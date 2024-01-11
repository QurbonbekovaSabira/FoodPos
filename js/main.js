const siteUrl = `http://localhost:3000/product`;
const mainContent__day = document.querySelector(".mainContent__day");
const mainContent__linkBox = document.querySelector(".mainContent__linkBox");
const mainContent_card = document.querySelector(".mainContent_card");
const mainContent__input = document.querySelector(".mainContent__input");
const menuProduct = document.querySelector(".menuProduct");
const menuSubTotal = document.querySelector(".menuSubTotal");
let productActive;

const getData = async () => {
  try {
    const res = await fetch(`${siteUrl}`);
    const data = await res.json();
    product = data;
    return data;
  } catch (error) {
    console.log(error);
  }
};
const RenderCard = async (data) => {
  try {
    let product = await data;
    productActive = await data;
    mainContent_card.innerHTML = product?.product
      ?.map(
        (item) => `
   <li class="mainContent_card_item" id=${item.id}>
   <div class="mainContent_card_item_img" id="${item.id}">
   <img src="${item.url}" alt="">
   </div>
   <div class="mainContent_card_item_textBox" id="${item.id}">
   <p class="mainContent_card_item_title">${item.title}</p>
   <p class="mainContent_card_item_price">${item.price}</p>
   <p class="mainContent_card_item_text">${item.text}</p>
   </div>
   </li>
   `
      )
      .join("");
  } catch (error) {}
};

const rendNav = async () => {
  const data = await getData();
  mainContent__linkBox.innerHTML = data
    ?.map(
      (item) => `
  <button class="mainContent__linkBox_btn" id="${item.title}">${item.title}</button>
  `
    )
    .join("");
  RenderCard(data[0]);
  productActive = data[0];
  let button = document.querySelector(".mainContent__linkBox>button");
  button.classList.add("buttonActive");
};
rendNav();

mainContent__linkBox.addEventListener("click", (e) => {
  let id = e.target.id;
  const rendProduct = product?.find((item) => item.title == id);
  let button = document.querySelectorAll(".mainContent__linkBox>button");
  for (let i of button) {
    i.classList.remove("buttonActive");
  }
  button.forEach((item) => {
    if (item.id == id) {
      item.classList.add("buttonActive");
    }
  });
  RenderCard(rendProduct);
});

function daysInMonth(month, year) {
  // console.log(new Date(year, month, 10).getDate());
  return new Date(year, month, 10).getDate();
}

function GFG_Fun() {
  let date = new Date();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  // console.log("Number of days in " + month
  //     + "th month of the year " + year
  //     + " is " + daysInMonth(month, year));
  mainContent__day.textContent =
    daysInMonth(month, year) + "." + month + "." + year;
}
GFG_Fun();

const getProduct = async (text) => {
  let mainContent__descBox = document.querySelector(".mainContent__descBox");
  let name = productActive?.product?.filter((item) =>
    item.title.toLowerCase().includes(text.toLowerCase())
  );
  if (text ? text.split("").length > 0 : false) {
    mainContent__descBox.innerHTML = name
      ?.map(
        (item) =>
          `
    <div class="searchDesc">
      <img src="${item.url}">
     <div>
     <p class="mainContent_card_item_text">${item.title}</p>
     <p class="mainContent_card_item_text">$ ${item.price}</p>
     </div>
    </div>
 `
      )
      .join("");
  } else {
    mainContent__descBox.innerHTML = "";
  }
};
getProduct();
mainContent__input.addEventListener("keyup", async (e) => {
  const value = e.target.value;
  getProduct(value);
});
let main_productMenu = [];
let n = 0;

const rendMenu = (id, productMenu) => {
  menuProduct.innerHTML = "";
  n++;
  const main__container = document.querySelector(".main__container");
  if (id) {
    main__container.style.gridTemplateColumns = "104px 3fr 1fr";
    let find = main_productMenu.find((item) => item.id == productMenu.id);
  
  
  if (!main_productMenu.includes(find)) {
    main_productMenu.push(productMenu);
  }
  if (!productMenu.title) {
    for (let i = 0; i < main_productMenu.length; i++) {
      if (productMenu.id == main_productMenu[i].id) {
        main_productMenu.splice(i, 1);
      }
    }
  }
}
  menuProduct.innerHTML = "";
  menuProduct.innerHTML += main_productMenu
    ?.map(
      (item) => `
    <div class="menu_content_box">
    <div class="menuImgBox"> 
    <img class="menuImg" src="${item.url}">
        <div class="menuImgBox_content">
        <p class="menu_sub_title">${item.title}</p>
        <p class="menu_sub_text">${item.price}</p>
        </div>
    </div>
         <div class="menu_textBox">
              <div class="menu_Btn_box">
                 <button class="menuBtnCount" id="${item.id}"  data-inc="${item.id}">+</button>
                 <p class="menuCount">${item.count}</p>
                 <button class="menuBtnCount" id="${item.id}" data-dec="${item.id}">-</button>
              </div>
              <p class="menuPrice">${item.price * item.count}</p>
         </div>
 </div>
 <form class="menuForm">
 <input class="menu_Commit" type="text" placeholder="Please, just a little bit spicy only.">
 <a href="#" class="menu_cardBtn" id="${item.id}" data-id="${item.id}"></a>
</form>
  `
    )
    .join("");
   let subTotal=0;
   for(let i of main_productMenu ){
    subTotal+=i.price*i.count;
   }
  menuSubTotal.innerHTML = 
    `
<p class="menuSubTotal_desc">Sub total</p>
<p class="menuSubTotal_price">$ ${subTotal}</p>
      `;
};

mainContent_card.addEventListener("click", (e) => {
  const modalBox = document.querySelector(".modalBox");
  modalBox.style.display = "block";
  let id = e.target.id;
  let product = productActive.product.find((item) => item.id == id);
  rendMenu(id, product);
});

menuProduct.addEventListener("click", (e) => {
  let increment = e.target.dataset.inc;
  let decrement = e.target.dataset.dec;
  let deleteBtn = e.target.dataset.id;
  let id = e.target.id;
  let product = productActive.product.find((item) => item.id == id);
  if (increment) {
    product.count += 1;
    rendMenu(id, product);
  }
  if (decrement && product.count > 0) {
    product.count -= 1;
    rendMenu(id, product);
  }
  if (deleteBtn) {
    let product = main_productMenu.find((item) => item.id == id);
    for (let i = 0; i < main_productMenu.length; i++) {
      if (main_productMenu[i].id == product.id) {
        product = { id: id };
        rendMenu(id, product);
      }
    }
  }
});
