declare module 'colorthief' {
    export default class ColorThief {
      constructor();
      getColor(sourceImage: HTMLImageElement | HTMLVideoElement | HTMLCanvasElement, quality?: number): [number, number, number];
      getPalette(sourceImage: HTMLImageElement | HTMLVideoElement | HTMLCanvasElement, colorCount?: number, quality?: number): Array<[number, number, number]>;
    }
  }