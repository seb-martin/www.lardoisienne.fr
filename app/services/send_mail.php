<?php
// TODO Passage $stage = 'production'
$stage = 'development';

if($stage == 'development'){
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Max-Age: 3628800");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");
}


if($_SERVER['REQUEST_METHOD'] == 'POST'){
    if (!isset($_POST['rs']) or strlen($_POST['rs']) == 0) {
        header("HTTP/1.0 400 Bad Request");
        echo "Pour que nous puissions vous identifier, merci de mentionner votre raison sociale.";
    } elseif (!isset($_POST['from']) or strlen($_POST['from']) == 0) {
        header("HTTP/1.0 400 Bad Request");
        echo "Pour que nous puissions vous répondre, merci de mentionner votre adresse mail.";
    } elseif (!isset($_POST['message']) or strlen($_POST['message']) == 0) {
        header("HTTP/1.0 400 Bad Request");
        echo "Pour que nous puissions vous informer, merci de préciser l'objet de votre message.";
    } else {
        $rs = $_POST['rs']; // Raison Sociale
        $from = $_POST['from']; // sender
        $to = 'info@lardoisienne.fr';

        $subject = "[www.lardoisienne.fr] $rs";
        // Eventuel téléphone
        if (isset($_POST['tel']) and strlen($_POST['tel']) > 0) {
            $tel = $_POST['tel'];
            $subject .= " ($tel)";
        }

        $message = $_POST['message'];
        // message lines should not exceed 70 characters (PHP rule), so wrap it
        $message = wordwrap($message, 70);
        mail($to, $subject, $message, "From: $from");
        echo "Merci pour votre message. Nous tenterons d'y répondre dans les plus brefs délais.";
    }
}

