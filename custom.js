// Importer les dépendances
// import 'leaflet/dist/leaflet.css';
// import L from 'leaflet';
// import 'leaflet-gpx';



/////////////////////////////////////////// ITINERAIRES


// Fonction pour charger la carte par défaut avec un tracé GPX par défaut
function loadDefaultMap() {
  const mapContainer = document.getElementById('map');
  let map = mapContainer.map;
  if (!map) {
    map = L.map('map').setView([46.603354, 1.888334], 6); // Utilisez les coordonnées et le niveau de zoom souhaités

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(map);

    mapContainer.map = map; // Stocker la référence de la carte dans l'élément HTML pour une utilisation ultérieure

    const defaultGpxUrl = 'gpxpoints/track.gpx'; // Remplacez par l'URL du tracé GPX par défaut
    loadGPX(defaultGpxUrl, map);
  }
}

// Fonction pour charger le tracé GPX
function loadGPX(url, map) {
  // Supprimer les anciennes couches GPX
  if (map.gpxLayer) {
    map.removeLayer(map.gpxLayer);
  }

  fetch(url)
    .then(response => response.text())
    .then(gpxData => {
      const gpxLayer = new L.GPX(gpxData, {
        async: true,
        marker_options: {
          startIconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-green.png',
          endIconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-red.png',
          shadowUrl: 'https://leafletjs.com/examples/custom-icons/leaf-shadow.png',
        },
      }).on('loaded', function () {
        map.fitBounds(gpxLayer.getBounds());
      }).addTo(map);

      map.gpxLayer = gpxLayer; // Stocker la référence de la couche GPX dans la carte pour une utilisation ultérieure
    })
    .catch(error => {
      console.error('Erreur lors du chargement');
    });
}

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
        <figure class="ficheItineraire" data-gpx="${gpxUrl}">
          <div class="CaRemplaceUneImage"><img src="${image}" alt="illustration"></div>
          <div class="ficheTexte">
              <p class="typeItineraire">Nature, Patrimoine</p>
              <p class="difficulte ${difficulte === 'je me dépasse' ? 'simple' : 'difficile'}">${difficulte}</p>
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
        const mapContainer = document.getElementById('map');
        let map = mapContainer.map;
        if (!map) {
          map = L.map('map').setView([46.603354, 1.888334], 6); // Utilisez les coordonnées et le niveau de zoom souhaités

          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
            maxZoom: 18,
          }).addTo(map);

          mapContainer.map = map; // Stocker la référence de la carte dans l'élément HTML pour une utilisation ultérieure
        }

        loadGPX(gpxUrl, map);
      });
    });

    // Ajout du gestionnaire d'événements pour afficher la carte par défaut lorsque vous cliquez n'importe où
    document.addEventListener('click', () => {
      loadDefaultMap();
    });
  })
  .catch(error => {
    console.error(error);
  });

// Chargement de la carte par défaut au chargement de la page
loadDefaultMap();














////////////////////////////// FORMULAIRE ITINERAIRE


// document.querySelector('.etapesForm').addEventListener('submit', function(event) {
//   event.preventDefault(); // Empêche le formulaire de se soumettre normalement

//   // Récupérer les valeurs sélectionnées dans les listes déroulantes
//   var depart = document.getElementById('ItineraireDepart').value;
//   var arrivee = document.getElementById('ItineraireArrivee').value;

//   // Effectuer les actions nécessaires avec les valeurs récupérées
//   // Par exemple, vous pouvez rechercher les données correspondantes dans votre table
//   // et récupérer les coordonnées pour créer le tracé

//   // Afficher les valeurs sélectionnées à des fins de démonstration
//   console.log('Départ:', depart);
//   console.log('Arrivée:', arrivee);

//   // Appeler une fonction pour créer le tracé avec les coordonnées récupérées
//   // createTrace(depart, arrivee);
// });




// // Fonction pour récupérer les coordonnées des villes de départ et d'arrivée
// function obtenirCoordonneesVilles(depart, arrivee) {
//   var url = 'http://85.169.220.243:5004/api/villes';

//   return fetch(url)
//     .then(response => response.json())
//     .then(data => {
//       var villes = data.data;
//       var coordDepart = null;
//       var coordArrivee = null;

//       // Parcourir les villes pour trouver les coordonnées de départ et d'arrivée
//       for (var i = 0; i < villes.length; i++) {
//         var attributs = villes[i].attributes;
//         var nomVille = attributs.ville_name;
//         var latitude = attributs.ville_lat;
//         var longitude = attributs.ville_lon;

//         if (nomVille === depart) {
//           coordDepart = [latitude, longitude];
//         } else if (nomVille === arrivee) {
//           coordArrivee = [latitude, longitude];
//         }
//       }

//       // Retourner les coordonnées
//       return {
//         coordDepart: coordDepart,
//         coordArrivee: coordArrivee
//       };
//     });
// }

// // // Exemple d'utilisation de la fonction
// // var depart = 'Aire-sur-la-lys'; // Remplace avec la valeur sélectionnée dans la liste déroulante
// // var arrivee = 'St-Venant'; // Remplace avec la valeur sélectionnée dans la liste déroulante

// obtenirCoordonneesVilles(depart, arrivee)
//   .then(coordonnees => {
//     console.log('Coordonnées du départ:', coordonnees.coordDepart);
//     console.log('Coordonnées de l\'arrivée:', coordonnees.coordArrivee);
//   })
//   .catch(error => {
//     console.error('Une erreur s\'est produite:', error);
//   });