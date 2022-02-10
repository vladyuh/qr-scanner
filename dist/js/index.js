window.addEventListener("load", function () {
    var fileUpload = document.createElement('script');
    fileUpload.src = "/js/html5-qrcode.min.js";
    fileUpload.onload = initQr;
    document.body.appendChild(fileUpload);
});

function initQr() {
    const html5QrCode = new Html5Qrcode("reader");
    const qrCodeSuccessCallback = (decodedText, decodedResult) => {
        alert("Результаты сканирования: " + decodedText);
    };
    const config = {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        experimentalFeatures: {
            useBarCodeDetectorIfSupported: true
        },
        aspectRatio: 2
    };

    function cameraStart(){
        html5QrCode.start({
            facingMode: "environment"
        }, config, qrCodeSuccessCallback);
    }

    cameraStart();
}