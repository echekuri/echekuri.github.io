var pieces, radius, fft, mapMouseX, mapMouseY, audio, uploadedAudio, uploadAnim;
var bgColor = "#F9E603";
var bassColor = ["#ffffff", "#F3400F"];
var midColor = "#F3BF0F";
var trembleColor = "#F3400F";
var uploadLoading = false;

function preload() {
	audio = loadSound("songs/file10.mp3");
}


function uploaded(file) {
	uploadLoading = true;
	uploadedAudio = loadSound(file.data, uploadedAudioPlay);
}





function setup() {

	uploadAnim = select('#uploading-animation');
	createCanvas(windowWidth, windowHeight);
	pieces = 30;
	radius = windowHeight / 4;



	fft = new p5.FFT();
	audio.loop();

}



function draw() {

	if (uploadLoading) {
		uploadAnim.addClass('is-visible');
	} else {
		uploadAnim.removeClass('is-visible');
	}

	background(bgColor);
	strokeWeight(5);

	fft.analyze();

	var bass = fft.getEnergy("bass");
	var treble = fft.getEnergy(120, 130);
	var mid = fft.getEnergy("mid");

	var mapMid = map(mid, 0, 255, -radius, radius);
	var scaleMid = map(mid, 0, 175, 1, 1.5);

	var mapTreble = map(treble, 0, 255, -radius / 2, radius * 2);
	var scaleTreble = map(treble, 10, 255, 0.5, 2);

	var mapbass = map(bass, 14, 255, 0, 300);
	var scalebass = map(bass, 0, 255, 0, 0.1);

	mapMouseX = map(mouseX, 0, width, 200, 300);
	mapMouseScale = map(mouseX, 3, width, 0.55, 0.5);
	mapMouseY = map(mouseY, 0, height, windowHeight / 2, windowHeight);

	pieces = 20;
	radius = 200;

	translate(windowWidth / 2, windowHeight / 2);

	for (i = 0; i < pieces; i += 2) {

		rotate(TWO_PI /pieces/2);

		noFill();



		push();
		strokeWeight(8);
		stroke(bassColor[0]);
		scale(scalebass + mapMouseScale);
		rotate(-frameCount * 0.12);
		point(mapbass, radius / 3);
		stroke(bassColor[1]);
		strokeWeight(5);
		line(mapMouseX, mouseY, radius, radius);
		pop();




		push();
		stroke(midColor);
		strokeWeight(4);
		rotate(-frameCount * 0.12);
		point(mapMid, radius);
		pop();



		push();
		stroke(trembleColor);
		strokeWeight(4);
		scale(scaleTreble);
		rotate(frameCount * 0.12);
		point(-100, radius / 3);
		point(100, radius / 3);
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
