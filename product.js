let cardRow = document.querySelector(".card-row")
let fetchAllProducts = () => {
    let a = ""
    fetch("http://selony-env.eba-te9jpvdm.eu-north-1.elasticbeanstalk.com/api/getProducts")
        .then((data) => data.json())
        .then((products) => {
            products.map((product) => {
                a += `        
                    <div class="col-lg-4 col-md-4 card-col">
                    <div class="card">
                        <div class="img-div">
                             <img class="card-img-top" src='${product.productImage}' alt='${product.productName}'>
                        </div>
                        <div class="card-body text-center">
                            <div class="card-tittle">
                                        ${product.productName}
                                <p>
                                        ${product.productDesc}
                                </p>
                                <span>
                                        Price: ${product.productPrice}$
                                </span>
                                <div class="card-buttons ">
                                    <button data-item=${product.id} class="card-button">
                                        Add to Basket
                                    </button>
                                    <button data-item=${product.id} class="fav-button">
                                        Add to Favourite
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                    `
                cardRow.innerHTML = a


                document.querySelectorAll(".fav-button").forEach(element => {
                    element.addEventListener("click", (e) => {
                        let selectedProductId = +e.target.getAttribute("data-item")
                        let postToWishlist = async () => {
                            let data = await fetch(`http://selony-env.eba-te9jpvdm.eu-north-1.elasticbeanstalk.com/wishlist/add?token=${localStorage.getItem("token")}`, {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                    id: selectedProductId
                                }),
                            })
                            fetchAllWishlistsForHeader()

                        }
                        postToWishlist()

                    })
                })
                document.querySelectorAll(".card-button").forEach(element => {
                    element.addEventListener("click", (e) => {
                        let selectedProductId = +e.target.getAttribute("data-item")
                        let postToBasket = async () => {
                            let data = await fetch(`http://selony-env.eba-te9jpvdm.eu-north-1.elasticbeanstalk.com/cart/add?token=${localStorage.getItem("token")}`, {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                    productId: selectedProductId,
                                    quantity: 1
                                }),
                            })
                        fetchAllBasketsForHeader()
                            // let resp = await data.json()
                            // console.log(resp);
                        }
                        postToBasket()
                    })
                })
            })
        })
}



fetchAllProducts()