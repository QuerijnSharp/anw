import { NPC } from "../NPC.js";
import { Player } from '../Player.js';
import { Animation } from '../Animation.js';

export class n009 extends NPC {
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
            dialogues: ["Hey I'm Mark, I've been living here on Mars for 2 years now and it's great!\nHowever, it's really expensive and the gravity is 3 times less strong than on earth\nOn a day like this, it's like 20 degrees\nAt night it can get to -80 degrees though.", "We use electrolysis to get oxygen and grow our own plants!", "Have you seen the moon yet?"],
            newMap: "a002"
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