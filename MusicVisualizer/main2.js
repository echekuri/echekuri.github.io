var pieces, radius, fft, mapMouseX, mapMouseY, toggleBtn, audio, uploadBtn, uploadedAudio, uploadAnim;
var colorPalette = ["#000","rgba(207, 0, 15, 1)", "##ffffff", "#ffffff"];
var uploadLoading = false;

function preload() {
	audio = loadSound("songs/file2.mp3");
}




function setup() {

	uploadAnim = select('#uploading-animation');

	createCanvas(windowWidth, windowHeight);


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

	noFill();

	fft.analyze();

	var bass = fft.getEnergy("bass");
	var treble = fft.getEnergy("treble");
	var mid = fft.getEnergy("mid");

	var mapMid = map(mid, 0, 255, -radius, radius);
	var scaleMid = map(mid, 0, 255, 1, 1.5);

	var mapTreble = map(treble, 0, 255, -radius, radius);
	var scaleTreble = map(treble, 0, 255, 1, 1.5);

	var mapbass = map(bass, 0, 255, -100, 800);
	var scalebass = map(bass, 0, 255, 0, 0.8);

	mapMouseX = map(mouseX, 0, width, 4, 10);
	mapMouseY = map(mouseY, 0, height, windowHeight / 4, windowHeight);

	pieces = mapMouseX;
	radius = mapMouseY;

	translate(windowWidth / 2, windowHeight / 2);

	strokeWeight(1);

	for (i = 0; i < pieces; i += 0.5) {

		rotate(TWO_PI / pieces);



		push();
		strokeWeight(5);
		stroke(colorPalette[1]);
		scale(scalebass);
		rotate(frameCount * -0.5);
		line(mapbass, radius / 2, radius, radius);
		line(-mapbass, -radius / 2, radius, radius);
		pop();




		push();
		strokeWeight(0.5);
		stroke(colorPalette[2]);
		scale(scaleMid);
		line(mapMid, radius / 2, radius, radius);
		line(-mapMid, -radius / 2, radius, radius);
		pop();


		
		push();
		stroke(colorPalette[3]);
		scale(scaleTreble);
		line(mapTreble, radius / 2, radius, radius);
		line(-mapTreble, -radius / 2, radius, radius);
		pop();

	}

}




function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}
