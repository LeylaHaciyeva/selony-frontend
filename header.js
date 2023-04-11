let button = document.querySelector(".menu-button")
let navigation = document.querySelector(".navigation")
let headerTop = document.querySelector(".header-top")
let headerBottom = document.querySelector(".header-bottom")
let close = document.querySelector(".close-icon")



button.addEventListener("click", function () {
  // navigation.style.display = "block"
  navigation.style.opacity = "1"
  navigation.style.right = "0"
 navigation.style.transform="translate(0,0)"



})


close.addEventListener("click", function () {
  // navigation.style.display = "none"
  navigation.style.opacity = "0"
  navigation.style.right = "-100%"
 navigation.style.transform="translate(0,-100%)"



})
// click=0
// length=1
// button.addEventListener("click",function () {
//     for (let i = 0; i < length; i++) {
//         if (click%2==0) {
//             navigation.style.display="block"
//             navigation.style.right=0+"px"
//         }
//         else{
//             navigation.style.display="none"

//         }
//         click++
//     }
// })


window.onscroll = function () {
  myFunction()
};

function myFunction() {
  if (document.documentElement.scrollTop > 50) {
    headerTop.style.display = "none";
    headerBottom.style.position = "fixed"
    headerBottom.style.top = 0
    headerBottom.style.right = 0
    headerBottom.style.left = 0
    headerBottom.style.backgroundColor = "white"
  } else if (document.documentElement.scrollTop < 50) {
    headerTop.style.display = "block";
    headerBottom.style.position = "relative"
  }
}

if (localStorage.getItem("token") == null) {
  document.querySelector(".dropdown-item_login").style.display = "block"
  document.querySelector(".dropdown-item_logout").style.display = "none"
  document.querySelector(".dropdown-item_admin").style.display = "none"
  document.querySelector(".dropdown-item_signup").style.display = "block"
  document.querySelector(".dropdown-item_login_mob").style.display = "block"
  document.querySelector(".dropdown-item_logout_mob").style.display = "none"
  document.querySelector(".dropdown-item_admin_mob").style.display = "none"
  document.querySelector(".dropdown-item_signup_mob").style.display = "block"
  document.querySelector(".fav_item").style.display = "none"
  document.querySelector(".cart_item").style.display = "none"
  document.querySelector(".fav_item_mob").style.display = "none"
  document.querySelector(".cart_item_mob").style.display = "none"

} else {
  document.querySelector(".dropdown-item_login").style.display = "block"
  document.querySelector(".dropdown-item_logout").style.display = "block"
  document.querySelector(".dropdown-item_admin").style.display = "block"
  document.querySelector(".dropdown-item_signup").style.display = "none"
  document.querySelector(".dropdown-item_login_mob").style.display = "block"
  document.querySelector(".dropdown-item_logout_mob").style.display = "none"
  document.querySelector(".dropdown-item_admin_mob").style.display = "none"
  document.querySelector(".dropdown-item_signup_mob").style.display = "block"
  document.querySelector(".fav_item_mob").style.display = "grid"
  document.querySelector(".cart_item_mob").style.display = "grid"
}

let fetchAllWishlistsForHeader = () => {
  fetch(`http://selony-env.eba-te9jpvdm.eu-north-1.elasticbeanstalk.com/wishlist/${localStorage.getItem("token")}`)
    .then((data) => data.json())
    .then((wishlists) => {
      // console.log(wishlists.length);
      document.querySelector(".wishlist_count").innerHTML = wishlists.length
    })
}
fetchAllWishlistsForHeader()


let fetchAllBasketsForHeader = () => {
  fetch(`http://selony-env.eba-te9jpvdm.eu-north-1.elasticbeanstalk.com/cart/?token=${localStorage.getItem("token")}`)
    .then((data) => data.json())
    .then((baskets) => {
      document.querySelector(".cart_count").innerHTML =baskets.cartItemDtoList.length
    })
}
fetchAllBasketsForHeader()


document.querySelector(".dropdown-item_logout").addEventListener("click",()=>{
  localStorage.clear()
})