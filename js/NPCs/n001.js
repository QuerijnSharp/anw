import { NPC } from "../NPC.js";
import { Player } from '../Player.js';
import { Animation } from '../Animation.js';

export class n001 extends NPC {
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
            dialogues: ["Hey and welcome to the future!\nYou have been in cryosleep for almost 100 years!\n", "Where're at the South Pole\nClimate change affected us just a little bit", "There is only one problem, we're stuck here.\nI need a new propeller for the plane\nCan you help me find one?"]
        },
        1: {
            item: {
                id: 1
            },
            dialogues: ["Thanks a lot for your help", "We'll soon go back home!", "Let's go to somewhere else!"],
            newMap: "a001"
        },
        2: {
            item: {
                id: -1
            },
            dialogues: ["Thanks a lot for your help", "We'll soon go back home!"],
            newMap: "a003"
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