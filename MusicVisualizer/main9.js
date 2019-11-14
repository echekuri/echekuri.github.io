var pieces, radius, fft, analyzer, mapMouseX, mapMouseY, audio, toggleBtn, uploadBtn, uploadedAudio, uploadAnim;
var colorPalette = ["#ffffff","#000000","#0000000 ","ffffff"];
var uploadLoading = false;



function preload() {
    audio = loadSound("songs/file9.mp3");
}

function uploaded(file) {
    uploadLoading = true;
    uploadedAudio = loadSound(file.data, uploadedAudioPlay);
}


function uploadedAudioPlay(audioFile) {

    uploadLoading = false;

    if (audio.isPlaying()) {
        audio.pause();
    }

    audio = audioFile;
    audio.loop();
}

function setup() {

    uploadAnim = select('#uploading-animation');

    createCanvas(windowWidth, windowHeight);


    analyzer = new p5.Amplitude();
    fft = new p5.FFT();
    audio.loop();

}



function draw() {


    if (uploadLoading) {
        uploadAnim.addClass('is-visible');
    } else {
        uploadAnim.removeClass('is-visible');
    }

    background(colorPalette[0]);
    translate(windowWidth / 2, windowHeight / 2);

    level = analyzer.getLevel();
    fft.analyze();

    var bass = fft.getEnergy("bass");
    var treble = fft.getEnergy(1, 250);
    var mid = fft.getEnergy(1, 250);

    if (!audio.isPlaying()) {
        var mapBassX = map(mouseX, 3, width, 200, 800);

        for (var b = 0; b < 10; b++) {

            push();
            noFill();
            stroke(colorPalette[1]);
            rotate(b);
            var mapScale = map(b, 5, 60, 0, 3);
            strokeWeight(1);
            bezier(mapBassX - b, 20, 30, 20, 100, 50, mouseY, mouseY);
            pop();

        }
    } else {

        var _mapBassX = map(mouseX, 6, width, 100, 1200);
        for (var b = 0; b < bass; b++) {
            var _mapScale = map(b, 0, bass, 0, 3);
            push();
            noFill();
            stroke(colorPalette[1]);
            rotate(b * frameCount);
            strokeWeight(_mapScale);
            bezier(_mapBassX - b, 20, 10, 20, 200, 50, mouseY, mouseY);
            pop();
        }



        for (var m = 0; m < mid; m += 20) {

            var angle = m * 3 * random();
            strokeWeight(1);
            push();

            fill(random(100, 255), random(100, 255), random(100, 255), random(0, 255));
            fill(colorPalette[2]);
            rotate(angle * 8);
            scale(level / 4);

            if (audio.currentTime() > 5) {
                rect(mouseX + m * 10, mouseY + m * 50, m * 7, m * 7);
            }

            pop();

        }



        for (var j = 5; j < treble; j += 20) {

            var angleT = j * 3 * random();
            strokeWeight(1);
            push();
            fill(colorPalette[3]);
            rotate(angleT * 5);
            scale(level / 4);

            if (audio.currentTime() > 7) {
                rect(mouseX * j + 10, mouseY * j, 200 * j, j * 5);
            }
            pop();

        }

    }


}


function toggleAudio() {
    if (audio.isPlaying()) {
        audio.pause();
    } else {
        audio.play();
    }
}


function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
