// Convert a hex-encoded string to a WordArray object
function parseHexToWordArray(hexString) {
    return CryptoJS.enc.Hex.parse(hexString);
}

// Encrypt plaintext using AES with a given key and IV
function encryptWithAES(plaintext, key, iv) {
    if (typeof plaintext === 'object') {
        plaintext = JSON.stringify(plaintext);
    }
    return CryptoJS.AES.encrypt(plaintext, key, {iv: iv}).toString();
}

// Decrypt ciphertext using AES with a given key and IV
function decryptWithAES(ciphertext, key, iv) {
    const decryptedBytes = CryptoJS.AES.decrypt(ciphertext, key, {iv: iv});
    const decryptedData = decryptedBytes.toString(CryptoJS.enc.Utf8);
    let decryptionSend = decryptedData;
    //   console.log(decryptionSend);
    // try {
    //     decryptionSend = JSON.parse(decryptedData);
    // } catch (error) {
    //     decryptionSend = decryptedData; // Return as string if not a valid JSON
    // }

    return decryptionSend;
}

function encrypt() {
    document.getElementById('decryptedData').innerText = '';
    const plaintext = document.getElementById('plaintext').value;
    const encryptionKey = CryptoJS.enc.Hex.parse('SravrVJy1pxBs7DRyZhoLE1hkJKfF3SZ'); // 128-bit key in hex
    const iv = CryptoJS.enc.Hex.parse('SravrVJy1pxBs7DR'); // 128-bit IV in hex

    const encryptedData = encryptWithAES(plaintext, encryptionKey, iv);
    document.getElementById('encryptedData').innerText = encryptedData;
}

function decrypt() {
    document.getElementById('encryptedData').innerText = '';
    const encryptedData = document.getElementById('plaintext').value;
    const encryptionKey = CryptoJS.enc.Hex.parse('SravrVJy1pxBs7DRyZhoLE1hkJKfF3SZ'); // Same key as used for encryption
    const iv = CryptoJS.enc.Hex.parse('SravrVJy1pxBs7DR'); // Same IV as used for encryption

    const decryptedData = decryptWithAES(encryptedData, encryptionKey, iv);
    document.getElementById('decryptedData').innerText = decryptedData;
}




function copyToClipboard(data, isEncrypted) {
    const tempInput = document.createElement('input');
    tempInput.value = data;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);

    // Show SweetAlert message
    Swal.fire({
        text: 'Data copied to clipboard!',
        icon: 'success',
        position: 'center',

        showConfirmButton: false,
        timer: 1500
    });

   
}


function copyEncryptedData() {
    const encryptedData = document.getElementById('encryptedData').textContent;
    copyToClipboard(encryptedData, true);
}

function copyDecryptedData() {
    const decryptedData = document.getElementById('decryptedData').textContent;
    copyToClipboard(decryptedData, false);
}

