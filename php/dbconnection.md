> ## config.php

```php
<?php

define("HOST", "localhost:3307");
define("DBNAME", "restaurant");
define("USER", "root");
define("PASSWORD", "");

```

> ## App.php

```php

<?php

class App
{
  public $host = HOST;
  public $dbname = DBNAME;
  public $user = USER;
  public $password = PASSWORD;

  public $link;

  public function __construct()
  {
    $this->connect();
  }

  public function connect()
  {
    $this->link = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->dbname, $this->user, $this->password);
    if ($this->link) {
      echo "Connection successful";
    }
  }


  // fetch all data
  public function selectAll($query)
  {
    $allRows = $this->link->query($query);
    $allRows->execute();
    $allRows->fetchAll(PDO::FETCH_OBJ);

    if ($allRows) {
      return $allRows;
    } else {
      return false;
    }
  }

  // fetch single data
  public function selectSingle($query)
  {
    $singleRow = $this->link->query($query);
    $singleRow->execute();
    $singleRow->fetch(PDO::FETCH_OBJ);

    if ($singleRow) {
      return $singleRow;
    } else {
      return false;
    }
  }

  // validate input is empty or not
  public function validate($arr)
  {
    if (in_array("", $arr)) {
      echo "Please fill all the fields";
    }
  }

  // insert data

  public function insert($query, $arr, $path)
  {
    if ($this->validate($arr) == "empty") {
      echo "<script>alert('one or more fields are empty')</script>";
    } else {
      $insert_one = $this->link->prepare($query);
      $insert_one->execute($arr);
      // after inserting back to this given path
      header("location:" . $path);
    }
  }
  // update data

  public function update($query, $arr, $path)
  {
    if ($this->validate($arr) == "empty") {
      echo "<script>alert('one or more fields are empty')</script>";
    } else {
      $update_one = $this->link->prepare($query);
      $update_one->execute($arr);

      header("location:" . $path);
    }
  }
  // delete data

  public function delete($query, $path)
  {

    $delete = $this->link->query($query);
    $delete->execute();

    header("location:" . $path);
  }

  // register user

  public function register($query, $arr, $path)
  {
    if ($this->validate($arr) == "empty") {
      echo "<script>alert('one or more fields are empty')</script>";
    } else {
      $register_user = $this->link->prepare($query);
      $register_user->execute($arr);
      // after inserting back to this given path
      header("location:" . $path);
    }
  }

  // login user

  public function login($query, $data, $path)
  {
    $login_user = $this->link->query($query);
    $login_user->execute();
    $fetch = $login_user->fetch(PDO::FETCH_ASSOC);
    if ($login_user->rowCount() > 0) {

      if (password_verify($data['password'], $fetch['password'])) {
        header("location:" . $path);
      }
    }
  }

  // starting session
  public function startingSession()
  {
    session_start();
  }

  // validating session
  // it is for checking that user is logged in or not
  // it is necessary. because if the user is logged in
  // then we will not allow them to access login or register page
  // they can only access this page if they are logged out

  // here $path is the path where we want to redirect the user
  // if it is the index page then we will pass it when calling the functon
  public function validateSession($path)
  {
    if (isset($_SESSION['id'])) {
      header("location:" . $path);
    }
  }
}
```

> ## index.php

