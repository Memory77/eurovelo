// Importer les dépendances
// import 'leaflet/dist/leaflet.css';
// import L from 'leaflet';
// import 'leaflet-gpx';


// AVIS 

fetch('http://85.169.220.243:5004/api/commentaires')
  .then(response => response.json())
  .then(data => {
    const avisData = data.data; // Accéder au tableau de données dans la clé "data"

    // ttt des données, on parcours le tableau avec la fonction map

    const avisElements = avisData.map(avis => {
      const id = avis.id;

      //le format de date qui s'affiche actuellement, "2023-05-21T22:18:06.452Z", est le format ISO 8601. 
      //si on afficher la date dans un format différent, vous pouvez utiliser les fonctions de manipulation de date disponibles dans JavaScript.
      //exemple de code pour formater la date dans le format "jour/mois/année heure:minute" :
      //la méthode toLocaleString pour convertir la date en une représentation locale spécifique. En utilisant l'argument 'fr-FR', nous spécifions que nous souhaitons formater la date selon les conventions françaises. 
      //on peut ajuster le code en fonction de vos besoins de formatage de date.
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

      // utilisation des variables pour construire l'html

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
  


// itinéraires


map = L.map(map).setView([46.603354, 1.888334], 6); // Initialiser avec une vue par défaut
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

// // Charger le fichier GPX
// var gpxLayer = new L.GPX('gpxpoints/angres-lens.gpx', {
//   async: true,
//   marker_options: {
//     startIconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-green.png',
//     endIconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-red.png',
//     shadowUrl: 'https://leafletjs.com/examples/custom-icons/leaf-shadow.png'
//   }
// });

// // Ajouter la couche GPX à la carte
// gpxLayer.on('loaded', function (e) {
//   map.fitBounds(e.target.getBounds());
// });

// gpxLayer.addTo(map);
// //




fetch('http://85.169.220.243:5004/api/itineraires')
  .then(response => response.json())
  .then(data => {
    const itiData = data.data; // Accéder au tableau de données dans la clé "data"

    // Traitement des données, parcours du tableau avec la fonction map
    const itiElements = itiData.map(iti => {
      const id = iti.id;
      const departVille = iti.attributes.depart_ville;
      const arrivalVille = iti.attributes.arrival_ville;
      const description = iti.attributes.description;
      const difficulte = iti.attributes.difficulte;
      const image = iti.attributes.image_url;
      const gpxUrl = iti.attributes.gpx_url;

      // Utilisation des variables pour construire le code HTML
      return `
        <figure class="ficheItineraire" data-gpx="${gpxUrl}>
          <div class="CaRemplaceUneImage"><img src="${image}" class="CaRemplaceUneImage" alt="illustration"></div>
          <div class="ficheTexte">
              <p class="typeItineraire">Nature, Patrimoine</p>
              <p class="difficulte simple">${difficulte}</p>
              <h2 class="titreItineraire">${departVille} / ${arrivalVille}</h2>
              <p class="descriptionItineraire">${description}</p>
          </div>
        </figure>
      `;
    });

    const itineraireContainer = document.getElementById('iti-box');
    itineraireContainer.innerHTML = itiElements.join('');
  
    // Ajout du gestionnaire d'événements pour charger le tracé GPX
    const figures = document.querySelectorAll('.ficheItineraire');
    figures.forEach(figure => {
      figure.addEventListener('click', () => {
        const gpxUrl = figure.getAttribute('data-gpx');
        loadGPX(gpxUrl);
      });
    });
  })
  .catch(error => {
    console.error(error);
  });

// Fonction pour charger le tracé GPX
function loadGPX(url) {
  // Chargement du tracé GPX avec Leaflet
  const map = L.map('map-container').setView([0, 0], 12);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    maxZoom: 18,
  }).addTo(map);

  fetch(url)
    .then(response => response.text())
    .then(gpxData => {
      const gpxLayer = new L.GPX(gpxData, {
        async: true,
        marker_options: {
          startIconUrl: 'path/to/start-icon.png',
          endIconUrl: 'path/to/end-icon.png',
          shadowUrl: 'path/to/marker-shadow.png',
        },
      }).on('loaded', function () {
        map.fitBounds(gpxLayer.getBounds());
      }).addTo(map);
    })
    .catch(error => {
      console.error('Erreur lors du chargement');
    })};