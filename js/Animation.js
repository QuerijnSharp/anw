export class Animation {
    constructor(animationCycle, animationData) {
        this.frames = 0;
        this.animationCycle = animationCycle;
        this.animationData = animationData;
    }

    update() {
        if (this.frames % this.animationCycle == 0) {
            this.animationData.index++;
            if (this.animationData.index >= this.animationData.pattern.length)
                this.animationData.index = 0;
        }
        this.frames++;
    }

    getCurrentFrame() {
        return this.animationData.pattern[this.animationData.index];
    }
}