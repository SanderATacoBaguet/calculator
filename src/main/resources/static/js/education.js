function calculateAverage() {
    const g1 = parseFloat(document.getElementById('grade1').value);
    const g2 = parseFloat(document.getElementById('grade2').value);
    const g3 = parseFloat(document.getElementById('grade3').value);
    const avg = (g1 + g2 + g3)/3;
    document.getElementById('avgResult').textContent = `Average: ${avg.toFixed(2)}`;
}

function toggleAdvanced() {
    const adv = document.getElementById('advancedSection');
    adv.style.display = adv.style.display === 'none' ? 'block' : 'none';
}

function calculateWeightedAverage() {
    const g1 = parseFloat(document.getElementById('g1').value);
    const g2 = parseFloat(document.getElementById('g2').value);
    const g3 = parseFloat(document.getElementById('g3').value);
    const g4 = parseFloat(document.getElementById('g4').value);
    const weighted = (g1*0.2 + g2*0.3 + g3*0.25 + g4*0.25);
    document.getElementById('weightedResult').textContent = `Weighted Average: ${weighted.toFixed(2)}`;
}
