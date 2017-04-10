<?php
$to = 'sales@snaxs.io';
$subject = $_GET['subject'];
$message = $_GET['message'];
$headers = 'From: sales@snaxs.io'. "\r\n" . 'Reply-To: '.$_GET['email']. "\r\n" . "Content-type: text/plain; charset=UTF-8" . "\r\n" . 'X-Mailer: PHP/' . phpversion()."\r\n";
$ok = mail($to, $subject, $message, $headers);
if ( $ok ) {
    echo "sent";
} else {
    echo "error";
}
?>