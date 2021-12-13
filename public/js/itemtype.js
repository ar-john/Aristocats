function getSelectedValue() {
    
    let checkboxes = document.querySelectorAll('input[name=itemType]');
    console.log(checkboxes);
    let selected = [];
    for (let i=0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            selected.push(checkboxes[i].value);
            console.log(checkboxes[i].value);
        }
    }
    console.log(selected);
    return selected;
}



let btn = document.querySelector('#submitItem');
btn.addEventListener('click', (event) => {
    // getSelectedValue(itemType);
    var input = document.getElementById('hiddenInput');
    input.value = getSelectedValue().toString();
    
    console.log(input);
    
});
