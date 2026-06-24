declare module 'three' {
  export class Clock {
    getElapsedTime(): number;
  }
  export class Scene {
    add(object: any): void;
  }
  export class OrthographicCamera {
    position: { z: number };
    constructor(left: number, right: number, top: number, bottom: number, near: number, far: number);
  }
  export class WebGLRenderer {
    domElement: HTMLCanvasElement;
    constructor(parameters?: any);
    setPixelRatio(value: number): void;
    setSize(width: number, height: number, updateStyle?: boolean): void;
    getPixelRatio(): number;
    dispose(): void;
    render(scene: any, camera: any): void;
  }
  export class Vector2 {
    x: number;
    y: number;
    constructor(x?: number, y?: number);
    set(x: number, y: number): this;
    lerp(v: Vector2, alpha: number): this;
    copy(v: Vector2): this;
  }
  export class Vector3 {
    x: number;
    y: number;
    z: number;
    constructor(x?: number, y?: number, z?: number);
    set(x: number, y: number, z: number): this;
    lerp(v: Vector3, alpha: number): this;
    copy(v: Vector3): this;
  }
  export class ShaderMaterial {
    constructor(parameters?: any);
    dispose(): void;
  }
  export class PlaneGeometry {
    constructor(width?: number, height?: number, widthSegments?: number, heightSegments?: number);
    dispose(): void;
  }
  export class Mesh {
    constructor(geometry?: any, material?: any);
  }
}
