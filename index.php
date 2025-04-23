<?php
session_start(); 
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Laxmi Bishnu Mat Weaving</title>
    <link rel="stylesheet" href="./src/style.css">
  </head>
  <body>
    <header class="header">
      <nav class="nav container">
        <a href="#" class="logo">Laxmi Bishnu Mat Weaving</a>
        <div class="nav-menu" id="nav-menu">
          <ul class="nav-list">
            <li><a href="#home" class="nav-link active">Home</a></li>
            <li><a href="#featured" class="nav-link">Featured</a></li>
            <li><a href="#categories" class="nav-link">Categories</a></li>
            <li><a href="#new" class="nav-link">New Arrivals</a></li>
            <?php
                if (isset($_SESSION['email'])) {
                    // User is logged in, show Logout
                    echo '<li><a href="./login/logout.php" id="loginBtn" class="nav-link">Logout</a></li>';
                } else {
                    // User is not logged in, show Login
                    echo '<li><a href="./login/login.html" id="loginBtn" class="nav-link">Login</a></li>';
                }
            ?>
          </ul>
          <div class="cart-icon" id="cart-icon">
            <span class="cart-count">0</span>
          </div>
        </div>
      </nav>
    </header>

    <main>
      <!-- Hero Section -->
      <section class="hero" id="home">
        <div class="hero-content container">
          <h1>Handcrafted Mats, Woven with Tradition</h1>
          <p>Discover our eco-friendly and traditional mat collections</p>
          <a href="#featured" class="cta-button">Shop Now</a>
        </div>
      </section>

      <!-- Featured Products -->
      <section class="featured section" id="featured">
        <h2 class="section-title">Featured Products</h2>
        <div class="products-grid container" id="featured-products">
          <!-- Products will be inserted here by JavaScript -->
        </div>
      </section>

      <!-- Categories -->
      <section class="categories section" id="categories">
        <h2 class="section-title">Shop by Category</h2>
        <div class="categories-grid container">
          <div class="category-card" style="background-image: url('https://images.meesho.com/images/products/333704658/my75d_512.webp')">
            <h3>Sleeping Mat</h3>
          </div>
          <div class="category-card" style="background-image: url('https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRxxFWzdwof5TQwilquLCAU1uRKjHyRMkyIibabXzQUvlCBH0UZ_DsFQsZO9tiAci_RO-50c5K43xDEEnaqc-ExodKAvRddnPSnDyziERio4kL891rKSAGFOg')">
            <h3>Wall Pocket</h3>
          </div>
          <div class="category-card" style="background-image: url('https://m.media-amazon.com/images/I/91DwveC7dlL._SL1500_.jpg')">
            <h3>Certain</h3>
          </div>
        </div>
      </section>

      <!-- New Arrivals -->
      <section class="new-arrivals section" id="new">
        <h2 class="section-title">New Arrivals</h2>
        <div class="products-grid container" id="new-products">
          <!-- Products will be inserted here by JavaScript -->
        </div>
      </section>

      <!-- Newsletter -->
      <section class="newsletter section">
        <div class="container">
          <h2 class="section-title">Subscribe to Our Newsletter</h2>
          <form id="newsletter-form" class="newsletter-form">
            <input type="email" placeholder="Enter your email" required>
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </section>
    </main>

    <!-- Product Modal -->
    <div class="modal" id="product-modal">
      <div class="modal-content">
        <span class="modal-close">&times;</span>
        <div class="modal-body" id="modal-body">
          <!-- Product details will be inserted here -->
        </div>
      </div>
    </div>

    <footer class="footer">
      <div class="container">
        <p>&copy; 2024 ShopStyle. All rights reserved.</p>
      </div>
    </footer>

    <script type="module" src="./src/main.js"></script>
  </body>
</html>