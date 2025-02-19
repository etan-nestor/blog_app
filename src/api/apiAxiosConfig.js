import axios from 'axios';


// Configuration de l'URL de base de l'API depuis l'environnement
const API_BASE_URL = 'http://localhost:5000/api';



// Création d'une instance Axios avec des configurations par défaut
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json', // Spécifie que le contenu envoyé est en JSON
    },
});

// Intercepteur global pour gérer les réponses et les erreurs de l'API
apiClient.interceptors.response.use(
    (response) => response, // Retourne la réponse si tout est correct
    (error) => {
        // Traitement global des erreurs de l'API
        console.error('API Error:', error); // Affiche l'erreur dans la console
        return Promise.reject(error); // Rejette la promesse pour que l'appelant puisse gérer l'erreur
    }
);

export default apiClient; // Exporte l'instance de l'API
