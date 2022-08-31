import { directionMap } from "../../utils/helpers";
import enemyMap1 from './Assets/Enemy/enemyFull1.json'
import enemyMap2 from './Assets/Enemy/enemyFull2.json'
import enemyMap3 from './Assets/Enemy/enemyFull3.json'
import enemySpriteSheet1 from './Assets/Enemy/enemyFull1.png'
import enemySpriteSheet2 from './Assets/Enemy/enemyFull2.png'
import enemySpriteSheet3 from './Assets/Enemy/enemyFull3.png'
import { SpriteFrameType, SpriteSheetType } from "../../Types/GameTypes";

const enemySpriteSheets = [enemySpriteSheet1,enemySpriteSheet2,enemySpriteSheet3]
const enemyMaps = [enemyMap1,enemyMap2,enemyMap3]

export const getSpriteImage = (spriteSheet:string)=>{
  const sprite = new Image();
  sprite.src = spriteSheet;
  return sprite
}
export const getSpriteFrameByState = (state:string,spriteSheet:SpriteSheetType
,currentFrame:number):SpriteFrameType=>{
  switch (state) {
    default:
    case "idle":
      return spriteSheet.idle[currentFrame];
    case "move":
      return spriteSheet.move[currentFrame];
      case "die":
        return spriteSheet.die![currentFrame];
    
  }
}
export const getSpriteNextDirection = (askedDirection:number)=>{
  switch (askedDirection) {
    case directionMap.LEFT:
      return -1;
    default:
    case directionMap.RIGHT:
      return 1;
  }
}
export const changeSpriteDirection=(sprite:HTMLDivElement,direction:number)=>{
  sprite.style.transform = `scaleX(${direction})`;
}
export const getEnemySheetByCode = (code:number):
({spriteMap:typeof enemyMap1, spriteSheet:string})=>{
  if(code >= enemyMaps.length){
    code = Math.floor(Math.random()*3)
  }
  return {spriteMap:enemyMaps[code],spriteSheet:enemySpriteSheets[code]}
  // switch(code){
  //   case 0:
  //     return {map:enemyMap1,sheet:enemySpriteSheet1}
  //   case 1:
  //     return {map:enemyMap2,sheet:enemySpriteSheet2}
  //   case 2:
  //     return {map:enemyMap3,sheet:enemySpriteSheet3}
  //   default:
  //     let rnd = Math.floor(Math.random() * 3);
  //     return getEnemySheetByCode(rnd)
  // }
}


