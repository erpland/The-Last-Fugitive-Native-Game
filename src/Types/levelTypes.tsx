export interface LevelType {
  _id?:string;
  code:number;
  map:number[][];
  player:PlayerType;
  enemies: EnimiesType[];
  step_cap:StepCapType[];
  diffculty:number
  end_point:number[]
}
export interface PlayerType{
  start_position:number[];
  startDirection:string
}
export interface EnimiesType{
  code:number;
  start_position:number[];
  startDirection:string
}
export interface StepCapType{
  code:number;
  step:number
}
export interface HintsTypes{
  name:string
  description:string
}
export interface LevelContextType{
  allLevels: LevelType[] | [];
  setAllLevels:React.Dispatch<React.SetStateAction<LevelType[] | []>>;
  currentLevel:LevelType | {};
  setCurrentLevel:React.Dispatch<React.SetStateAction<LevelType | {}>>;
  hints:HintsTypes[]
  setHints:React.Dispatch<React.SetStateAction<HintsTypes[] | []>>;
}

