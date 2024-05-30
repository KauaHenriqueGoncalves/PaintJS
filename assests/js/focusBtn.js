;(function(){
    const btns = Array.from(document.getElementsByName('optionCanvas'));
    
    function removeFocus() {
        btns.forEach( input => {
            if( !(input.checked) ) {
                input.parentElement.classList.remove('focus');
            };
        });
    }

    function showControlErase() {
        const control = document.querySelector('.containerSizeErase');
        if( btns[3].checked ) {
            control.style.display = 'flex';
            control.style.opacity = '1';
        } else {
            control.style.opacity = '0';
            control.style.display = 'none';
        };
    }
    showControlErase();

    function insertFocus() {
        removeFocus();
        btns.forEach( input => {
            if( input.checked ) {
                input.parentElement.classList.add('focus');
            };
        });
    }
    
    document.querySelector('.config').addEventListener('click', (e) => {
        if( !(e.target.localName === 'input') || e.target.parentElement.localName !== 'label' ) return;

        const label = e.target.parentElement;
        showControlErase();
        insertFocus(label);
    });

    insertFocus();
})()