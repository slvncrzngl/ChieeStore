// --- Get game name from localStorage ---
const gameName = localStorage.getItem("gameName") || "Game"
const gameTitle = document.getElementById("gameTitle")
if(gameTitle) gameTitle.innerText = gameName

// --- Diamond packages with icons ---
const packages = [
  {diamond:86, price:49, icon:"assets/diamond1.png"},
  {diamond:172, price:95, icon:"assets/diamond2.png"},
  {diamond:257, price:140, icon:"assets/diamond3.png"},
  {diamond:514, price:270, icon:"assets/diamond4.png"},
  {diamond:706, price:360, icon:"assets/diamond5.png"}
]

// --- Display packages dynamically ---
const packagesDiv = document.getElementById("packages")
let selectedPackage = null

if(packagesDiv){
  packagesDiv.innerHTML = "" // Clear container
  packages.forEach(p=>{
    const div = document.createElement("div")
    div.classList.add("package-item")
    div.innerHTML = `
      <img src="${p.icon}" width="40" alt="Diamond Icon">
      <div class="text">
        <span class="diamond">${p.diamond} Diamonds</span>
        <span class="price">₱${p.price}</span>
      </div>
    `
    div.onclick = ()=>{
      selectedPackage = p
      alert(`${p.diamond} Diamonds selected 🌸`)
    }
    packagesDiv.appendChild(div)
  })
}

// --- Continue to Checkout ---
const checkoutBtn = document.getElementById("checkoutBtn")
if(checkoutBtn){
  checkoutBtn.onclick = ()=>{
    const player = document.getElementById("playerID").value
    if(!player){ alert("Please enter Player ID"); return }
    if(!selectedPackage){ alert("Please select a package"); return }

    // Save selection for checkout page
    localStorage.setItem("playerID", player)
    localStorage.setItem("selectedPackage", JSON.stringify(selectedPackage))

    // Go to checkout
    window.location = "checkout.html"
  }
}

// --- Checkout page logic ---
const summaryDiv = document.getElementById("summary")
if(summaryDiv){
  const player = localStorage.getItem("playerID")
  const pack = JSON.parse(localStorage.getItem("selectedPackage"))

  summaryDiv.innerHTML = `
    Player: ${player} <br>
    Diamonds: ${pack.diamond} <br>
    Price: ₱${pack.price}
  `

  const placeOrderBtn = document.getElementById("placeOrderBtn")
  if(placeOrderBtn){
    placeOrderBtn.onclick = ()=>{
      const payment = document.getElementById("payment").value
      alert(`Order Placed!\nPlayer: ${player}\n${pack.diamond} Diamonds\nPayment: ${payment} 🌸`)
      window.location = "index.html"
    }
  }
}