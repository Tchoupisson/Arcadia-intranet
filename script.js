// Assurer que Firebase est initialisé avec votre configuration
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

// Ajouter un citoyen
const addCitizenButton = document.getElementById('addCitizenButton');
addCitizenButton.addEventListener('click', function() {
    const nom = document.getElementById('nom').value;
    const prenom = document.getElementById('prenom').value;
    const telephone = document.getElementById('telephone').value;
    const dateNaissance = document.getElementById('dateNaissance').value;
    const lieuNaissance = document.getElementById('lieuNaissance').value;
    const adresse = document.getElementById('adresse').value;

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
        resetForm();
    } else {
        alert('Veuillez remplir tous les champs.');
    }
});

// Réinitialiser le formulaire après ajout
function resetForm() {
    document.getElementById('nom').value = '';
    document.getElementById('prenom').value = '';
    document.getElementById('telephone').value = '';
    document.getElementById('dateNaissance').value = '';
    document.getElementById('lieuNaissance').value = '';
    document.getElementById('adresse').value = '';
}

// Charger tous les citoyens depuis Firebase et afficher en temps réel
const citizenList = document.getElementById('citizenList');
citizensRef.on('child_added', function(data) {
    const citizen = data.val();
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

// Rechercher un citoyen par nom
const searchCitizenButton = document.getElementById('searchCitizenButton');
searchCitizenButton.addEventListener('click', function() {
    const searchName = prompt('Entrez le nom du citoyen à rechercher:');
    if (searchName) {
        citizensRef.orderByChild('nom').equalTo(searchName).once('value', function(snapshot) {
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
});
