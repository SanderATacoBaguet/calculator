// Ohm's Law
function calculateOhmsLaw() {
    const v = parseFloat(document.getElementById('v').value) || 0;
    const i = parseFloat(document.getElementById('i').value) || 0;
    const r = parseFloat(document.getElementById('r').value) || 0;
    let result = "";

    if(v && i && !r) result = `R = V/I = ${v/i} Ω`;
    else if(v && r && !i) result = `I = V/R = ${v/r} A`;
    else if(i && r && !v) result = `V = I*R = ${i*r} V`;
    else result = "Enter any two values to calculate the third.";
    document.getElementById('ohmsResult').innerText = result;
}

// Series Circuit
function calculateSeries() {
    const res = document.getElementById('seriesInput').value.split(',').map(Number);
    const total = res.reduce((a,b)=>a+b,0);
    document.getElementById('seriesResult').innerText = `Total Series Resistance = ${total} Ω`;
}

// Parallel Circuit
function calculateParallel() {
    const res = document.getElementById('parallelInput').value.split(',').map(Number);
    let reciprocal = 0;
    res.forEach(r => { if(r) reciprocal += 1/r });
    const total = reciprocal ? 1/reciprocal : 0;
    document.getElementById('parallelResult').innerText = `Total Parallel Resistance = ${total.toFixed(2)} Ω`;
}

// Transformer (primary -> secondary)
function calculateTransformer() {
    let U1 = parseFloat(document.getElementById('U1').value) || null;
    let I1 = parseFloat(document.getElementById('I1').value) || null;
    let T1 = parseFloat(document.getElementById('T1').value) || null;
    let U2 = parseFloat(document.getElementById('U2').value) || null;
    let I2 = parseFloat(document.getElementById('I2').value) || null;
    let T2 = parseFloat(document.getElementById('T2').value) || null;

    let filled = [U1,I1,T1,U2,I2,T2].filter(v => v !== null).length;
    if(filled < 5) {
        document.getElementById('transformerResult').innerText = "Enter 5 values to calculate the 6th.";
        return;
    }

    // Calculate missing
    if(U1 === null) U1 = U2 * T1 / T2;
    else if(I1 === null) I1 = I2 * U2 / U1;
    else if(T1 === null) T1 = U1 * T2 / U2;
    else if(U2 === null) U2 = U1 * T2 / T1;
    else if(I2 === null) I2 = I1 * U1 / U2;
    else if(T2 === null) T2 = U2 * T1 / U1;

    // Update the fields
    document.getElementById('U1').value = U1.toFixed(2);
    document.getElementById('I1').value = I1.toFixed(2);
    document.getElementById('T1').value = T1.toFixed(2);
    document.getElementById('U2').value = U2.toFixed(2);
    document.getElementById('I2').value = I2.toFixed(2);
    document.getElementById('T2').value = T2.toFixed(2);

    document.getElementById('transformerResult').innerText = "Calculation complete!";
}

// Cable Resistance
function calculateCable() {
    const length = parseFloat(document.getElementById('length').value) || 0;
    const area = parseFloat(document.getElementById('area').value) || 1;
    const rho = parseFloat(document.getElementById('resistivity').value) || 0.0175;
    const r = (rho * length) / area;
    document.getElementById('cableResult').innerText = `Cable Resistance = ${r.toFixed(4)} Ω`;
}

// Power & Energy
function calculatePower() {
    const v = parseFloat(document.getElementById('powerV').value) || 0;
    const i = parseFloat(document.getElementById('powerI').value) || 0;
    const t = parseFloat(document.getElementById('timeH').value) || 0;
    const power = v * i;
    const energy = power * t;
    document.getElementById('powerResult').innerText = `Power = ${power.toFixed(2)} W, Energy = ${energy.toFixed(2)} Wh`;
}
