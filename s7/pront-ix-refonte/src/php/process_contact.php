<?php
// Inclure un fichier de configuration pour l'email de destination si nécessaire
// include_once '../../includes/config.php';

// Définit l'email de destination pour les messages
define('CONTACT_EMAIL', 'contact@pront-ix.com'); // Remplacez par l'email réel de Pront-IX

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Nettoyage et validation des entrées
    $name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
    $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
    $subject = filter_input(INPUT_POST, 'subject', FILTER_SANITIZE_STRING);
    $message = filter_input(INPUT_POST, 'message', FILTER_SANITIZE_STRING);

    // Validation côté serveur
    if (empty($name) || empty($email) || empty($subject) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        // Rediriger avec un message d'erreur de validation
        header("Location: ../../public/index.php?status=validation_error#contact");
        exit();
    }

    // Préparation de l'email
    $to = CONTACT_EMAIL;
    $email_subject = "Nouveau message de contact de Pront-IX: " . $subject;
    $email_body = "Vous avez reçu un nouveau message via le formulaire de contact de votre site web.\n\n";
    $email_body .= "Nom: " . $name . "\n";
    $email_body .= "Email: " . $email . "\n";
    $email_body .= "Sujet: " . $subject . "\n";
    $email_body .= "Message:\n" . $message . "\n";

    $headers = "From: no-reply@pront-ix.com\r\n"; // Remplacez par une adresse e-mail valide de votre domaine
    $headers .= "Reply-To: " . $email . "\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    // Envoi de l'email
    if (mail($to, $email_subject, $email_body, $headers)) {
        // Succès : rediriger vers la page d'accueil avec un paramètre de succès
        header("Location: ../../public/index.php?status=success#contact");
        exit();
    } else {
        // Échec : rediriger vers la page d'accueil avec un paramètre d'erreur
        header("Location: ../../public/index.php?status=error#contact");
        exit();
    }
} else {
    // Si la requête n'est pas POST, rediriger simplement vers la page d'accueil
    header("Location: ../../public/index.php");
    exit();
}
?>