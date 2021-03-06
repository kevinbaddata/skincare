$("#homepage .owl-carousel").owlCarousel({
  autoplay: true,
  lazyLoad: true,
  rewind: true,
  responsiveClass: true,
  autoHeight: true,
  dots: false,
  responsive: {
    0: {
      items: 1,
    },

    600: {
      items: 1,
    },

    1024: {
      items: 1,
    },

    1366: {
      items: 1,
    },
  },
});

$("#hairpage .owl-carousel").owlCarousel({
  autoplay: true,
  lazyLoad: true,
  rewind: true,
  responsiveClass: true,
  autoHeight: true,
  dots: false,
  maxHeight: 80,
  responsive: {
    0: {
      items: 1,
    },

    600: {
      items: 2,
    },

    1024: {
      items: 3,
    },

    1366: {
      items: 4,
    },
  },
});
$(".comments  .owl-carousel").owlCarousel({
  autoplay: true,
  lazyLoad: true,
  rewind: true,
  responsiveClass: true,
  autoHeight: true,
  responsive: {
    0: {
      items: 1,
    },

    600: {
      items: 1,
    },

    1024: {
      items: 1,
    },

    1366: {
      items: 1,
    },
  },
});

$(".cart-icon").click(function () {
  $("#cart").css("width", "100%");
  $("#cart").css("display", "flex");
});

$(".close").click(function () {
  $("#cart").css("display", "none");
});

var shoppingCart = (function () {
  // =============================
  // Private methods and propeties
  // =============================

  cart = [];

  // Constructor
  function Item(name, price, count) {
    this.name = name;
    this.price = price;
    this.count = count;
  }

  // Save cart
  function saveCart() {
    sessionStorage.setItem("shoppingCart", JSON.stringify(cart));
  }

  // Load cart
  function loadCart() {
    cart = JSON.parse(sessionStorage.getItem("shoppingCart"));
  }
  if (sessionStorage.getItem("shoppingCart") != null) {
    loadCart();
  }

  // =============================
  // Public methods and propeties
  // =============================
  var obj = {};

  // Add to cart
  obj.addItemToCart = function (name, price, count) {
    for (var item in cart) {
      if (cart[item].name === name) {
        cart[item].count++;
        saveCart();
        return;
      }
    }
    var newItem = new Item(name, price, count);
    cart.push(newItem);
    saveCart();
  };
  // Set count from item
  obj.setCountForItem = function (name, count) {
    for (var i in cart) {
      if (cart[i].name === name) {
        cart[i].count = count;
        break;
      }
    }
  };
  // Remove item from cart
  obj.removeItemFromCart = function (name) {
    for (var item in cart) {
      if (cart[item].name === name) {
        cart[item].count--;
        if (cart[item].count === 0) {
          cart.splice(item, 1);
        }
        break;
      }
    }
    saveCart();
  };

  // Remove all items from cart
  obj.removeItemFromCartAll = function (name) {
    for (var item in cart) {
      if (cart[item].name === name) {
        cart.splice(item, 1);
        break;
      }
    }
    saveCart();
  };

  // Clear cart
  obj.clearCart = function () {
    cart = [];
    saveCart();
  };

  // Count cart
  obj.totalCount = function () {
    var totalCount = 0;
    for (var item in cart) {
      if (cart.hasOwnProperty(item)) {
        totalCount += cart[item].count;
      }
    }
    return totalCount;
  };

  // Total cart
  obj.totalCart = function () {
    var totalCart = 0;
    for (var item in cart) {
      if (cart.hasOwnProperty(item)) {
        totalCart += cart[item].price * cart[item].count;
      }
    }
    return Number(totalCart.toFixed(2));
  };

  // List cart
  obj.listCart = function () {
    var cartCopy = [];
    for (var i in cart) {
      if (cart.hasOwnProperty(i)) {
        item = cart[i];
        itemCopy = {};
        for (var p in item) {
          if (item.hasOwnProperty(p)) {
            itemCopy[p] = item[p];
          }
        }
        itemCopy.total = Number(item.price * item.count).toFixed(2);
        cartCopy.push(itemCopy);
      }
    }
    return cartCopy;
  };

  // cart : Array
  // Item : Object/Class
  // addItemToCart : Function
  // removeItemFromCart : Function
  // removeItemFromCartAll : Function
  // clearCart : Function
  // countCart : Function
  // totalCart : Function
  // listCart : Function
  // saveCart : Function
  // loadCart : Function
  return obj;
})();

// ***************
// Triggers / Events
// ***************
// Add item
$(".add-to-cart").click(function (event) {
  event.preventDefault();
  var name = $(this).data("name");
  var price = Number($(this).data("price"));
  shoppingCart.addItemToCart(name, price, 1);
  displayCart();
});

// Clear items
$(".clear-cart").click(function () {
  shoppingCart.clearCart();
  displayCart();
});

function displayCart() {
  var cartArray = shoppingCart.listCart();
  var output = "";
  for (var i in cartArray) {
    if (cartArray.hasOwnProperty(i)) {
      output +=
        "<tr>" +
        "<td>" +
        cartArray[i].name +
        "</td>" +
        "<td>(" +
        cartArray[i].price +
        ")</td>" +
        "<td><div class='input-group'><button class='minus-item input-group-addon btn btn-primary' data-name=" +
        cartArray[i].name +
        ">-</button>" +
        "<input type='number' class='item-count form-control' data-name='" +
        cartArray[i].name +
        "' value='" +
        cartArray[i].count +
        "'>" +
        "<button class='plus-item btn btn-primary input-group-addon' data-name=" +
        cartArray[i].name +
        ">+</button></div></td>" +
        "<td><button class='delete-item btn btn-danger bg-danger px-4' data-name=" +
        cartArray[i].name +
        ">Remove</button></td>" +
        " = " +
        "<td>" +
        cartArray[i].total +
        "</td>" +
        "</tr>";
    }
  }
  $(".show-cart").html(output);
  $(".total-cart").html(shoppingCart.totalCart());
  $(".total-count").html(shoppingCart.totalCount());
}

// Delete item button

$(".show-cart").on("click", ".delete-item", function (event) {
  var name = $(this).data("name");
  shoppingCart.removeItemFromCartAll(name);
  displayCart();
});

// -1
$(".show-cart").on("click", ".minus-item", function (event) {
  var name = $(this).data("name");
  shoppingCart.removeItemFromCart(name);
  displayCart();
});
// +1
$(".show-cart").on("click", ".plus-item", function (event) {
  var name = $(this).data("name");
  shoppingCart.addItemToCart(name);
  displayCart();
});

// Item count input
$(".show-cart").on("change", ".item-count", function (event) {
  var name = $(this).data("name");
  var count = Number($(this).val());
  shoppingCart.setCountForItem(name, count);
  displayCart();
});

displayCart();
