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
    if (!isset($_POST['rs']) or empty($_POST['rs'])) {
        header("HTTP/1.0 400 Bad Request");
        echo "Pour que nous puissions vous identifier, merci de mentionner votre raison sociale.";
    } elseif (!isset($_POST['replyTo']) or empty($_POST['replyTo']) or preg_match('#^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,6}$#', $_POST['replyTo'])) {
        header("HTTP/1.0 400 Bad Request");
        echo "Pour que nous puissions vous répondre, merci mentionner une adresse mail valide.";
    } elseif (!isset($_POST['message']) or empty($_POST['message'])) {
        header("HTTP/1.0 400 Bad Request");
        echo "Pour que nous puissions vous informer, merci de préciser l'objet de votre message.";
    } else {
        // Récupération des paramètres de la requête
        $rs = $_POST['rs']; // Raison Sociale
        $replyTo = $_POST['replyTo']; // Messager à qui répondre
        $tel = isset($_POST['tel']) ? $_POST['tel'] : '';
        $message = $_POST['message'];

        // Le site est l'émetteur du mail
        $from = 'www@lardoisienne.fr';
        // info est le destinataire du mail
        $to = 'info@lardoisienne.fr';

        // Le sujet est construit avec la raison sociale et l'éventuel numéro de tel
        $subject = $rs;
        if (!empty($tel)) {
            $subject .= " ($tel)";
        }

        // message lines should not exceed 70 characters (PHP rule), so wrap it
        $message = wordwrap($message, 70);

        // On rajoute au message les coordonnées du messager
        $message .= "\n\n$rs\n";
        $message .= "mail : $replyTo\n";
        if (!empty($tel)) {
            $message .= "tel  : $tel\n";
        }

        // En-têtes
        $headers = "From: $from\n";
        $headers .= "Reply-To: $replyTo\n";

        // Emission du mail
        mail($to, $subject, $message, $headers);

        // Réponse
        echo "Merci pour votre message. Nous tenterons d'y répondre dans les plus brefs délais.";
    }
}

