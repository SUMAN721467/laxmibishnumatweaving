<?php
session_start();
include 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $email = $_POST["email"];
    $password = $_POST["password"];

    // Check for duplicate email
    $duplicateCheck = "SELECT email FROM users WHERE email = '$email'";
    $result = mysqli_query($conn, $duplicateCheck);

    if (mysqli_num_rows($result) > 0) {
        echo "Email already exists!".'<button onclick="javascript.history.back()">Go Back</button>
';
    } else {
        $query = "INSERT INTO users (name, email, password) VALUES ('$name', '$email', '$password')";

        if (mysqli_query($conn, $query)) {
            echo "Register Successfully".'<button onclick="javascript.history.back()">Go Back</button>
';
        } else {
            echo "Error: " . mysqli_error($conn);
        }
    }

} else {
    echo "Connection Requested  failed !".'<button onclick="javascript.history.back()">Go Back</button>
';
}
?>
