<?php
session_start(); 
?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Your Cart - ShopStyle</title>
    <link rel="stylesheet" href="./src/style.css" />
  </head>
  <body>
    <header class="header">
      <nav class="nav container">
        <a href="./index.php" class="logo">Laxmi Bishnu Mat Weaving</a>
        <div class="nav-menu" id="nav-menu">
          <ul class="nav-list">
            <li><a href="./index.php" class="nav-link">Home</a></li>
            <li><a href="./index.php#featured" class="nav-link">Featured</a></li>
            <li><a href="./index.php#categories" class="nav-link">Categories</a></li>
            <li><a href="./index.php#new" class="nav-link">New Arrivals</a></li>
            <?php
                if (isset($_SESSION['email'])) {
                    // User is logged in, show Logout
                    echo '<li><a href="./login/logout.php" class="nav-link">Logout</a></li>';
                } else {
                    // User is not logged in, show Login
                    echo '<li><a href="./login/login.html" class="nav-link">Login</a></li>';
                }
            ?>
          </ul>
          </ul>
          <div class="cart-icon" id="cart-icon">
            <span class="cart-count">0</span>
          </div>
        </div>
      </nav>
    </header>

    <main>
      <section class="cart section" id="cart">
        <h2 class="section-title">Your Cart</h2>
        <div class="container">
          <div class="cart-items" id="cart-items">
            <!-- Cart items will be inserted here by JavaScript -->
          </div>
          <div class="cart-summary">
            <h3 class="cart-total">Total: ₹<span id="cart-total">0.00</span></h3>
            <button class="purchase-button" id="purchase-button"><a href="https://rzp.io/rzp/5pPem6WS" style="text-decoration: none; color:white;" >Purchase</a></button>
          </div>
        </div>
      </section>
    </main>

    <footer class="footer">
      <div class="container">
        <p>&copy; 2024 ShopStyle. All rights reserved.</p>
      </div>
    </footer>

    <script src="./src/main.js"></script>
  </body>
</html>