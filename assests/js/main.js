;(function(){

    const canvas = document.getElementById('paint');
    const ctxCanvas = canvas.getContext('2d');

    const optionCanvas = document.getElementsByName('optionCanvas');
    optionCanvas[0].checked = true;

    function getSizeLine() {
        const arrOptions = Array.from(optionCanvas);
        for( let i = 0; i < (arrOptions.length - 1); i++ ) {
            if( arrOptions[i].checked ) return parseInt(arrOptions[i].value);
        };
    }

    const getColor = () => document.getElementById('colorLine').value;

    function putColorLine() {
        const newColor = getColor();
        for( let i = 0; i < (optionCanvas.length - 1); i++ ) {
            optionCanvas[i].nextElementSibling.style.backgroundColor = newColor;
        };
    }

    function erase(e) {
        const x = e.clientX - this.offsetLeft;
        const y = e.clientY - this.offsetTop;
        ctxCanvas.beginPath();
        ctxCanvas.arc(
            x, 
            y,
            getSizeErase(),
            0,
            Math.PI * 2
        );
        ctxCanvas.fillStyle = '#fff'
        ctxCanvas.fill();
    }

    const getSizeErase = () => parseInt( document.getElementById('sizeErase').value );

    const showSizeErase = () => document.querySelector('.sizeEraseNumber').innerHTML = `${getSizeErase()}`;

    function draw(e) {
        const x = e.clientX - this.offsetLeft;
        const y = e.clientY - this.offsetTop;
        ctxCanvas.beginPath();
        ctxCanvas.arc(
            x,
            y,
            getSizeLine(),
            0,
            Math.PI * 2
        );
        ctxCanvas.fillStyle = getColor();
        ctxCanvas.fill();
    }

    // VERIFICAÇÕES
    let isErase = optionCanvas[3].checked;

    canvas.addEventListener('mousedown', () => {
        isErase = optionCanvas[3].checked;
        canvas.addEventListener('mousemove', !(isErase)?draw:erase);
    });

    canvas.addEventListener('mouseup', () => {
        canvas.removeEventListener('mousemove', !(isErase)?draw:erase);
    });

    canvas.addEventListener('mouseout', () => { 
        canvas.removeEventListener('mousemove', !(isErase)?draw:erase); 
    });

    document.getElementById('colorLine').addEventListener('change', putColorLine);

    document.getElementById('clearAll').addEventListener('click', () => {
        const isValid = confirm('Certeza que deseja apagar as alterações?');
        if( isValid ) {
            const canvasWidth = canvas.width;
            const canvasHeight = canvas.height;
            ctxCanvas.clearRect(0, 0, canvasWidth, canvasHeight);
        };
    });

    document.getElementById('sizeErase').addEventListener('change', showSizeErase);

    putColorLine();
    showSizeErase();

})()