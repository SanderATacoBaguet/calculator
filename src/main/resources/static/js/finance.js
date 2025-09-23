function calculateSimpleInterest() {
    const p = parseFloat(document.getElementById('principal').value);
    const r = parseFloat(document.getElementById('rate').value)/100;
    const t = parseFloat(document.getElementById('time').value);
    const si = p * r * t;
    document.getElementById('siResult').textContent = `Simple Interest: $${si.toFixed(2)}`;
}

function toggleAdvanced() {
    const adv = document.getElementById('advancedSection');
    adv.style.display = adv.style.display === 'none' ? 'block' : 'none';
}

function calculateCompoundInterest() {
    const p = parseFloat(document.getElementById('cPrincipal').value);
    const r = parseFloat(document.getElementById('cRate').value)/100;
    const t = parseFloat(document.getElementById('cTime').value);
    const n = parseInt(document.getElementById('compounds').value);
    const ci = p * Math.pow(1 + r/n, n*t) - p;
    document.getElementById('ciResult').textContent = `Compound Interest: $${ci.toFixed(2)}`;
}
