import { Component, CUSTOM_ELEMENTS_SCHEMA, effect, inject, input, output, signal, viewChild, AfterViewInit } from '@angular/core';
import { beforeRender, NgtArgs } from 'angular-three';
import { NgtsRoundedBox } from 'angular-three-soba/abstractions';
import { NgtrRigidBody, NgtrCuboidCollider } from 'angular-three-rapier';
import { DiceFace } from '../dice-face/dice-face';

import * as THREE from 'three';
import { GameService } from '../../services/game-service';
import { DiceResult, DiceType } from '../../services/dice-type';

@Component({
    selector: 'app-d6-dice',
    imports: [NgtArgs, NgtsRoundedBox, NgtrRigidBody, DiceFace, NgtrCuboidCollider],
    templateUrl: './d6-dice.html',
    styleUrl: './d6-dice.css',
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class D6Dice implements AfterViewInit {
    protected readonly Math = Math;
    protected readonly Object = Object;

    diceConfig = input.required<DiceType>();
    position = input<[number, number, number]>([Math.random(), 4, Math.random()]);
    color = input<string>('white');
    
    result = output<string>();
    
    gameService = inject(GameService);

    diceRef = viewChild.required(NgtrRigidBody);

    velocity = signal<[number, number, number]>([0, 0, 0]);
    angularVelocity = signal<[number, number, number]>([0, 0, 0]);
    hovered = signal(false);

    deviceAcceleration = this.gameService.deviceAcceleration;

    private resultEmitted = false;
    private initialized = false;

    // private resultsMap: string[] = [
    //     '9',  // 0 - Down
    //     'A',  // 1 - Top
    //     'K',  // 2 - Right
    //     '10',  // 3 - Left
    //     'Q', // 4 - Back
    //     'J',  // 5 - Front
    // ];

    detectReroll = effect(() => {
        const acceleration = this.deviceAcceleration();
        if (Math.abs(acceleration) > 5) {
            this.reroll();
        }
    });

    ngAfterViewInit() {
        this.reroll();
    }

    constructor() {
        beforeRender(() => {
            if (this.diceRef().rigidBody()?.isSleeping() && this.initialized && !this.resultEmitted) {
                this.checkResult();
            }
        });
    }

    reroll() {
        const dice = this.diceRef();

        if (!dice || !dice.rigidBody() || !dice.rigidBody()!.isSleeping()) {
            return;
        }

        this.resultEmitted = false;
        this.initialized = true;

        this.velocity.set([
            (Math.random() - 0.5) * 5,
            Math.random() * 5 + 10,
            (Math.random() - 0.5) * 5
        ]);

        this.angularVelocity.set([
            (Math.random() - 0.5) * 5,
            (Math.random() - 0.5) * 5,
            (Math.random() - 0.5) * 5
        ]);

        dice.rigidBody()!.setLinvel(new THREE.Vector3(...this.velocity()), true);
        dice.rigidBody()!.setAngvel(new THREE.Vector3(...this.angularVelocity()), true);

    }

    onDiceClick() {
        this.reroll();
    }

    checkResult() {
        if (!this.diceRef()?.rigidBody()?.isSleeping() || this.resultEmitted) {
            return;
        }

        const object3D = this.diceRef().objectRef.nativeElement;

        // Define directions for each face of the dice
        const faceDirections = {
            top: new THREE.Vector3(0, 1, 0),   // Up
            bottom: new THREE.Vector3(0, -1, 0),  // Down
            right: new THREE.Vector3(1, 0, 0),   // Right
            left: new THREE.Vector3(-1, 0, 0),  // Left
            front: new THREE.Vector3(0, 0, 1),   // Front
            back: new THREE.Vector3(0, 0, -1)   // Back
        };

        // Create a box representing the ground area
        const topBox = new THREE.Box3(new THREE.Vector3(-100, 50, -100), new THREE.Vector3(100, 51, 100));

        const results: string[] = [];
        // For each face, cast a ray to see if it intersects with the ground box
        // faceDirections.forEach((normal, index) => {
        Object.entries(faceDirections).forEach(([key, normal]) => {

            // Create a ray starting from the dice center in the direction of the face normal
            const ray = new THREE.Ray(object3D.position, normal.applyEuler(object3D.rotation));

            if (ray.intersectBox(topBox, new THREE.Vector3())) {
                results.push(key);
            }
        });

        if (results.length <= 1) {
            const finalResult: DiceResult = {
                diceType: this.diceConfig(),
                face: this.diceConfig().faces.find(face => face.side === results[0])!,
            };
            
            this.result.emit(finalResult.face.key);
            this.resultEmitted = true;
            console.log('Dice result:', finalResult.face.key);
        }
        else {
            console.log('Multiple faces detected touching ground, rerolling...');
            this.reroll();
        }
    }
}
