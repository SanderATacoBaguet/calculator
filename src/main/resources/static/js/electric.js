let resistors = [];

function addResistor() {
    const value = parseFloat(document.getElementById("resistorValue").value);
    const type = document.getElementById("resistorType").value;
    const group = document.getElementById("parallelGroup").value || null;

    if (!value) return alert("Enter a resistor value.");

    resistors.push({
        name: `R${resistors.length+1}`,
        value,
        group: type === "P" ? (group || `P${resistors.length+1}`) : null,
        useCalculated: "no"
    });

    renderResistors();
}

function renderResistors() {
    const container = document.getElementById("resistorList");
    container.innerHTML = "";
    resistors.forEach((r,i) => {
        container.appendChild(createResistorDiv(r,i));
    });
}

function createResistorDiv(r,i) {
    const div = document.createElement("div");
    div.innerHTML = `${r.name} = ${r.value} Ω ${r.group ? "(Parallel: " + r.group + ")" : "(Series)"} 
        <button onclick="removeResistor(${i})">Remove</button>`;
    return div;
}

function removeResistor(i) {
    resistors.splice(i,1);
    renderResistors();
}

async function calculateCircuit() {
    const voltage = parseFloat(document.getElementById("voltage").value) || 0;
    if(resistors.length === 0) return alert("Add at least one resistor.");

    try {
        const response = await fetch("/electric/calculate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ voltage, resistors })
        });
        const data = await response.json();
        document.getElementById("results").innerHTML = `
            Total Resistance: ${data.totalResistance.toFixed(2)} Ω<br>
            Total Current: ${data.totalCurrent.toFixed(4)} A<br>
            <pre>${data.details}</pre>
        `;
    } catch(err) {
        document.getElementById("results").innerText = "Error: " + err;
    }
}
