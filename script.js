let buttons = document.querySelectorAll(".btns button");
let cart = document.getElementById("cartItems");
let emptyMsg = document.getElementById("emptyMsg");
let totalAmount = document.getElementById("totalAmount");
let bookBtn = document.querySelector(".book-now input[type='submit']");
bookBtn.disabled = true;
let total = 0;
let count = 1;
buttons.forEach(function(btn){
    btn.addEventListener("click", function(){

        btn.classList.toggle("added");

        if(btn.classList.contains("added")){
            btn.innerHTML = `Remove item <ion-icon name="remove-circle-outline"></ion-icon>`;
            btn.style.color = "red";
            btn.style.backgroundColor = "rgb(239, 205, 205)";
        } else{
            btn.innerHTML = `Add item <ion-icon name="add-circle-outline"></ion-icon>`;
            btn.style.color = "initial";
            btn.style.backgroundColor = "#e6e6e6";
        }

        let name = btn.dataset.name;
        let price = parseInt(btn.dataset.price);

        if(btn.classList.contains("added")){
            bookBtn.disabled = false;
            emptyMsg.style.display = "none";
            let row = document.createElement("div");
            row.className = "cart-row";
            row.dataset.name = name;
            row.innerHTML = `
            <span>${count}</span>
            <span>${name}</span>
            <span>${price}.00</span>`;
            cart.appendChild(row);
            count++;
            total += price;
            totalAmount.innerText = "₹" + total + ".00";
            let fter = document.getElementById("fter");
            fter.style.display = "none";
        }
        else{
            let rows = document.querySelectorAll(".cart-row");
            rows.forEach(function(row){
                if(row.dataset.name === name){
                    row.remove();
                    total -= price;
                    totalAmount.innerText = "₹" + total + ".00";
                }
            });
            if(cart.children.length === 0){
                emptyMsg.style.display = "flex";
                count = 1;
                let fter = document.getElementById("fter");
                fter.style.display = "initial";
                bookBtn.disabled = true;
            }
            updateSerial();
        }
    });
});
function updateSerial(){
    let rows = document.querySelectorAll(".cart-row");
    count = 1;

    rows.forEach(function(row){
        row.children[0].innerText = count++;
    });
}

let form = document.querySelector("form");

form.addEventListener("submit",function(evt){
    evt.preventDefault();
    let booknow = document.querySelector(".book-now");
    let oldMsg = document.querySelector(".ftr");
    if(oldMsg){
        oldMsg.remove();
    }
    let newDiv = document.createElement("div");
    newDiv.innerHTML = `<ion-icon name="checkmark-circle-outline"></ion-icon> Email has been sent successfully`;
    newDiv.classList.add("ftr");
    booknow.appendChild(newDiv);
    form.reset();
    setTimeout(()=>{
        newDiv.classList.add("show");
    },10);
    setTimeout(()=>{
        newDiv.classList.add("hide");
    },2000);
    setTimeout(()=>{
        newDiv.remove();
    },2400);
});