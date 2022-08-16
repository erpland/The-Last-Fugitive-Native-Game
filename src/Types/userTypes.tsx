export interface UserSignupType {
  nickname: string;
  email: string;
  password: string;
  avatarCode: number;
  avatarUrl:string;
  gender: number;
}

export interface UserLoginType {
  email: string;
  password: string;
}
export interface UserType{
  _id:string;
  nickname:string;
  email:string;
  password:string;
  current_level:number;
  level_rank:LevelRankType[]
  avatarCode:number;
  avaterUrl:string;
  gender:number;
  is_notification : boolean,
  time_of_register:Date,
  play_dates:PlayDatesType[] 
}

export interface LevelRankType{
  level_code:number;
  rank:number;
  popularity?:number
}

export interface PlayDatesType{
  start_date:Date;
  end_date:Date;
}
export interface UserContextType{
  currentUser:any;
  setCurrentUser:any
  // setCurrentUser:React.Dispatch<React.SetStateAction<UserType | null>>
  // currentUser:any;
  // setCurrentUser:any;

}


