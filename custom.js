
// AVIS 

fetch('http://85.169.220.243:5004/api/commentaires')
  .then(response => response.json())
  .then(data => {
    const avisData = data.data; // Accéder au tableau de données dans la clé "data"
    // Traitez les données ici

    const avisElements = avisData.map(avis => {
      const id = avis.id;
      const date = avis.attributes.date;
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
  
  

  