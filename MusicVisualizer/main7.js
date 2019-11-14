var pieces, radius, fft, analyzer, mapMouseX, mapMouseY, audio, toggleBtn, uploadBtn, uploadedAudio, uploadAnim;
var colorPalette = ["#000000", "#ffffff", "#F0FF09", "#ffffff"];
var uploadLoading = false;



function preload() {
	audio = loadSound("songs/file7.mp3");
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

	var bass = fft.getEnergy(100, 150);
	var treble = fft.getEnergy(150, 250);
	var mid = fft.getEnergy("mid");

	var mapMid = map(mid, 0, 255, -100, 200);
	var scaleMid = map(mid, 0, 255, 1, 1.5);

	var mapTreble = map(treble, 0, 255, 200, 350);
	var scaleTreble = map(treble, 0, 255, 0, 1);

	var mapbass = map(bass, 0, 255, 50, 200);
	var scalebass = map(bass, 0, 255, 0.05, 1.2);

	mapMouseX = map(mouseX, 0, width, 1, 50);
	mapMouseXbass = map(mouseX, 0, width, 1, 5);
	mapMouseY = map(mouseY, 0, height, 2, 6);

	pieces = 20;
	radius = 100;

	for (i = 0; i < pieces; i += 0.2) {

		rotate(TWO_PI / (pieces / 3));

		noFill();


		push();
		stroke(colorPalette[1]);
		rotate(frameCount * 0.02);
		strokeWeight(0.4);
		polygon(mapbass + i, mapbass - i, mapMouseXbass * i, 3);
		pop();



		push();
		stroke(colorPalette[2]);
		strokeWeight(0.3);
		polygon(mapMid + i / 2, mapMid - i * 2, mapMouseX * i, 7);
		pop();



		push();
		stroke(colorPalette[3]);
		strokeWeight(0.3);
		scale(mouseX * 0.0015);
		rotate((mouseX * 0.012));
		polygon(mapTreble + i / 2, mapTreble - i / 2, mapMouseY * i / 2, 3);
		pop();

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

function polygon(x, y, radius, npoints) {
	var angle = TWO_PI / npoints;
	beginShape();
	for (var a = 0; a < TWO_PI; a += angle) {
		var sx = x + cos(a) * radius;
		var sy = y + sin(a) * radius;
		vertex(sx, sy);
	}
	endShape(CLOSE);
}
