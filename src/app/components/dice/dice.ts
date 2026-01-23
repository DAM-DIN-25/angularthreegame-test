import { Component, CUSTOM_ELEMENTS_SCHEMA, input, output, signal, viewChild, AfterViewInit } from '@angular/core';
import { beforeRender } from 'angular-three';
import * as THREE from 'three';
import { NgtrRigidBody } from 'angular-three-rapier';

import { DiceGltfInstance } from "./dice-gltf-instance";

@Component({
    selector: 'app-dice',
    imports: [
        NgtrRigidBody,
        DiceGltfInstance
    ],
    templateUrl: './dice.html',
    styleUrl: './dice.css',
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Dice implements AfterViewInit {

    rotation = signal<[number, number, number]>([0, 0, 0]);
    initialVelocity = signal<[number, number, number]>([0, 0, 0]);
    initialAngularVelocity = signal<[number, number, number]>([0, 0, 0]);

    position = input<[number, number, number]>([0, 4, 0]);

    ground = input<NgtrRigidBody>;

    result = output<string>();

    hovered = signal(false);

    diceObject = viewChild.required<NgtrRigidBody>('dice');

    private resultEmitted = false;
    private initialized = false;

    private resultsMap: string[] = [
        'K',  // 0 - Down
        'Q',  // 1 - Top
        '9',  // 2 - Right
        'A',  // 3 - Left
        '10', // 4 - Back
        'J',  // 5 - Front
    ];

    constructor() {

        beforeRender(() => {
            if (this.diceObject().rigidBody()?.isSleeping() && this.initialized && !this.resultEmitted) {
                this.checkResult();
            }
        });
    }

    onDiceClick() {
        // reroll the dice
        this.initialize();
        this.resultEmitted = false;
    }

    ngAfterViewInit() {
        this.initialize();
    }

    initialize() {
        // random initial rotation
        this.rotation.set([
            Math.random() * Math.PI * 2,
            Math.random() * Math.PI * 2,
            Math.random() * Math.PI * 2
        ]);

        // random initial velocity
        this.initialVelocity.set([
            (Math.random() - 0.5) * 5,
            Math.random() * 5 + 5,
            (Math.random() - 0.5) * 5
        ]);

        // random initial angular velocity
        this.initialAngularVelocity.set([
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10
        ]);
        this.initialized = true;
    }

    checkResult() {
        if (!this.diceObject()?.rigidBody()?.isSleeping() || this.resultEmitted) {
            return;
        }

        const object3D = this.diceObject().objectRef.nativeElement;

        // Define directions for each face of the dice
        const faceDirections = [
            new THREE.Vector3(0, 1, 0),   // Up
            new THREE.Vector3(0, -1, 0),  // Down
            new THREE.Vector3(1, 0, 0),   // Right
            new THREE.Vector3(-1, 0, 0),  // Left
            new THREE.Vector3(0, 0, 1),   // Front
            new THREE.Vector3(0, 0, -1)   // Back
        ];

        // Create a box representing the ground area
        const groundBox = new THREE.Box3(new THREE.Vector3(-10, -1, -10), new THREE.Vector3(10, -0.5, 10));

        // For each face, cast a ray to see if it intersects with the ground box
        faceDirections.forEach((normal, index) => {

            // Create a ray starting from the dice center in the direction of the face normal
            const ray = new THREE.Ray(object3D.position, normal.applyEuler(object3D.rotation));

            if (ray.intersectBox(groundBox, new THREE.Vector3())) {
                this.result.emit(this.resultsMap[index]);
                this.resultEmitted = true;
                console.log('Dice result:', this.resultsMap[index], 'from face index', index);
            }
        });
    }

}
