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
            })
            .catch(err => {
                // failure, handle it.
                alert("Ошибка сканирования: " + err);
            });
    });
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
