//Remove animations on load
window.onload = function () {
    document.querySelector('body').classList.remove('perf-no-animation');
}

//100vh hack
var vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty("--vh", "".concat(vh, "px"));
window.addEventListener("resize", function () {
    var vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", "".concat(vh, "px"));
});

//Mobile menu init
function mobileMenu() {
    var toggle = document.querySelector('.header-burger .burger');
    var menu = document.querySelector('.mobileMenu');
    var body = document.querySelector('body');

    this.onOpen = function () {
        toggle.classList.add('open');
        menu.classList.add('opened');
        body.classList.add('mobile');
        return true;
    };

    this.onClose = function () {
        toggle.classList.remove('open');
        menu.classList.remove('opened');
        body.classList.remove('mobile');
    }
}

var mobileMenu = new mobileMenu();

var navLinks = document.querySelectorAll('.mobileMenu-nav__ul li a');
for (var i = 0; i < navLinks.length; i++) {
    navLinks[i].addEventListener('click', function () {
        mobileMenu.onClose();
    });
}

//Browser-level image lazy-loading
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    for (var i = 0; i < images.length; i++) {
        images[i].src = images[i].dataset.src;
    }
} else {
    const script = document.createElement('script');
    script.src = '/js/lazysizes.min.js';
    document.body.appendChild(script);
}

//ymaps
window.addEventListener("load", function () {
    var fileUpload = document.createElement('script');
    fileUpload.src = "/js/html5-qrcode.min.js";
    fileUpload.onload = initQr;
    document.body.appendChild(fileUpload);
});

function initQr() {
    const html5QrCode = new Html5Qrcode("reader");
    const qrCodeSuccessCallback = (decodedText, decodedResult) => {
        document.querySelector('.reader__results').classList.add('is-active');
        document.querySelector('.reader__resultsText').textContent = "Распознанный текст " + decodedText;
    };
    const config = {
        qrbox: { width: 250, height: 250 }
    };

    var btn = document.getElementById('reader__btn');
    var stop = document.getElementById('reader__stop');

    btn.addEventListener('click', function () {
        html5QrCode.start({
            facingMode: "environment"
        }, config, qrCodeSuccessCallback);
        this.style.display = "none";
        stop.style.display = "flex";
    })
    
    stop.addEventListener('click', function () {
        html5QrCode.stop().then((ignore) => {
            // QR Code scanning is stopped.
          }).catch((err) => {
          });
        this.style.display = "none";
        btn.style.display = "flex";
    })

    var closePopup = document.querySelector('.reader__resultsClose');
    closePopup.addEventListener('click', function(){
        document.querySelector('.reader__results').classList.remove('is-active');
    })
}

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('/sw.js');
    });
}