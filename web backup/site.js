var MENU_MOBILE_MAX = 800;

function menutoggle() {
  if (window.innerWidth > MENU_MOBILE_MAX) return;
  var menu = document.getElementById("MenuItems");
  if (menu) menu.classList.toggle("menu-open");
}

function closeMobileMenuIfDesktop() {
  if (window.innerWidth > MENU_MOBILE_MAX) {
    var menu = document.getElementById("MenuItems");
    if (menu) menu.classList.remove("menu-open");
  }
}

function addItemToCart(item) {
  var cart = JSON.parse(localStorage.getItem("cartItems")) || [];
  var qty = Math.max(1, Number(item.quantity) || 1);
  var existing = cart.find(function (i) {
    return i.name === item.name;
  });
  if (existing) {
    existing.quantity += qty;
  } else {
    cart.push({
      name: item.name,
      price: Number(item.price),
      image: item.image,
      quantity: qty
    });
  }
  localStorage.setItem("cartItems", JSON.stringify(cart));
}

window.addEventListener("resize", closeMobileMenuIfDesktop);

document.addEventListener("DOMContentLoaded", function () {
  closeMobileMenuIfDesktop();

  document.querySelectorAll(".buy-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      addItemToCart({
        name: btn.dataset.name,
        price: btn.dataset.price,
        image: btn.dataset.image,
        quantity: 1
      });
      window.location.href = "cart.html";
    });
  });

  var detailBtn = document.getElementById("detailAddToCart");
  if (detailBtn) {
    detailBtn.addEventListener("click", function () {
      var qtyInput = document.getElementById("productQty");
      var qty = qtyInput ? parseInt(qtyInput.value, 10) : 1;
      if (Number.isNaN(qty) || qty < 1) qty = 1;
      addItemToCart({
        name: detailBtn.dataset.name,
        price: detailBtn.dataset.price,
        image: detailBtn.dataset.image,
        quantity: qty
      });
      window.location.href = "cart.html";
    });
  }
});
