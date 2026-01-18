import {
    Component,
    CUSTOM_ELEMENTS_SCHEMA,
    ElementRef,
    signal,
    viewChild
} from '@angular/core';
import { beforeRender, extend, NgtArgs, NgtRenderState } from 'angular-three';
import * as THREE from 'three';
import { NgtsOrbitControls } from 'angular-three-soba/controls';
import { NgtsContactShadows } from 'angular-three-soba/staging';
import { NgtrPhysics, NgtrRigidBody, NgtrCuboidCollider, NgtrAnyCollider } from 'angular-three-rapier';
import { Dice } from "../dice/dice";
import { DiceGltfInstance } from "../dice/dice-gltf-instance";
import { D6Dice } from "../d6-dice/d6-dice";

extend(THREE);

@Component({
    selector: 'app-scene-graph',
    imports: [
    NgtArgs,
    NgtsOrbitControls,
    NgtrPhysics,
    NgtrRigidBody,
    NgtrCuboidCollider,
    NgtsContactShadows,
    Dice,
    NgtrAnyCollider,
    D6Dice
],
    templateUrl: './scene-graph.html',
    styleUrl: './scene-graph.css',
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SceneGraph {

    protected readonly Array = Array;
    protected readonly Math = Math;

    ground = viewChild<THREE.Box3>('ground');

    limitHeight = signal(10);
    limitWidth = signal(10);

    groundInitialized = false;

    dices = signal<number[]>([]);

    ngAfterViewChecked() {
        if (this.ground() && !this.groundInitialized) {
            console.log('Ground rigid body in AfterViewChecked:', this.ground());
            this.groundInitialized = true;
        }
    }

    constructor() {

        this.dices.set([1]);
        
        beforeRender((state: NgtRenderState) => {


            
        });
    }

}
