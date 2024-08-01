const button = document.querySelector("button");
const response = document.querySelector(".response");
const wrong = document.getElementById("wrong");
const right = document.getElementById("right");

button.addEventListener('click', function () {
    var cod = document.querySelector(".badge");
    var ser = document.querySelector(".serial");
    if (cod.value == 4444 && ser.value == 1234) {
        response.innerHTML = " <img alt='Tick' src='tick.png'>";
        right.play();
        cod.value = '';
        ser.value = '';
    } else {
        response.innerHTML = " <img alt='X' src='x.png'>";
        wrong.play();
        cod.value = '';
        ser.value = '';
    }
});
