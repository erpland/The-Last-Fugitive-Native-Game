export interface SpriteSheetType{
  idle:SpriteFrameType[]
  move:SpriteFrameType[]
  die?:SpriteFrameType[]
  attack?:SpriteFrameType[]
}
export interface SpriteFrameType{
  filename: string;
  frame: {
      x: number;
      y: number;
      w: number;
      h: number;
  };
  rotated: boolean;
  trimmed: boolean;
  spriteSourceSize: {
      x: number;
      y: number;
      w: number;
      h: number;
  };
  sourceSize: {
      w: number;
      h: number;
  };
}