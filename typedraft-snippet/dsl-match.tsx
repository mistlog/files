import { MatchDSL } from "draft-dsl-match";

type Vector1 = { x: number };
type Vector2 = { x: number; y: number };
type Vector3 = {
    x: number;
    y: number;
    z: number;
};
type Vector = Vector1 | Vector2 | Vector3;

const vector: Vector = { x: 1 };
const result = Λ<string>("match")` ${vector as Vector} 
  ${{ x: 1, y: 1, z: 1 }} -> ${"vector3"}
  ${{ x: 2, y: 1 }} -> ${"vector2"}
  ${{ x: 1 }} -> ${"vector1"}`;

console.log(result);