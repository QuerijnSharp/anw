export class Stats {
	beginTime = -1;
	frames = 0;
	fps = -1;
	frameMS = -1;

	constructor() {
		this.prevTime = ( performance || Date ).now();
	}

	begin() {
		this.beginTime = (performance || Date).now();
	}

	end() {	
		this.frames++;

		var time = (performance || Date).now();

		this.frameMS = time - this.beginTime;
		if (time >= this.prevTime + 1000) {
			this.fps = (this.frames * 1000) / (time - this.prevTime);
			this.prevTime = time;
			this.frames = 0;
		}
	}
}