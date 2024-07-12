// Assurer que Firebase est initialisé
if (!firebase.apps.length) {
      const firebaseConfig = {
        apiKey: "AIzaSyDL1u1v8MaAIsEdi_nJOtGvbAjSfeharbs",
        authDomain: "arcadia-intranet.firebaseapp.com",
        projectId: "arcadia-intranet",
        storageBucket: "arcadia-intranet.appspot.com",
        messagingSenderId: "1063972220375",
        appId: "1:1063972220375:web:954926ef011161d655ef92"
      };
    firebase.initializeApp(firebaseConfig);
}

// Fonction pour ajouter un nouveau citoyen via un formulaire
function addCitizen() {
    // Créer un formulaire HTML pour ajouter un citoyen
    let html = `
        <h2>Ajouter un citoyen</h2>
        <form id="citizenForm">
            <label for="nom">Nom:</label>
            <input type="text" id="nom" name="nom" required><br><br>
            <label for="prenom">Prénom:</label>
            <input type="text" id="prenom" name="prenom" required><br><br>
            <label for="telephone">Téléphone:</label>
            <input type="text" id="telephone" name="telephone" required><br><br>
            <label for="date_naissance">Date de naissance (JJ/MM/AAAA):</label>
            <input type="text" id="date_naissance" name="date_naissance" required><br><br>
            <label for="lieu_naissance">Lieu de naissance:</label>
            <input type="text" id="lieu_naissance" name="lieu_naissance" required><br><br>
            <label for="adresse">Adresse:</label>
            <input type="text" id="adresse" name="adresse" required><br><br>
            <button type="submit">Ajouter</button>
        </form>
        <br>
        <div id="message"></div>
    `;

    // Afficher le formulaire dans #citizenList
    document.getElementById('citizenList').innerHTML = html;

    // Écouter l'événement de soumission du formulaire
    document.getElementById('citizenForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Empêcher la soumission par défaut du formulaire

        // Récupérer les valeurs des champs
        const nom = document.getElementById('nom').value;
        const prenom = document.getElementById('prenom').value;
        const telephone = document.getElementById('telephone').value;
        const date_naissance = document.getElementById('date_naissance').value;
        const lieu_naissance = document.getElementById('lieu_naissance').value;
        const adresse = document.getElementById('adresse').value;

        // Vérifier que tous les champs sont remplis
        if (nom && prenom && telephone && date_naissance && lieu_naissance && adresse) {
            const newCitizenRef = firebase.database().ref('citizens').push();
            newCitizenRef.set({
                nom: nom,
                prenom: prenom,
                telephone: telephone,
                date_naissance: date_naissance,
                lieu_naissance: lieu_naissance,
                adresse: adresse
            });

            // Afficher un message de succès
            document.getElementById('message').innerHTML = '<p>Citoyen ajouté avec succès!</p>';

            // Effacer le formulaire après l'ajout
            document.getElementById('citizenForm').reset();

            // Recharger la liste des citoyens après l'ajout
            loadCitizens();
        } else {
            alert('Veuillez remplir tous les champs.');
        }
    });
}

// Fonction pour charger tous les citoyens depuis Firebase
function loadCitizens() {
    const citizenList = document.getElementById('citizenList');
    citizenList.innerHTML = '<h2>Liste des citoyens</h2>';

    const citizensRef = firebase.database().ref('citizens');
    citizensRef.on('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            const citizen = childSnapshot.val();
            const citizenItem = `
                <p><strong>Nom:</strong> ${citizen.nom} ${citizen.prenom}</p>
                <p><strong>Téléphone:</strong> ${citizen.telephone}</p>
                <p><strong>Date de naissance:</strong> ${citizen.date_naissance}</p>
                <p><strong>Lieu de naissance:</strong> ${citizen.lieu_naissance}</p>
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
        const citizenList = document.getElementById('citizenList');
        citizenList.innerHTML = '<h2>Résultats de la recherche</h2>';

        const citizensRef = firebase.database().ref('citizens');
        citizensRef.orderByChild('nom').equalTo(searchName).on('value', function(snapshot) {
            if (snapshot.exists()) {
                snapshot.forEach(function(childSnapshot) {
                    const citizen = childSnapshot.val();
                    const citizenItem = `
                        <p><strong>Nom:</strong> ${citizen.nom} ${citizen.prenom}</p>
                        <p><strong>Téléphone:</strong> ${citizen.telephone}</p>
                        <p><strong>Date de naissance:</strong> ${citizen.date_naissance}</p>
                        <p><strong>Lieu de naissance:</strong> ${citizen.lieu_naissance}</p>
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

// Assurez-vous que le script est chargé après le DOM
document.addEventListener('DOMContentLoaded', function() {
    // Charger initialement tous les citoyens au chargement de la page
    loadCitizens();
});
