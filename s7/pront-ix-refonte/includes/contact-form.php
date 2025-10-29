<section id="contact" class="py-16 md:py-24 bg-white">
    <div class="container mx-auto px-6">
        <h2 class="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">Contactez-nous</h2>
        <p class="text-lg text-center mb-10 text-gray-700 max-w-2xl mx-auto">
            Transformez votre potentiel en expertise. [cite_start]Inscrivez-vous dès aujourd'hui ! [cite: 144]
            Contactez-nous pour toute question ou demande de renseignements. Nous vous répondrons dans les plus brefs délais.
        </p>

        <div class="max-w-xl mx-auto bg-gray-50 p-8 rounded-lg shadow-lg border border-gray-200">
            <?php
            // Affichage des messages de succès ou d'erreur
            if (isset($_GET['status'])) {
                if ($_GET['status'] == 'success') {
                    echo '<div class="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6" role="alert">
                            <p class="font-bold">Succès !</p>
                            <p>Votre message a été envoyé avec succès. Nous vous répondrons bientôt.</p>
                          </div>';
                } elseif ($_GET['status'] == 'error') {
                    echo '<div class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
                            <p class="font-bold">Erreur !</p>
                            <p>Une erreur est survenue lors de l\'envoi de votre message. Veuillez réessayer.</p>
                          </div>';
                } elseif ($_GET['status'] == 'validation_error') {
                    echo '<div class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
                            <p class="font-bold">Erreur de validation !</p>
                            <p>Veuillez remplir tous les champs obligatoires et vérifier le format de l\'e-mail.</p>
                          </div>';
                }
            }
            ?>
            <form action="/src/php/process_contact.php" method="POST" class="space-y-6">
                <div>
                    <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
                    <input type="text" id="name" name="name" required
                           class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                </div>
                <div>
                    <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Adresse Email</label>
                    <input type="email" id="email" name="email" required
                           class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                </div>
                <div>
                    <label for="subject" class="block text-sm font-medium text-gray-700 mb-1">Sujet</label>
                    <input type="text" id="subject" name="subject" required
                           class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                </div>
                <div>
                    <label for="message" class="block text-sm font-medium text-gray-700 mb-1">Votre Message</label>
                    <textarea id="message" name="message" rows="5" required
                              class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"></textarea>
                </div>
                <div class="text-center">
                    <button type="submit" class="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                        Envoyer le Message
                    </button>
                </div>
            </form>
        </div>
    </div>
</section>