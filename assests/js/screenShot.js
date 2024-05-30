;(function(){
    const canvas = document.getElementById('paint');

    function insertStyleCanvas() {
        canvas.style.boxShadow = '0px 0px 10px 1px rgb(0 0 0/ .5)';
        canvas.style.borderRadius = '10px';
    }

    function removeStyleCanvas() {
        canvas.style.boxShadow = 'none';
        canvas.style.borderRadius = '0px';
    }

    document.getElementById('screenShot').addEventListener('click', function() {
        const rect = canvas.getBoundingClientRect();
        const namePng = prompt('Gostaria de nomear o arquivo?')

        removeStyleCanvas();

        html2canvas(document.body, {
            x: rect.left,
            y: rect.top,
            width: rect.width,
            height: rect.height,
            windowWidth: document.documentElement.scrollWidth,
            windowHeight: document.documentElement.scrollHeight
        }).then(function(canvas) {
            var link = document.createElement('a');
            link.href = canvas.toDataURL();
            link.download = Boolean(namePng)?`${namePng}.png`:`screenshot.png`;
            link.click();
        });

        insertStyleCanvas();
    });
})()