window.addEventListener("load", function () {
    var fileUpload = document.createElement('script');
    fileUpload.src = "/js/html5-qrcode.min.js";
    fileUpload.onload = initQr;
    document.body.appendChild(fileUpload);
});

function initQr(){
    const html5QrCode = new Html5Qrcode(/* element id */ "reader",{aspectRatio: 1});
// File based scanning
    const fileinput = document.getElementById('qr-input-file');
    fileinput.addEventListener('change', e => {
        if (e.target.files.length == 0) {
            // No file selected, ignore
            return;
        }

        const imageFile = e.target.files[0];
        // Scan QR Code
        html5QrCode.scanFile(imageFile, true)
            .then(decodedText => {
                // success, use decodedText
                alert(decodedText);
            })
            .catch(err => {
                // failure, handle it.
                console.log(`Error scanning file. Reason: ${err}`)
            });
    });
}
