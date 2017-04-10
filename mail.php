<?php
$to = 'info@snaxs.io';
$subject = $_GET['subject'];
$message = $_GET['message'];
$headers = 'From: info@snaxs.io'. "\r\n" . 'Reply-To: '.$_GET['email']. "\r\n" . "Content-type: text/plain; charset=UTF-8" . "\r\n" . 'X-Mailer: PHP/' . phpversion()."\r\n";
$ok = mail($to, $subject, $message, $headers);
$okk = mail($_GET['email'], $subject, $message, $headers);
if ( $ok && $okk ) {
    echo "sent";
} else {
    echo "error";
}
?>