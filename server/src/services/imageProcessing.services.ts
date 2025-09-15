import { Injectable } from "@nestjs/common";

import * as sharp from "sharp"
import { Vibrant } from "node-vibrant/node";


@Injectable()
export class ImageProcessingServices {


  static rgbToHex(r: number, g: number, b: number): string {
   
    const clamp = (val: number) => Math.max(0, Math.min(255, val));

    return (
      "#" +
      [clamp(r), clamp(g), clamp(b)]
        .map((x) => x.toString(16).padStart(2, "0")) 
        .join("")
    );
  }

  async resizeImage(width: number, height: number, buffer: Buffer): Promise<Buffer> {


    let processedBuffer = await sharp(buffer)
      .resize(width, height, { fit: "cover", position: "center" })
      .jpeg({ quality: 75 })
      .toBuffer()



    return processedBuffer
  }
  get_orientation(width: number, height: number) {
    if (width > height) {
      return 'landscape';
    } else if (height > width) {
      return 'portrait';
    } else {
      return 'square';
    }
  }
  async analyzeImage(file: Buffer) {

    const palette = await Vibrant.from(file).getPalette();

    return { palette };
  }
}