```php
// header er top a url set kora hobe cz header sob jaygay e use hobe and er jonne alada kore sob jaygay globally define kore dit hobe na.
// check header file's first line
<?php require "../config/config.php" ?>
<?php require "../libs/App.php" ?>
<?php require "../includes/header.php" ?>


<!-- register functionality -->

<?php

$app = new App;

if (isset($_POST["submit"])) {
    $username = $_POST["username"];
    $email = $_POST["email"];
    $password = password_hash($_POST["password"], PASSWORD_DEFAULT);

    $query = "INSERT INTO users (username, email, password) VALUES (:username, :email,:password)";

    $arr = [":username" => $username, ":email" => $email, ":password" => $password];

    $path="login.php";

    $app->register($query, $arr, $path);
}

?>



<div class="container-xxl py-5 bg-dark hero-header mb-5">
    <div class="container text-center my-5 pt-5 pb-4">
        <h1 class="display-3 text-white mb-3 animated slideInDown">Registeration</h1>
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb justify-content-center text-uppercase">
                <li class="breadcrumb-item"><a href="#">Home</a></li>
                <li class="breadcrumb-item"><a href="#">Register</a></li>
            </ol>
        </nav>
    </div>
</div>
</div>
<!-- Navbar & Hero End -->


<!-- Service Start -->
<div class="container">

    <div class="col-md-12 bg-dark">
        <div class="p-5 wow fadeInUp" data-wow-delay="0.2s">
            <h5 class="section-title ff-secondary text-start text-primary fw-normal">Register</h5>
            <h1 class="text-white mb-4">Register for a new user</h1>
            <form action="register.php" method="POST" class="col-md-12">
                <div class="row g-3">
                    <div class="">
                        <div class="form-floating">
                            <input name="username" type="text" class="form-control" id="name" placeholder="Your Name">
                            <label for="name">Username</label>
                        </div>
                    </div>
                    <div class="">
                        <div class="form-floating">
                            <input name="email" type="email" class="form-control" id="email" placeholder="Your Email">
                            <label for="email">Your Email</label>
                        </div>
                    </div>
                    <div class="">
                        <div class="form-floating">
                            <input name="password" type="password" class="form-control" id="email" placeholder="Your Email">
                            <label for="password">Password</label>
                        </div>
                    </div>



                    <div class="col-md-12">
                        <button name="submit" class="btn btn-primary w-100 py-3" type="submit">Register</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
<!-- Service End -->

<?php require "../includes/footer.php" ?>
```

> ## header.php

```php
<?php
// defining global constants
define("APPURL", "http://localhost/restaurant_app");
?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <title>Restoran - Bootstrap Restaurant Template</title>
  <meta content="width=device-width, initial-scale=1.0" name="viewport">
  <meta content="" name="keywords">
  <meta content="" name="description">

  <!-- Favicon -->
  <link href="img/favicon.ico" rel="icon">

  <!-- Google Web Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Heebo:wght@400;500;600&family=Nunito:wght@600;700;800&family=Pacifico&display=swap" rel="stylesheet">

  <!-- Icon Font Stylesheet -->
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css" rel="stylesheet">

  <!-- Libraries Stylesheet -->
  <link href="<?php echo APPURL ?>/lib/animate/animate.min.css" rel="stylesheet">
  <link href="<?php echo APPURL ?>/lib/owlcarousel/assets/owl.carousel.min.css" rel="stylesheet">
  <link href="<?php echo APPURL ?>/lib/tempusdominus/css/tempusdominus-bootstrap-4.min.css" rel="stylesheet" />

  <!-- Customized Bootstrap Stylesheet -->
  <link href="<?php echo APPURL ?>/css/bootstrap.min.css" rel="stylesheet">

  <!-- Template Stylesheet -->
  <link href="<?php echo APPURL ?>/css/style.css" rel="stylesheet">
</head>

<body>
  <div class="container-xxl bg-white p-0">
    <!-- Spinner Start -->
    <div id="spinner" class="show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center">
      <div class="spinner-border text-primary" style="width: 3rem; height: 3rem;" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    <!-- Spinner End -->


    <!-- Navbar & Hero Start -->
    <div class="container-xxl position-relative p-0">
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-4 px-lg-5 py-3 py-lg-0">
        <a href="" class="navbar-brand p-0">
          <h1 class="text-primary m-0"><i class="fa fa-utensils me-3"></i>Restoran</h1>
          <!-- <img src="img/logo.png" alt="Logo"> -->
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
          <span class="fa fa-bars"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse">
          <div class="navbar-nav ms-auto py-0 pe-4">
            <a href="index.html" class="nav-item nav-link active">Home</a>
            <a href="about.html" class="nav-item nav-link">About</a>
            <a href="service.html" class="nav-item nav-link">Service</a>
            <a href="menu.html" class="nav-item nav-link">Menu</a>
            <a href="cart.html" class="nav-item nav-link"><i class="fa-sharp fa-solid fa-cart-shopping"></i>Cart</a>


            <a href="contact.html" class="nav-item nav-link">Contact</a>
            <a href="login.html" class="nav-item nav-link">Login</a>
            <a href="register.html" class="nav-item nav-link">Register</a>
          </div>

        </div>
      </nav>
```

> ## footer.php

