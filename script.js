// Assurer que Firebase est initialisé
const firebaseConfig = {
  apiKey: "AIzaSyDL1u1v8MaAIsEdi_nJOtGvbAjSfeharbs",
  authDomain: "arcadia-intranet.firebaseapp.com",
  projectId: "arcadia-intranet",
  storageBucket: "arcadia-intranet.appspot.com",
  messagingSenderId: "1063972220375",
  appId: "1:1063972220375:web:954926ef011161d655ef92"
};

firebase.initializeApp(firebaseConfig);

// Référence à la base de données Firebase
const db = firebase.database();
const citizensRef = db.ref('citizens');

// Fonction pour ajouter un citoyen
function addCitizen() {
    const nom = prompt('Entrez le nom du citoyen:');
    const prenom = prompt('Entrez le prénom du citoyen:');
    const telephone = prompt('Entrez le numéro de téléphone du citoyen:');
    const dateNaissance = prompt('Entrez la date de naissance du citoyen (JJ/MM/AAAA):');
    const lieuNaissance = prompt('Entrez le lieu de naissance du citoyen:');
    const adresse = prompt('Entrez l\'adresse du citoyen:');

    if (nom && prenom && telephone && dateNaissance && lieuNaissance && adresse) {
        const newCitizenRef = citizensRef.push();
        newCitizenRef.set({
            nom: nom,
            prenom: prenom,
            telephone: telephone,
            dateNaissance: dateNaissance,
            lieuNaissance: lieuNaissance,
            adresse: adresse
        });
        alert('Citoyen ajouté avec succès!');
    } else {
        alert('Veuillez remplir tous les champs.');
    }
}

// Fonction pour charger tous les citoyens depuis Firebase
function loadCitizens() {
    citizensRef.on('value', function(snapshot) {
        const citizenList = document.getElementById('citizenList');
        citizenList.innerHTML = '<h2>Liste des citoyens</h2>';

        snapshot.forEach(function(childSnapshot) {
            const citizen = childSnapshot.val();
            const citizenItem = `
                <p><strong>Nom:</strong> ${citizen.nom} ${citizen.prenom}</p>
                <p><strong>Téléphone:</strong> ${citizen.telephone}</p>
                <p><strong>Date de naissance:</strong> ${citizen.dateNaissance}</p>
                <p><strong>Lieu de naissance:</strong> ${citizen.lieuNaissance}</p>
                <p><strong>Adresse:</strong> ${citizen.adresse}</p>
                <hr>
            `;
            citizenList.innerHTML += citizenItem;
        });
    });
}

// Fonction pour rechercher un citoyen par nom
function searchCitizen() {
    const searchName = prompt('Entrez le nom du citoyen à rechercher:');
    if (searchName) {
        citizensRef.orderByChild('nom').equalTo(searchName).on('value', function(snapshot) {
            const citizenList = document.getElementById('citizenList');
            citizenList.innerHTML = '<h2>Résultats de la recherche</h2>';

            if (snapshot.exists()) {
                snapshot.forEach(function(childSnapshot) {
                    const citizen = childSnapshot.val();
                    const citizenItem = `
                        <p><strong>Nom:</strong> ${citizen.nom} ${citizen.prenom}</p>
                        <p><strong>Téléphone:</strong> ${citizen.telephone}</p>
                        <p><strong>Date de naissance:</strong> ${citizen.dateNaissance}</p>
                        <p><strong>Lieu de naissance:</strong> ${citizen.lieuNaissance}</p>
                        <p><strong>Adresse:</strong> ${citizen.adresse}</p>
                        <hr>
                    `;
                    citizenList.innerHTML += citizenItem;
                });
            } else {
                citizenList.innerHTML = '<p>Aucun citoyen trouvé avec ce nom.</p>';
            }
        });
    }
}

// Écouter le clic sur le bouton "Ajouter un citoyen"
const addCitizenButton = document.getElementById('addCitizenButton');
addCitizenButton.addEventListener('click', function() {
    addCitizen();
});

// Écouter le clic sur le bouton "Rechercher un citoyen"
const searchCitizenButton = document.getElementById('searchCitizenButton');
searchCitizenButton.addEventListener('click', function() {
    searchCitizen();
});

// Charger initialement tous les citoyens au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    loadCitizens();
});
