window.addEventListener("load", function () {
    var fileUpload = document.createElement('script');
    fileUpload.src = "/js/html5-qrcode.min.js";
    fileUpload.onload = initQr;
    document.body.appendChild(fileUpload);
});

var close = document.querySelector('.results__title svg');
close.addEventListener('click', function(){
    document.querySelector('.results').classList.remove('is-active');
})

var decodedData = {};
var i = 0;

function initQr() {
    const html5QrCode = new Html5Qrcode("reader");
    const qrCodeSuccessCallback = (decodedText, decodedResult) => {
        if(validURL(decodedText)){
            document.querySelector('.results__text').textContent = "";
            var link = document.createElement('a');
            link.setAttribute("href", decodedText);
            link.setAttribute('target',"_blank");
            link.classList.add('link');
            link.textContent = decodedText;
            document.querySelector('.results__text').appendChild(link);
            document.querySelector('.results').classList.add('is-active');
        }
        else{
            document.querySelector('.results__text').textContent = decodedText;
            document.querySelector('.results').classList.add('is-active');
        }
        decodedData[i] = decodedText;
        i++;
        console.log(decodedData);
    };
    const config = {
        fps: 10,
        experimentalFeatures: {
            useBarCodeDetectorIfSupported: true
        },
        aspectRatio: 1.33
    };

    function cameraStart(){
        html5QrCode.start({
            facingMode: "environment"
        }, config, qrCodeSuccessCallback);
    }

    cameraStart();
}

function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
  }