document.addEventListener("DOMContentLoaded", function() {
    const citizens = JSON.parse(localStorage.getItem("citizens")) || [
        {name: 'John Doe', address: '123 Main St', infraction: 'Speeding'},
        {name: 'Jane Smith', address: '456 Elm St', infraction: 'Parking Violation'},
        {name: 'Sam Johnson', address: '789 Oak St', infraction: 'No Seatbelt'}
    ];

    function saveCitizens() {
        localStorage.setItem("citizens", JSON.stringify(citizens));
    }

    function renderCitizens(data) {
        const citizensTableBody = document.querySelector("#citizensTable tbody");
        if (citizensTableBody) {
            citizensTableBody.innerHTML = "";
            data.forEach(citizen => {
                const row = document.createElement("tr");

                Object.values(citizen).forEach(text => {
                    const cell = document.createElement("td");
                    cell.textContent = text;
                    row.appendChild(cell);
                });

                citizensTableBody.appendChild(row);
            });
        }
    }

    function filterCitizens(searchTerm) {
        const filteredCitizens = citizens.filter(citizen =>
            citizen.name.toLowerCase().includes(searchTerm) ||
            citizen.address.toLowerCase().includes(searchTerm) ||
            citizen.infraction.toLowerCase().includes(searchTerm)
        );
        renderCitizens(filteredCitizens);
    }

    const searchInput = document.getElementById("searchInput");
    const searchButton = document.getElementById("searchButton");
    if (searchButton) {
        searchButton.addEventListener("click", function() {
            const searchTerm = searchInput.value.toLowerCase();
            filterCitizens(searchTerm);
        });
        renderCitizens(citizens); // Initial render
    }

    const addCitizenForm = document.getElementById("addCitizenForm");
    if (addCitizenForm) {
        addCitizenForm.addEventListener("submit", function(event) {
            event.preventDefault();
            const newCitizen = {
                name: event.target.name.value,
                address: event.target.address.value,
                infraction: event.target.infraction.value
            };
            citizens.push(newCitizen);
            saveCitizens();
            alert("Citizen added successfully");
            event.target.reset();
        });
    }

    const deleteInput = document.getElementById("deleteInput");
    const deleteButton = document.getElementById("deleteButton");
    const deleteMessage = document.getElementById("deleteMessage");

    if (deleteButton) {
        deleteButton.addEventListener("click", function() {
            const nameToDelete = deleteInput.value.trim();
            const index = citizens.findIndex(citizen => citizen.name.toLowerCase() === nameToDelete.toLowerCase());
            if (index !== -1) {
                citizens.splice(index, 1);
                saveCitizens();
                deleteMessage.textContent = "Citizen deleted successfully";
                deleteInput.value = "";
                renderCitizens(citizens); // Update table after deletion
            } else {
                deleteMessage.textContent = "Citizen not found";
            }
        });
    }
});
