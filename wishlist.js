let cardRow = document.querySelector(".card-row")
let fetchAllWishlists = () => {
    let a = ""
    fetch(`http://selony-env.eba-te9jpvdm.eu-north-1.elasticbeanstalk.com/wishlist/${localStorage.getItem("token")}`)
        .then((data) => data.json())
        .then((wishlists) => {
            console.log(wishlists);
            wishlists.map((wishlist) => {
                a += `        
                    <div class="col-lg-4 col-md-4 card-col">
                    <div class="card">
                        <div class="img-div">
                             <img class="card-img-top" src='${wishlist.productImage}' alt='${wishlist.productName}'>
                        </div>
                        <div class="card-body text-center">
                            <div class="card-tittle">
                                        ${wishlist.productName}
                                <p>
                                        ${wishlist.productDesc}
                                </p>
                                <span>
                                        Price: ${wishlist.productPrice}$
                                </span>
                                <div class="card-buttons d-flex justify-content-center">
                                <div>
                                    <button class="card-button">
                                        Add to Basket
                                    </button>
                                    <button data-item=${wishlist.id}  class="mt-1 card-button wishlist-remove_btn d-flex justify-content-center" >Remove from Wishlist</button>
                                    </div>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
                    `
                cardRow.innerHTML = a

                document.querySelectorAll(".wishlist-remove_btn").forEach(element => {
                    element.addEventListener("click", (e) => {
                        let selectedProductId = +e.target.getAttribute("data-item")
                        console.log(selectedProductId);
                        let deleteFromBasket = async () => {
                            let data = await fetch(`http://selony-env.eba-te9jpvdm.eu-north-1.elasticbeanstalk.com/wishlist/delete/${selectedProductId}?token=${localStorage.getItem("token")}`, {
                                method: "DELETE",
                            })
                        }
                        deleteFromBasket()

                    })
                })

            })
        })
}



fetchAllWishlists()