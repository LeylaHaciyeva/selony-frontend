let cardRow = document.querySelector(".card-row")
let total = document.querySelector(".total")
let arr=[]
let fetchAllBaskets = () => {
    let a = ""
    fetch(`http://selony-env.eba-te9jpvdm.eu-north-1.elasticbeanstalk.com/cart/?token=${localStorage.getItem("token")}`)
        .then((data) => data.json())
        .then((baskets) => {
            // console.log(baskets.cartItemDtoList);
           
            baskets.cartItemDtoList.map((cartItem) => {
                arr.push({
                    productName: cartItem.product.productName,
                    quantity: cartItem.quantity,
                    price: cartItem.product.productPrice,
                    productId: cartItem.product.id
                })
                a += `        
                    <div class="col-lg-4 col-md-4 card-col">
                    <div class="card">
                        <div class="img-div">
                             <img class="card-img-top" src='${cartItem.product.productImage}' alt='${cartItem.product.productName}'>
                        </div>
                        <div class="card-body text-center">
                            <div class="card-tittle">
                                        ${cartItem.product.productName}
                                <p>
                                        ${cartItem.product.productDesc}
                                </p>
                                <span>
                                        Price: ${cartItem.product.productPrice}$
                                </span>
                                <div class="card-buttons">
                                        <button data-item=${cartItem.id}  class="card-button card-remove_btn" >Remove from Basket</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                    `
                cardRow.innerHTML = a
                document.querySelectorAll(".card-remove_btn").forEach(element => {
                    element.addEventListener("click", (e) => {
                        let selectedProductId = +e.target.getAttribute("data-item")
                        console.log(selectedProductId);
                        let deleteFromBasket = async () => {
                            let data = await fetch(`http://selony-env.eba-te9jpvdm.eu-north-1.elasticbeanstalk.com/cart/delete/${selectedProductId}?token=${localStorage.getItem("token")}`, {
                                method: "DELETE",
                            })
                        }
                        deleteFromBasket()

                    })
                })
               
              
            })
            total.innerHTML += baskets.total + "$"
        })
}
fetchAllBaskets()


let stripeApiKey = "pk_test_51Ml8zMFAPBg4zaxPVX2GLig14D3WZ4DbP2eykW8cQqkakgPUGfXtmwA31b2rWN0Jyk9QeV23AlYyPkKEjUWi292w00IVcVeArO"
let stripe = Stripe('pk_test_51Ml8zMFAPBg4zaxPVX2GLig14D3WZ4DbP2eykW8cQqkakgPUGfXtmwA31b2rWN0Jyk9QeV23AlYyPkKEjUWi292w00IVcVeArO'); //xxxx out key for SO
let orderBtn = document.querySelector(".order_btn")
orderBtn.addEventListener("click", async () => {
    let data = await fetch("http://selony-env.eba-te9jpvdm.eu-north-1.elasticbeanstalk.com/order/create-checkout-sessions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(arr),
    })
    let resp = await data.json()
    localStorage.setItem("sessionId", resp.sessionId)
    function showStripe() {
        stripe.redirectToCheckout({
            sessionId: resp.sessionId
        }).then(function (result) {});
    }
    showStripe()
})