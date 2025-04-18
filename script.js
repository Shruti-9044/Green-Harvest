// Load navbar
document.addEventListener("DOMContentLoaded", () => {
  fetch("navbar.html")
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to load navbar");
      }
      return response.text();
    })
    .then(data => {
      document.getElementById("navbar").innerHTML = data;
    })
    .catch(error => {
      console.error("Error loading navbar:", error);
    });
});

// Load footer
document.addEventListener("DOMContentLoaded", () => {
  fetch("footer.html")
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to load footer");
      }
      return response.text();
    })
    .then(data => {
      document.getElementById("footer").innerHTML = data;
    })
    .catch(error => {
      console.error("Error loading navbar:", error);
    });
});


// cart and payment method
let cart = JSON.parse(localStorage.getItem('cart')) || [];
document.querySelectorAll('.add-to-cart').forEach(button => {
  const name = button.dataset.name;

  // If already added, disable and change text
  const existing = cart.find(item => item.name === name);
  if (existing) {
    button.textContent = 'Added';
    button.disabled = true;
    button.classList.add('added');
  }

  button.addEventListener('click', () => {
    const price = parseFloat(button.dataset.price);
    const img = button.dataset.img;

    cart.push({ name, price, img, quantity: 1 });
    localStorage.setItem('cart', JSON.stringify(cart));

    button.textContent = 'Added';
    button.disabled = true;
    button.classList.add('added');
  });
});

