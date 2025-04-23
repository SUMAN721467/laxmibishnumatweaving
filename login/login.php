<?php
    session_start(); // Start session 
    include 'db.php';

    if($_SERVER['REQUEST_METHOD'] == "POST") {
        $email = $_POST["email"];
        $password = $_POST["password"];

        $query = "SELECT name FROM users WHERE email = '$email' AND password = '$password'";

        $result = mysqli_query($conn,$query);

        //for row return if any Query exits
        if (mysqli_num_rows($result) == 1) {//This checks if the query returned exactly one row.
            $row = mysqli_fetch_assoc($result);
            // Create session variables
            $_SESSION['email'] = $email;
            $_SESSION['name'] = $row['name'];

            header("Location: ../index.php");
            exit();
        } else {
            
            echo "Invalid email or password.".'<button onclick="javascript.history.back()">Go Back</button>';
        }
    }
?>