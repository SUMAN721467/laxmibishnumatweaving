<?php
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['email'])) {
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);

    // Your email where you want to receive the newsletter signups
    $to = "sukdev6294@gmail.com"; // replace this with your actual email
    $subject = "New Newsletter Subscription";
    $message = "New subscriber: " . $email;
    $headers = "From: no-reply@yourdomain.com";

    if (mail($to, $subject, $message, $headers)) {
        echo "Email sent!";
    } else {
        echo "Failed to send email.";
    }
} else {
    echo "Invalid request.";
}
?>
