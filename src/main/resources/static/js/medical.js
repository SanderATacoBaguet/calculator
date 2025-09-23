function calculateBMI() {
    const w = parseFloat(document.getElementById('weight').value);
    const h = parseFloat(document.getElementById('height').value) / 100;
    if (h === 0) return;
    const bmi = w / (h*h);
    document.getElementById('bmiResult').textContent = `BMI: ${bmi.toFixed(2)}`;
}

function toggleAdvanced() {
    const adv = document.getElementById('advancedSection');
    adv.style.display = adv.style.display === 'none' ? 'block' : 'none';
}

function calculateMAP() {
    const sys = parseFloat(document.getElementById('systolic').value);
    const dia = parseFloat(document.getElementById('diastolic').value);
    const map = dia + (sys - dia)/3;
    document.getElementById('mapResult').textContent = `MAP: ${map.toFixed(2)} mmHg`;
}
