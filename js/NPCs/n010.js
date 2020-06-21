import { NPC } from "../NPC.js";
import { Player } from '../Player.js';
import { Animation } from '../Animation.js';

export class n010 extends NPC {
    constructor(x, y, spriteSheet, direction) {
        super(x, y, spriteSheet);
        this.direction = direction;
    }

    currentStage = 0;

    stages = {
        0: {
            item: {
                id: 0
            },
            dialogues: ["Hello, I'm one of the researches here!\nWe've been researching ways to survive here on Mars\nLuckily there are more planets like Mars, being in a Goldilock zone\nWe're currently looking to go to TOI 700 b, -c & -d", "To survive here on Mars we recycle as much water as we can\nAnd use the sun as our main energy source\nWe also have houses to prevent us from the radiation,\nExtreme temperature differences and dust storms."]
        },
        1: {
            item: {
                id: 1
            },
            dialogues: ["Good job!", "It seems like the motor is broken", "Maybe you can help me find a new one?"],
            newMap: "a001"
        },
        2: {
            item: {
                id: -1
            },
            dialogues: ["Thanks a lot for your help", "We'll soon go back home!"],
            newMap: "a001"
        }
    }

    getDialogue() {
        return this.stages[this.currentStage].dialogues[this.currentDialogue];
    }

    /**
     * 
     * @param {Player} player 
     */
    interact(player, map) {
        if (!this.interacting)
            super.interact(player);
        this.interacting = true;
        var stage = this.stages[this.currentStage];
        if (player.inventory.slots.some(s => s.id == stage.item.id)) {
            player.inventory.removeItem(stage.id);
            this.currentStage++;
            this.currentDialogue = -1;
        } else if (stage.newMap && this.currentDialogue == stage.dialogues.length - 1) {
            map.loadMap(stage.newMap);
        }
        else {

        }
        this.currentDialogue++;
        if (this.currentDialogue >= stage.dialogues.length)
            this.currentDialogue = 0;
        

    }

    endInteraction() {
        this.interacting = false;
        this.currentDialogue = -1;
    }
}