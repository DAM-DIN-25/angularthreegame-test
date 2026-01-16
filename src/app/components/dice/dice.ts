import { Component, CUSTOM_ELEMENTS_SCHEMA, input, output, signal, viewChild } from '@angular/core';
import { beforeRender, NgtArgs } from 'angular-three';
import * as THREE from 'three';
import { NgtrRigidBody, afterPhysicsStep, NgtrAnyCollider, NgtrCylinderCollider } from 'angular-three-rapier';

import { PokerDice } from "./dice-gltf-instance";

@Component({
    selector: 'app-dice',
    imports: [
        NgtrRigidBody,
        PokerDice,
        NgtArgs,
        NgtrAnyCollider,
        NgtrCylinderCollider
    ],
    templateUrl: './dice.html',
    styleUrl: './dice.css',
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Dice {
    rotation = signal<[number, number, number]>([0, 0, 0]);
    initialVelocity = signal<[number, number, number]>([0, 0, 0]);
    initialAngularVelocity = signal<[number, number, number]>([0, 0, 0]);
    position = input<[number, number, number]>([0, 4, 0]);

    result = output<string>();

    diceObject = viewChild.required<NgtrRigidBody>('dice');

    private resultEmitted = false;
    private initialized = false;
    private canCheckResult = false;

    private resultsMap: string[] = [
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
    ];

    onSensorEnter(event: any, id: number) {
        // if (event.target.rigidBody.userdata)
        console.log('Sensor entered by body with:', event.target);

        if (event.target.rigidBodyObject.userdata)
            console.warn('rigidBodyObject:', event.target.rigidBodyObject.userdata);

    }

    constructor() {
        setTimeout(() => {
            this.canCheckResult = true;
        }, 5000);

        // afterPhysicsStep(() => {
        //     this.diceObject()?.rigidBody()?.worldCom.

        beforeRender(() => {
            if (this.initialized && !this.resultEmitted && this.canCheckResult) {
                this.checkResult();
            }
        });
    }

    ngAfterViewInit() {
        console.log('Dice rigid body initialized:', this.diceObject());
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
        if (!this.diceObject()?.rigidBody()?.isMoving()) {
            return;
        }

        // check which face is up based on the dice rotation
        const upVector = new THREE.Vector3(0, 1, 0);
        const diceMatrix = new THREE.Matrix4();
        const rotation = this.diceObject()?.rigidBody()?.rotation();
        console.log('Dice rotation:', rotation);
        diceMatrix.makeRotationFromEuler(new THREE.Euler(rotation?.x, rotation?.y, rotation?.z));
        const transformedUp = upVector.applyMatrix4(diceMatrix).normalize();

        let bestDot = -1;
        let bestFace: number = -1;

        const faceNormals = {
            1: new THREE.Vector3(0, 1, 0),
            2: new THREE.Vector3(0, 0, -1),
            3: new THREE.Vector3(1, 0, 0),
            4: new THREE.Vector3(-1, 0, 0),
            5: new THREE.Vector3(0, 0, 1),
            6: new THREE.Vector3(0, -1, 0),
        };

        for (const [face, normal] of Object.entries(faceNormals)) {
            const dot = transformedUp.dot(normal);
            if (dot > bestDot) {
                bestDot = dot;
                bestFace = Number(face);
            }
        }

        this.result.emit(this.resultsMap[bestFace - 1]);

        this.resultEmitted = true;
        console.log('Dice result:', this.resultsMap[bestFace - 1]);
    }
}
