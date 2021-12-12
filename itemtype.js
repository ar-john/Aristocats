function getSelectedValue(name) {
    const checkboxes = document.querySelectorAll(`input[name="${name}"]:checked`);
    let valueV = "";
    checkboxes.forEach((checkbox) => {
        valueV.push(checkbox.value);
    });
    return valueV;
}

let btn = document.querySelector('#submitItem');
btn.addEventListener('click', (event) => {
    getSelectedValue(itemType);
});