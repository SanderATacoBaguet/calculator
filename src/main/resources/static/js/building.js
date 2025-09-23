function calculateVolume() {
    const l = parseFloat(document.getElementById('length').value);
    const w = parseFloat(document.getElementById('width').value);
    const h = parseFloat(document.getElementById('height').value);
    const volume = l * w * h;
    document.getElementById('volumeResult').textContent = `Volume: ${volume} m³`;
}

function toggleAdvanced() {
    const adv = document.getElementById('advancedSection');
    adv.style.display = adv.style.display === 'none' ? 'block' : 'none';
}

function calculateHypotenuse() {
    const a = parseFloat(document.getElementById('sideA').value);
    const b = parseFloat(document.getElementById('sideB').value);
    const c = Math.sqrt(a*a + b*b);
    document.getElementById('hypotenuseResult').textContent = `Hypotenuse: ${c.toFixed(2)} m`;
}
