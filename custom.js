
// AVIS 

fetch('http://85.169.220.243:5004/api/commentaires')
  .then(response => response.json())
  .then(data => {
    const avisData = data.data; // Accéder au tableau de données dans la clé "data"

    // Traitement des données, on parcours le tableau avec la fonction map

    const avisElements = avisData.map(avis => {
      const id = avis.id;

      //Le format de date qui s'affiche actuellement, "2023-05-21T22:18:06.452Z", est le format ISO 8601. 
      //Si vous souhaitez afficher la date dans un format différent, vous pouvez utiliser les fonctions de manipulation de date disponibles dans JavaScript.
      //Voici un exemple de code pour formater la date dans le format "jour/mois/année heure:minute" :
      //la méthode toLocaleString pour convertir la date en une représentation locale spécifique. En utilisant l'argument 'fr-FR', nous spécifions que nous souhaitons formater la date selon les conventions françaises. 
      //Vous pouvez ajuster le code en fonction de vos besoins de formatage de date.
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
      const titre = avis.attributes.titre;
      const description = avis.attributes.description;

      // Utilisez ces variables pour construire votre HTML

      return `
        <div class="avis-content-box">
          <p class="date">${date}</p>
          <p class="name">${name}</p>
          <p class="provenance">${ville}</p>
          <div class="notes">
            <p>${security}/5</p>
            <p>${balisage}/5</p>
            <p>${interet}/5</p>
            <p>${security}/5</p>
          </div>
          <div class="commentaire">
            <h2>${titre}</h2>
            <p>${description}</p>
          </div>
        </div>
      `;
    });

    const avisContainer = document.getElementById('avis-box');
    avisContainer.innerHTML = avisElements.join('');
  })
  .catch(error => {
    console.error(error);
  });
  
  

  