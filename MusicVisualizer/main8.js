var pieces, radius, fft, mapMouseX, mapMouseY, audio, uploadedAudio, uploadAnim;
var colorPalette = ["#F5DF9F", "#FE0707","#FEF307", "#59E503", "#041999"];
var uploadLoading = false;

function preload() {
    audio = loadSound("songs/file8.mp3");
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


    fft = new p5.FFT();
    audio.loop();

    pieces = 4;
    radius = windowHeight / 4;

}

function draw() {

    if (uploadLoading) {
        uploadAnim.addClass('is-visible');
    } else {
        uploadAnim.removeClass('is-visible');
    }

    background(colorPalette[0]);

    fft.analyze();
    var bass = fft.getEnergy("bass");
    var treble = fft.getEnergy(150, 150);
    var mid = fft.getEnergy("mid");

    var mapbass = map(bass, 0, 255, -100, 600);
    var scalebass = map(bass, 0, 255, 0.5, 1.2);

    var mapMid = map(mid, 0, 255, -radius / 4, radius * 4);
    var scaleMid = map(mid, 0, 255, 1, 1.5);

    var mapTreble = map(treble, 0, 255, -radius / 3, radius * 3);
    var scaleTreble = map(treble, 2, 155, 7,1.5);

    mapMouseX = map(mouseX, 0, width, 2, 0.1);
    mapMouseY = map(mouseY, 0, height, windowHeight / 8, windowHeight / 6);

    pieces = mapMouseX;
    radius = mapMouseY;

    var mapScaleX = map(mouseX, 1, width, 1, 0);
    var mapScaleY = map(mouseY, 1, height, 0, 1);


    translate(width / 2, height / 2);

    for (i = 0; i < pieces; i += 0.01) {

        rotate(TWO_PI / pieces);


        push();
        strokeWeight(3);
        stroke(colorPalette[1]);
        scale(scalebass);
        rotate(frameCount * -0.5);
        line(mapbass, radius / 1, radius, radius);
        line(-mapbass, -radius / 1, radius, radius);
        pop();



        push();
        strokeWeight(3);
        stroke(colorPalette[2]);
        line(mapMid, radius, radius * 2, radius * 2);
        pop();



        push();
        stroke(colorPalette[3]);
        scale(scaleTreble);
        line(mapTreble, radius / 2, radius, radius);
        pop(2);

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
