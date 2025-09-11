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

// Transformer
function calculateTransformer() {
    const vp = parseFloat(document.getElementById('vp').value) || 0;
    const turns = parseFloat(document.getElementById('turns').value) || 1;
    const vs = vp / turns;
    document.getElementById('transformerResult').innerText = `Secondary Voltage = ${vs} V`;
}

// Cable Resistance
function calculateCable() {
    const length = parseFloat(document.getElementById('length').value) || 0;
    const area = parseFloat(document.getElementById('area').value) || 1;
    const rho = parseFloat(document.getElementById('resistivity').value) || 0.0175;
    const r = (rho * length) / area;
    document.getElementById('cableResult').innerText = `Cable Resistance = ${r.toFixed(4)} Ω`;
}
