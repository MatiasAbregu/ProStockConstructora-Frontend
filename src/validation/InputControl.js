class InputControl {

    soloNumeros(e) {
        if (e.keyCode == 8) return;
        if (!(/^[0-9]*$/).test(e.key)) e.preventDefault();
    }

    sinCaracteresEspeciales(e) {
        if (e.keyCode == 8) return;
        if ((/[ !"#$%&'()*+,./:;<=>?@[\\\]^_`{|}~\-]/).test(e.key)) e.preventDefault();
    }
}

export default new InputControl();