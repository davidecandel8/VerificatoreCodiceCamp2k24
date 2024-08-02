document.addEventListener("DOMContentLoaded", () => {
    const button = document.querySelector("button:not(.reset)");
    const resetButton = document.querySelector("button.reset");
    const badgeInputs = document.querySelectorAll(".badge");
    const serialInputs = document.querySelectorAll(".serial");
    const allInputs = [...badgeInputs, ...serialInputs];
    const response = document.querySelector(".response");
    const message = document.querySelector(".message");
    const container = document.querySelector(".container");
    const wrong = document.getElementById("wrong");
    const right = document.getElementById("right");

    const groups = {
        1: ["RRJDRY03", "IEXJJ4N0", "BSRG3D61", "JOPW3WWK", "WEVKSUHD", "MYSAJNR3", "S1INU96M", "TXPPGZXP"],
        2: ["RWT6OQB0", "W4VIAP59", "WU6YZIK8", "GME0AEHU", "7CNVBRUM", "JSYMNX15", "IHG2Y71O", "2PU7LIKK"],
        3: ["SXROVMEI", "TIVQRQFT", "5B658ONP", "LIUNRO4B", "WWU8EBBN", "F3SIJOGR", "UONB6LSX", "B5FB8TZ8", "NY25ZQQQ"],
        4: ["WW1SUL4E", "7YBMRWRS", "PP3DK5AO", "NZIXXMVC", "06CUWKMB", "GVHP72S5", "RA49KSKM", "7JOIXH7B"]
    };

    function checkGroup(code1, code2) {
        let group1 = -1;
        let group2 = -1;

        for (let group in groups) {
            if (groups[group].includes(code1)) {
                group1 = group;
            }
            if (groups[group].includes(code2)) {
                group2 = group;
            }
        }

        if (group1 === -1 || group2 === -1) {
            return 2;
        } else if (group1 === group2) {
            return 1;
        } else {
            return 0;
        }
    }

    function updateButtonState() {
        const allFilled = [...badgeInputs, ...serialInputs].every(input => input.value.trim() !== "");
        button.disabled = !allFilled;
    }

    function handleVerification() {
        const badgeCode = [...badgeInputs].map(input => input.value.trim().toUpperCase()).join('');
        const serialCode = [...serialInputs].map(input => input.value.trim().toUpperCase()).join('');

        const result = checkGroup(badgeCode, serialCode);

        badgeInputs.forEach(input => input.disabled = true);
        serialInputs.forEach(input => input.disabled = true);
        button.style.display = 'none';
        resetButton.style.display = 'inline-block';

        if (result === 1) {
            container.style.backgroundColor = '#4CAF50';
            message.textContent = "Appartenete allo stesso pacchetto.";
            right.currentTime = 0;
            right.play();
        } else if (result === 2) {
            container.style.backgroundColor = '#ff6666';
            message.textContent = "Almeno uno dei codici NON e' corretto.";
            wrong.currentTime = 0;
            wrong.play();
        } else if (result === 0) {
            container.style.backgroundColor = '#ff6666';
            message.textContent = "NON appertente allo stesso pacchetto.";
            wrong.currentTime = 0;
            wrong.play();
        }
    }

    function resetForm() {
        badgeInputs.forEach(input => {
            input.disabled = false;
            input.value = '';
        });
        serialInputs.forEach(input => {
            input.disabled = false;
            input.value = '';
        });
        button.style.display = 'inline-block';
        button.disabled = true;
        resetButton.style.display = 'none';
        container.style.backgroundColor = '#fff';
        message.textContent = '';
    }

    allInputs.forEach(input => {
        input.addEventListener('input', () => {
            input.value = input.value.toUpperCase();
            if (input.value.length === input.maxLength) {
                const nextInput = input.nextElementSibling;
                if (nextInput) {
                    nextInput.focus();
                }
            }
            updateButtonState();
        });
    });

    button.addEventListener('click', handleVerification);
    resetButton.addEventListener('click', resetForm);

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' && !button.disabled) {
            handleVerification();
        }
    });
});
