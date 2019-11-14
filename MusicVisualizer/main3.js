var pieces, radius, fft, mapMouseX, mapMouseY, audio, toggleBtn, uploadBtn, uploadedAudio, uploadAnim;
var bgColor = "#000000";
var bassColor = ["#C29603", "#fffffff"];
var midColor = "#C60101";
var trembleColor = "#A99964";
var uploadLoading = false;

function preload() {
	audio = loadSound("songs/file3.mp3");
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
	var treble = fft.getEnergy(100, 130);
	var mid = fft.getEnergy("mid");

	var mapMid = map(mid, 0, 255, -radius, radius);
	var scaleMid = map(mid, 0, 255, 1, 1.5);

	var mapTreble = map(treble, 0, 255, -radius / 2, radius * 2);
	var scaleTreble = map(treble, 10, 255, 0.5, 2);

	var mapbass = map(bass, 0, 255, 0, 200);
	var scalebass = map(bass, 0, 355, 0, 0.8);

	mapMouseX = map(mouseX, 0, width, 100, 200);
	mapMouseScale = map(mouseX, 0, width, 0.35, 0.2);
	mapMouseY = map(mouseY, 0, height, windowHeight / 4, windowHeight);

	pieces = 20;
	radius = 200;

	translate(windowWidth / 2, windowHeight / 2);

	for (i = 0; i < pieces; i += 1) {

		rotate(TWO_PI / pieces);

		noFill();



		push();
		strokeWeight(8);
		stroke(bassColor[0]);
		scale(scalebass + mapMouseScale);
		rotate(-frameCount * 0.10);
		point(mapbass, radius / 2);
		stroke(bassColor[1]);
		strokeWeight(4);
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
		rotate(frameCount * 0.14);
		point(-100, radius / 2);
		point(100, radius / 2);
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
