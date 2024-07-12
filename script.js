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

// Ajouter un nouveau citoyen
function addCitizen() {
    const nom = prompt('Entrez le nom du citoyen:');
    const prenom = prompt('Entrez le prénom du citoyen:');
    const telephone = prompt('Entrez le numéro de téléphone:');
    const date_naissance = prompt('Entrez la date de naissance (format JJ/MM/AAAA):');
    const lieu_naissance = prompt('Entrez le lieu de naissance:');
    const adresse = prompt('Entrez l\'adresse:');

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
    } else {
        alert('Veuillez remplir tous les champs.');
    }
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
