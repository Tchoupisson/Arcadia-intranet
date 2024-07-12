document.addEventListener("DOMContentLoaded", function() {
    const citizens = [
        {name: 'John Doe', address: '123 Main St', infraction: 'Speeding'},
        {name: 'Jane Smith', address: '456 Elm St', infraction: 'Parking Violation'},
        {name: 'Sam Johnson', address: '789 Oak St', infraction: 'No Seatbelt'}
    ];

    const citizensTableBody = document.querySelector("#citizensTable tbody");

    citizens.forEach(citizen => {
        const row = document.createElement("tr");

        Object.values(citizen).forEach(text => {
            const cell = document.createElement("td");
            cell.textContent = text;
            row.appendChild(cell);
        });

        citizensTableBody.appendChild(row);
    });
});
