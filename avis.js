// Récupérer l'ID de l'avis à partir de l'URL
const urlParams = new URLSearchParams(window.location.search);
const avisId = urlParams.get('id');

// Effectuer une requête pour obtenir les détails de l'avis spécifique avec l'ID
fetch(`http://localhost:5004/api/commentaires/${avisId}`)
.then(response => response.json())
.then(data => {
    const avis = data.data;
    const id = avis.id;
    const rawDate = avis.attributes.date; // Format ISO 8601
    const date = new Date(rawDate).toLocaleString('fr-FR', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
    });
    const name = avis.attributes.name;
    const ville = avis.attributes.ville;
    const security = avis.attributes.security;
    const balisage = avis.attributes.balisage;
    const interet = avis.attributes.interet;
    const service = avis.attributes.service;
    const titre = avis.attributes.titre;
    const description = avis.attributes.description;

    // Utiliser les données récupérées pour afficher les détails de l'avis
    const avisElement = `
    <div class="avis-content-box">
        <p class="date">Date : ${date}</p>
        <p class="name">Nom : ${name}</p>
        <p class="provenance">Ville : ${ville}</p>
        <div class="notes">
        <p>Sécurité : ${security}/5</p>
        <p>Balisage : ${balisage}/5</p>
        <p>Intérêt : ${interet}/5</p>
        <p>Service : ${service}/5</p>
        </div>
        <div class="commentaire">
        <h2>${titre}</h2>
        <p>${description}</p>
        </div>
    </div>
    `;

    const avisContainer = document.getElementById('avis-box');
    avisContainer.innerHTML = avisElement;
})
.catch(error => {
    console.error(error);
});