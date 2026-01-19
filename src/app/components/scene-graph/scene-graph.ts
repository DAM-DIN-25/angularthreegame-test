import {
    Component,
    CUSTOM_ELEMENTS_SCHEMA,
    signal,
    viewChild, AfterViewChecked,
    inject
} from '@angular/core';
import { extend, NgtArgs } from 'angular-three';
import * as THREE from 'three';
import { NgtsOrbitControls } from 'angular-three-soba/controls';
import { NgtsContactShadows } from 'angular-three-soba/staging';
import { NgtrPhysics, NgtrCuboidCollider, NgtrAnyCollider } from 'angular-three-rapier';
import { D6Dice } from "../d6-dice/d6-dice";
import { DiceType } from '../../services/dice-type';
import { GameService } from '../../services/game-service';

extend(THREE);

@Component({
    selector: 'app-scene-graph',
    imports: [
        NgtArgs,
        NgtsOrbitControls,
        NgtrPhysics,
        NgtrCuboidCollider,
        NgtsContactShadows,
        NgtrAnyCollider,
        D6Dice
    ],
    templateUrl: './scene-graph.html',
    styleUrl: './scene-graph.css',
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SceneGraph implements AfterViewChecked {

    protected readonly Array = Array;
    protected readonly Math = Math;

    gameService = inject(GameService);

    ground = viewChild<THREE.Box3>('ground');

    limitHeight = signal(10);
    limitWidth = signal(6);
    dices = signal<DiceType[]>([ ]);

    groundInitialized = false;


    ngAfterViewChecked() {
        if (this.ground() && !this.groundInitialized) {
            this.groundInitialized = true;
        }
    }

    constructor() {
        this.dices.set(
            [
                this.gameService.pokerDice,
                // this.gameService.pokerDice,
                // this.gameService.pokerDice,
                // this.gameService.pokerDice,
                // this.gameService.pokerDice,
                this.gameService.d6,
            ]
        );

    }

}
