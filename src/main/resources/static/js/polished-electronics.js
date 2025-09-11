// Theme toggle
document.getElementById("themeToggle").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});

// Ohm's Law
function calculateOhms() {
    const V = parseFloat(document.getElementById("ohmV").value);
    const I = parseFloat(document.getElementById("ohmI").value);
    if (I === 0) return document.getElementById("ohmResult").innerText = "❌ Cannot divide by zero!";
    const R = V / I;
    document.getElementById("ohmResult").innerText = `R = V/I = ${R.toFixed(5)} Ω`;
}

// Series Circuit
function calculateSeries() {
    const input = document.getElementById("seriesInput").value;
    const resistors = input.split(",").map(Number);
    const total = resistors.reduce((a,b) => a+b,0);
    document.getElementById("seriesResult").innerText = `Total Series Resistance = ${total.toFixed(5)} Ω`;
}

// Parallel Circuit
function calculateParallel() {
    const input = document.getElementById("parallelInput").value;
    const resistors = input.split(",").map(Number).filter(r => r !== 0);
    const total = 1 / resistors.reduce((sum,r) => sum + 1/r, 0);
    document.getElementById("parallelResult").innerText = `Total Parallel Resistance = ${total.toFixed(5)} Ω`;
}

// Transformer
function calculateTransformer() {
    const Vp = parseFloat(document.getElementById("primaryV").value);
    const ratio = parseFloat(document.getElementById("turnsRatio").value);
    if (ratio === 0) return document.getElementById("transformerResult").innerText = "❌ Turns ratio cannot be zero!";
    const Vs = Vp / ratio;
    document.getElementById("transformerResult").innerText = `Secondary Voltage = ${Vs.toFixed(5)} V`;
}

// Cable Resistance
function calculateCable() {
    const L = parseFloat(document.getElementById("cableLength").value);
    const A = parseFloat(document.getElementById("cableArea").value);
    const rho = parseFloat(document.getElementById("resistivity").value);
    if (A === 0) return document.getElementById("cableResult").innerText = "❌ Area cannot be zero!";
    const R = (rho * L) / A;
    document.getElementById("cableResult").innerText = `Cable Resistance = ${R.toFixed(5)} Ω`;
}
