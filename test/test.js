(function () {

    const READY_EVENT = "DOMContentLoaded";
    const isIE = document.addEventListener ? false : true;

    const addEventListener = function (eventType, callback) {
        if (isIE) {
            document.attachEvent(eventType, callback);
        } else {
            document.addEventListener(eventType, callback, false);
        }
    }


    const ieReadyHandler = function () {
        if (document.readyState === "complete") {
            document.removeEventListener("onreadystatechange")
            document.dispatchEvent(READY_EVENT);
        }
    }


    const onReadyHandler = function () {

        alert("Doc ready");
        const url = "localhost:3000/play"
        socket = io.connect(url)
    };



    if (isIE) {
        addEventListener("onreadystatechange", isReadyHandler);
    }

    addEventListener(READY_EVENT, onReadyHandler);

    console.log("test.js complete");


})();