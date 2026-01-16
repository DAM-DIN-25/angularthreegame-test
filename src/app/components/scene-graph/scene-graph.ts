import {
    Component,
    CUSTOM_ELEMENTS_SCHEMA,
    signal
} from '@angular/core';
import { extend, NgtArgs } from 'angular-three';
import * as THREE from 'three';
import { NgtsOrbitControls } from 'angular-three-soba/controls';
import { NgtsContactShadows } from 'angular-three-soba/staging';
import { NgtrPhysics, NgtrRigidBody, NgtrCuboidCollider } from 'angular-three-rapier';
import { Dice } from "../dice/dice";
import { PokerDice } from "../dice/dice-gltf-instance";

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
    Dice
],
    templateUrl: './scene-graph.html',
    styleUrl: './scene-graph.css',
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SceneGraph {
    protected Math = Math;
    limitHeight = signal(10);
    limitWidth = signal(7);


}
