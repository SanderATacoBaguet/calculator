// Convert Mbps -> MB/s
function convertToMB() {
    const mbps = parseFloat(document.getElementById('mbps').value) || 0;
    const MBps = mbps / 8;
    document.getElementById('mbResult').textContent = `${mbps} Mb/s = ${MBps.toFixed(2)} MB/s`;
}

// Convert MB/s -> Mbps
function convertToMb() {
    const MBps = parseFloat(document.getElementById('MBps').value) || 0;
    const mbps = MBps * 8;
    document.getElementById('MBResult').textContent = `${MBps} MB/s = ${mbps.toFixed(2)} Mb/s`;
}

// Download Time
function calculateDownloadTime() {
    const sizeGB = parseFloat(document.getElementById('fileSize').value) || 0;
    const speedMbps = parseFloat(document.getElementById('downloadSpeed').value) || 0;

    if (speedMbps <= 0) {
        document.getElementById('downloadResult').textContent = "Speed must be greater than 0.";
        return;
    }

    const sizeMb = sizeGB * 8192; // 1GB = 8192 Mb
    const seconds = sizeMb / speedMbps;
    document.getElementById('downloadResult').textContent = `Download Time: ${formatTime(seconds)}`;
}

// Upload Time
function calculateUploadTime() {
    const sizeGB = parseFloat(document.getElementById('uploadSize').value) || 0;
    const speedMbps = parseFloat(document.getElementById('uploadSpeed').value) || 0;

    if (speedMbps <= 0) {
        document.getElementById('uploadResult').textContent = "Speed must be greater than 0.";
        return;
    }

    const sizeMb = sizeGB * 8192;
    const seconds = sizeMb / speedMbps;
    document.getElementById('uploadResult').textContent = `Upload Time: ${formatTime(seconds)}`;
}

// Advanced Networking Calculator
function calculateAdvancedDownload() {
    const fileSizeGB = parseFloat(document.getElementById('advFileSize').value) || 0;
    const speed = parseFloat(document.getElementById('advSpeed').value) || 0;
    const unit = document.getElementById('advUnit').value; // 'Mbps' or 'MBps'

    let speedMbps = speed;
    if (unit === 'MBps') speedMbps *= 8;

    if (speedMbps <= 0) {
        document.getElementById('advResult').textContent = "Speed must be greater than 0.";
        return;
    }

    const sizeMb = fileSizeGB * 8192; 
    const seconds = sizeMb / speedMbps;
    document.getElementById('advResult').textContent = `Estimated download time: ${formatTime(seconds)}`;
}

// Helper: Format seconds into h:m:s
function formatTime(seconds) {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    return `${hrs}h ${mins}m ${secs}s`;
}
