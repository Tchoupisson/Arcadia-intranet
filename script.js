// Your Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDL1u1v8MaAIsEdi_nJOtGvbAjSfeharbs",
    authDomain: "arcadia-intranet.firebaseapp.com",
    databaseURL: "https://arcadia-intranet-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "arcadia-intranet",
    storageBucket: "arcadia-intranet.appspot.com",
    messagingSenderId: "1063972220375",
    appId: "1:1063972220375:web:197e83357f23303855ef92"
  };


// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Function to add a citizen
function addCitizen() {
    const name = document.getElementById('citizenName').value;
    const age = document.getElementById('citizenAge').value;
    const city = document.getElementById('citizenCity').value;

    const newCitizenKey = database.ref().child('citizens').push().key;
    database.ref('citizens/' + newCitizenKey).set({
        name: name,
        age: age,
        city: city
    }).then(() => {
        alert('Citoyen ajouté avec succès !');
        document.getElementById('addCitizenForm').reset();
    }).catch(error => {
        alert('Erreur : ' + error.message);
    });
}

// Function to search for a citizen
function searchCitizen() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    database.ref('citizens').orderByChild('name').equalTo(searchInput).once('value', snapshot => {
        const resultDiv = document.getElementById('searchResult');
        resultDiv.innerHTML = '';
        if (snapshot.exists()) {
            snapshot.forEach(childSnapshot => {
                const data = childSnapshot.val();
                resultDiv.innerHTML += `<p>Nom: ${data.name}, Âge: ${data.age}, Ville: ${data.city}</p>`;
            });
        } else {
            resultDiv.innerHTML = '<p>Aucun citoyen trouvé</p>';
        }
    }).catch(error => {
        alert('Erreur : ' + error.message);
    });
}

// Function to delete a citizen
function deleteCitizen() {
    const deleteInput = document.getElementById('deleteInput').value.toLowerCase();
    database.ref('citizens').orderByChild('name').equalTo(deleteInput).once('value', snapshot => {
        if (snapshot.exists()) {
            snapshot.forEach(childSnapshot => {
                childSnapshot.ref.remove().then(() => {
                    alert('Citoyen supprimé avec succès !');
                }).catch(error => {
                    alert('Erreur : ' + error.message);
                });
            });
        } else {
            alert('Aucun citoyen trouvé');
        }
    }).catch(error => {
        alert('Erreur : ' + error.message);
    });
}
