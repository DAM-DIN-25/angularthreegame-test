import { Component, CUSTOM_ELEMENTS_SCHEMA, input, output, signal, viewChild } from '@angular/core';
import { beforeRender, NgtArgs } from 'angular-three';
import * as THREE from 'three';
import { NgtrRigidBody, NgtrAnyCollider, NgtrCylinderCollider } from 'angular-three-rapier';

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
        console.log('Sensor entered by body with:', event.target);

        if (event.target.rigidBodyObject.userdata)
            console.warn('rigidBodyObject:', event.target.rigidBodyObject.userdata);

    }

    constructor() {
        setTimeout(() => {
            this.canCheckResult = true;
        }, 5000);

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


    }
}
