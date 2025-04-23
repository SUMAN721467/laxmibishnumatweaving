<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

include 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST["email"];
    echo "Received email: $email<br>";

    $query = "SELECT id FROM users WHERE email = '$email'";
    $result = mysqli_query($conn, $query);

    if (!$result) {
        echo "Query error: " . mysqli_error($conn);
        exit;
    }

    if (mysqli_num_rows($result) == 1) {
        echo "Reset link sent to $email (simulated).";
    } else {
        echo "No user found with this email.";
    }
}
?>
