<?php
// Inclure les fichiers de configuration ou de fonctions si nécessaire
// include_once '../includes/config.php';
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <?php include_once './includes/head.php'; // Inclut les meta tags, titre, liens CSS, etc. ?>
</head>
<body class="bg-gray-50 text-gray-900 antialiased">

    <?php include_once './includes/header.php'; // Inclut la navigation, logo, etc. ?>

    <main>
        <?php include_once './includes/hero-section.php'; // Section Héro captivante ?>
        <?php include_once './includes/features-section.php'; // Blocs de fonctionnalités/services ?>
        <?php include_once './includes/problem-solution-section.php'; // Nouvelle section Problème & Solution ?>
        <?php include_once './includes/ia-services-section.php'; // Section Services IA et Innovation ?>
        <?php include_once './includes/cloud-devops-section.php'; // Section Cloud, DevOps & Transformation Digitale ?>
        <?php include_once './includes/cybersecurity-section.php'; // Section Cybersécurité & Résilience Numérique ?>
        <?php include_once './includes/training-section.php'; // Section Formations d'Excellence ?>
        <?php include_once './includes/bootcamp-section.php'; // Section Bootcamp & Spécialisations ?>
        <?php include_once './includes/advanced-cybersecurity-section.php'; // Section Formations Cybersécurité Avancées ?>
        <?php include_once './includes/why-choose-us-section.php'; // Section Pourquoi choisir Pront-IX ?>
        <?php include_once './includes/testimonials-section.php'; // Témoignages clients (à implémenter si disponibles) ?>
        <?php include_once './includes/partners-section.php'; // Partenaires technologiques (à implémenter si disponibles) ?>
        <?php include_once './includes/contact-form.php'; // Formulaire de contact ?>
    </main>

    <?php include_once './includes/footer.php'; // Inclut le footer, scripts JS ?>

</body>
</html>