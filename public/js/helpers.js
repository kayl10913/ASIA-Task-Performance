function showModalAlert(message) {
    let modal = document.getElementById('alertModal');
    let msgElem = document.getElementById('alertModalMessage');
    if (!modal || !msgElem) {
        // fallback to alert if modal not found
        alert(message);
        return;
    }
    msgElem.textContent = message;
    let bsModal = bootstrap.Modal.getOrCreateInstance(modal);
    bsModal.show();
};