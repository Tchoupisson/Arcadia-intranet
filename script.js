// Load all citizens
function loadCitizens() {
    const citizenRef = firebase.database().ref('citizens');
    citizenRef.on('value', (snapshot) => {
        const citizens = snapshot.val();
        let html = '<h2>Liste des citoyens</h2>';
        for (let citizen in citizens) {
            html += `<div>
                        <p><strong>Nom:</strong> ${citizens[citizen].nom} ${citizens[citizen].prenom}</p>
                        <p><strong>Téléphone:</strong> ${citizens[citizen].telephone}</p>
                        <p><strong>Date de naissance:</strong> ${citizens[citizen].date_naissance}</p>
                        <p><strong>Lieu de naissance:</strong> ${citizens[citizen].lieu_naissance}</p>
                        <p><strong>Adresse:</strong> ${citizens[citizen].adresse}</p>
                        <button onclick="deleteCitizen('${citizen}')">Supprimer</button>
                        <button onclick="editCitizen('${citizen}')">Modifier</button>
                    </div>`;
        }
        document.getElementById('citizenList').innerHTML = html;
    });
}

// Search citizen by name
function searchCitizen() {
    let searchQuery = prompt('Entrez le nom du citoyen à rechercher:');
    searchQuery = searchQuery.trim().toLowerCase();
    
    const citizenRef = firebase.database().ref('citizens');
    citizenRef.orderByChild('nom').equalTo(searchQuery).on('value', (snapshot) => {
        const citizen = snapshot.val();
        if (citizen) {
            let html = '<h2>Résultat de la recherche</h2>';
            html += `<div>
                        <p><strong>Nom:</strong> ${citizen.nom} ${citizen.prenom}</p>
                        <p><strong>Téléphone:</strong> ${citizen.telephone}</p>
                        <p><strong>Date de naissance:</strong> ${citizen.date_naissance}</p>
                        <p><strong>Lieu de naissance:</strong> ${citizen.lieu_naissance}</p>
                        <p><strong>Adresse:</strong> ${citizen.adresse}</p>
                        <button onclick="deleteCitizen('${snapshot.key}')">Supprimer</button>
                        <button onclick="editCitizen('${snapshot.key}')">Modifier</button>
                    </div>`;
            document.getElementById('citizenList').innerHTML = html;
        } else {
            alert('Aucun citoyen trouvé avec ce nom.');
        }
    });
}

// Ajouter un nouveau citoyen via un formulaire
function addCitizen() {
    // Créer un formulaire HTML
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

            alert('Citoyen ajouté avec succès!');

            // Recharger la liste des citoyens après l'ajout
            loadCitizens();
        } else {
            alert('Veuillez remplir tous les champs.');
        }
    });
}


// Delete a citizen
function deleteCitizen(citizenId) {
    if (confirm('Voulez-vous vraiment supprimer ce citoyen?')) {
        firebase.database().ref('citizens/' + citizenId).remove();
        alert('Citoyen supprimé avec succès!');
    }
}

// Edit a citizen
function editCitizen(citizenId) {
    const citizenRef = firebase.database().ref('citizens/' + citizenId);
    const updatedNom = prompt('Entrez le nouveau nom du citoyen:');
    const updatedPrenom = prompt('Entrez le nouveau prénom du citoyen:');
    const updatedTelephone = prompt('Entrez le nouveau numéro de téléphone:');
    const updatedDateNaissance = prompt('Entrez la nouvelle date de naissance (format JJ/MM/AAAA):');
    const updatedLieuNaissance = prompt('Entrez le nouveau lieu de naissance:');
    const updatedAdresse = prompt('Entrez la nouvelle adresse:');

    citizenRef.update({
        nom: updatedNom,
        prenom: updatedPrenom,
        telephone: updatedTelephone,
        date_naissance: updatedDateNaissance,
        lieu_naissance: updatedLieuNaissance,
        adresse: updatedAdresse
    });

    alert('Informations du citoyen mises à jour avec succès!');
}