```php
<!-- Footer Start -->
<div class="container-fluid bg-dark text-light footer pt-5 mt-5 wow fadeIn" data-wow-delay="0.1s">
    <div class="container py-5">
        <div class="row g-5">
            <div class="col-lg-3 col-md-6">
                <h4 class="section-title ff-secondary text-start text-primary fw-normal mb-4">Company</h4>
                <a class="btn btn-link" href="">About Us</a>
                <a class="btn btn-link" href="">Contact Us</a>
                <a class="btn btn-link" href="">Reservation</a>
                <a class="btn btn-link" href="">Privacy Policy</a>
                <a class="btn btn-link" href="">Terms & Condition</a>
            </div>
            <div class="col-lg-3 col-md-6">
                <h4 class="section-title ff-secondary text-start text-primary fw-normal mb-4">Contact</h4>
                <p class="mb-2"><i class="fa fa-map-marker-alt me-3"></i>123 Street, New York, USA</p>
                <p class="mb-2"><i class="fa fa-phone-alt me-3"></i>+012 345 67890</p>
                <p class="mb-2"><i class="fa fa-envelope me-3"></i>info@example.com</p>
                <div class="d-flex pt-2">
                    <a class="btn btn-outline-light btn-social" href=""><i class="fab fa-twitter"></i></a>
                    <a class="btn btn-outline-light btn-social" href=""><i class="fab fa-facebook-f"></i></a>
                    <a class="btn btn-outline-light btn-social" href=""><i class="fab fa-youtube"></i></a>
                    <a class="btn btn-outline-light btn-social" href=""><i class="fab fa-linkedin-in"></i></a>
                </div>
            </div>
            <div class="col-lg-3 col-md-6">
                <h4 class="section-title ff-secondary text-start text-primary fw-normal mb-4">Opening</h4>
                <h5 class="text-light fw-normal">Monday - Saturday</h5>
                <p>09AM - 09PM</p>
                <h5 class="text-light fw-normal">Sunday</h5>
                <p>10AM - 08PM</p>
            </div>
            <div class="col-lg-3 col-md-6">
                <h4 class="section-title ff-secondary text-start text-primary fw-normal mb-4">Newsletter</h4>
                <p>Dolor amet sit justo amet elitr clita ipsum elitr est.</p>
                <div class="position-relative mx-auto" style="max-width: 400px;">
                    <input class="form-control border-primary w-100 py-3 ps-4 pe-5" type="text" placeholder="Your email">
                    <button type="button" class="btn btn-primary py-2 position-absolute top-0 end-0 mt-2 me-2">SignUp</button>
                </div>
            </div>
        </div>
    </div>
    <div class="container">
        <div class="copyright">
            <div class="row">
                <div class="col-md-6 text-center text-md-start mb-3 mb-md-0">
                    &copy; <a class="border-bottom" href="#">Your Site Name</a>, All Right Reserved.

                    <!--/*** This template is free as long as you keep the footer author’s credit link/attribution link/backlink. If you'd like to use the template without the footer author’s credit link/attribution link/backlink, you can purchase the Credit Removal License from "https://htmlcodex.com/credit-removal". Thank you for your support. ***/-->
                    Designed By <a class="border-bottom" href="https://htmlcodex.com">HTML Codex</a><br><br>
                    Distributed By <a class="border-bottom" href="https://themewagon.com" target="_blank">ThemeWagon</a>
                </div>
                <div class="col-md-6 text-center text-md-end">
                    <div class="footer-menu">
                        <a href="">Home</a>
                        <a href="">Cookies</a>
                        <a href="">Help</a>
                        <a href="">FQAs</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- Footer End -->


<!-- Back to Top -->
<a href="#" class="btn btn-lg btn-primary btn-lg-square back-to-top"><i class="bi bi-arrow-up"></i></a>
</div>

<!-- JavaScript Libraries -->
<script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/js/bootstrap.bundle.min.js"></script>
<script src="<?php echo APPURL ?>/lib/wow/wow.min.js"></script>
<script src="<?php echo APPURL ?>/lib/easing/easing.min.js"></script>
<script src="<?php echo APPURL ?>/lib/waypoints/waypoints.min.js"></script>
<script src="<?php echo APPURL ?>/lib/counterup/counterup.min.js"></script>
<script src="<?php echo APPURL ?>/lib/owlcarousel/owl.carousel.min.js"></script>
<script src="<?php echo APPURL ?>/lib/tempusdominus/js/moment.min.js"></script>
<script src="<?php echo APPURL ?>/lib/tempusdominus/js/moment-timezone.min.js"></script>
<script src="<?php echo APPURL ?>/lib/tempusdominus/js/tempusdominus-bootstrap-4.min.js"></script>

<!-- Template Javascript -->
<script src="<?php echo APPURL ?>/js/main.js"></script>
</body>

</html>
```
