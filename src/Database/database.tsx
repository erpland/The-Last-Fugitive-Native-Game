import {UserSignupType,UserLoginType,PlayDatesType,LevelRankType} from '../Types/userTypes'
const SERVER = "https://the-last-fugitive.herokuapp.com/api/";

//gets
export const fetchUserByid = async (id: string) => {
  const requestOptions = {
    method: "get",
    headers: { "Content-type": "application/json; charset=UTF-8" },
  };
  try {
    const data = await fetch(SERVER + "users/" + id, requestOptions);
    if (data.ok) {
      const json = await data.json();
      return json;
    }
    return new Error("Error while fetch data in get user by id");
  } catch {
    throw new Error("Network Error!")
  }
};
export const getAllLevels = async () => {
  const requestOptions = {
    method: "get",
    headers: { "Content-type": "application/json; charset=UTF-8" },
  };
  try {
    const data = await fetch(SERVER + "levels/",requestOptions);
    if (data.ok) {
      const json = await data.json();
      return json;
    }
    return new Error("Error while fetch data in get all levels");
  } catch {
    throw new Error("Network Error!")
  }
};
export const getAllHints = async () => {
  const requestOptions = {
    method: "get",
    headers: { "Content-type": "application/json; charset=UTF-8" },
  };
  try {
    const data = await fetch(SERVER + "hints/",requestOptions);
    if (data.ok) {
      const json = await data.json();
      return json;
    }
    return  new Error("Error while fetch data in get all hints");
  } catch {
    throw new Error("Network Error")
  }
};
export const getAllAvatars = async ()=>{
  const requestOptions = {
    method: "get",
    headers: { "Content-type": "application/json; charset=UTF-8" },
  };
  try {
    const data = await fetch(SERVER + "avatars/",requestOptions);
    if (data.ok) {
      const json = await data.json();
      return json;
    }
    return new Error("Error while fetch data in get all hints");
  } catch {
    throw new Error("Network Error")
  }
}

//posts
export const registerUser = async (user: UserSignupType) => {
  console.log("before",user)
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(user),
  };
  try {
    const data = await fetch(SERVER + "users/register", requestOptions);
    // if (data.status === 409) {
    //   console.log(data.status)
    //   return {};
    // }
    if (data.ok) {
      const json = await data.json();
      console.log("after",json);
      return json;
    }
    return null;
  } catch {
    throw new Error("Error while fetching data in register");
  }
};
export const loginUser = async (user: UserLoginType) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8"},
    body: JSON.stringify(user),
  };
  try {
    const data = await fetch(SERVER + "users/login", requestOptions);
    if (data.ok) {
      const json = await data.json();
      console.log(json);
      return json;
    }
    return null;
  } catch {
    throw new Error("Error while fetching data in login");
  }
};


//puts
export const addLevelRank = async (id:string,rank:LevelRankType)=>{
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-type": "application/json; charset=UTF-8"},
    body: JSON.stringify(rank),
  };
  try {
    const data = await fetch(SERVER + "users/update/addLevelRank/" + id, requestOptions);
    if (data.ok) {
      const json = await data.json();
      console.log(json);
      return json;
    }
    return null;
  } catch {
    throw new Error("Error while fetching data in register");
  }
}
export const updateUserAvatar = async (id:string,avatar:{avatarCode:number,avatarUrl:string})=>{
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-type": "application/json; charset=UTF-8"},
    body: JSON.stringify(avatar),
  };
  try {
    const data = await fetch(SERVER + "users/update/avatar/" + id, requestOptions);
    if (data.ok) {
      const json = await data.json();
      return json;
    }
    return null;
  } catch {
    throw new Error("Error while fetching data in register");
  }
}
export const updateUserNickname = async (id:string,nickname:{nickName:string})=>{
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-type": "application/json; charset=UTF-8"},
    body: JSON.stringify(nickname),
  };
  try {
    const data = await fetch(SERVER + "users/update/nickname/" + id, requestOptions);
    if (data.ok) {
      const json = await data.json();
      console.log(json);
      return json;
    }
    return null;
  } catch {
    throw new Error("Error while fetching data in register");
  }
}
export const updateUserNotification = async (id:string,is_notification:boolean)=>{
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-type": "application/json; charset=UTF-8"},
    body: JSON.stringify({is_notification}),
  };
  try {
    const data = await fetch(SERVER + "users/update/notification/" + id, requestOptions);
    if (data.ok) {
      const json = await data.json();
      console.log(json);
      return json;
    }
    return null;
  } catch {
    throw new Error("Error while fetching data in register");
  }
}
export const addUserPlayDate = async (id:string,playDate:PlayDatesType)=>{
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-type": "application/json; charset=UTF-8"},
    body: JSON.stringify(playDate),
  };
  try {
    const data = await fetch(SERVER + "users/update/addplaydate/" + id, requestOptions);
    if (data.ok) {
      const json = await data.json();
      console.log(json);
      return json;
    }
    return null;
  } catch {
    throw new Error("Error while fetching data in register");
  }
}
export const updateUserCurrentLevel = async (id:string,current_level:number)=>{
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-type": "application/json; charset=UTF-8"},
    body: JSON.stringify({current_level}),
  };
  try {
    const data = await fetch(SERVER + "users/update/currentlevel/" + id, requestOptions);
    if (data.ok) {
      const json = await data.json();
      console.log(json);
      return json;
    }
    return null;
  } catch {
    throw new Error("Error while fetching data in register");
  }
}
export const updateLevelPopulatiry = async (id:string,popularity:{level_code:number,popularity:number})=>{
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-type": "application/json; charset=UTF-8"},
    body: JSON.stringify(popularity),
  };
  try {
    const data = await fetch(SERVER + "users/update/levelpopularity/" + id, requestOptions);
    if (data.ok) {
      const json = await data.json();
      console.log(json);
      return json;
    }
    return null;
  } catch {
    throw new Error("Error while fetching data in register");
  }
}
export const updateLevelRank = async (id:string,rank:LevelRankType)=>{
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-type": "application/json; charset=UTF-8"},
    body: JSON.stringify(rank),
  };
  try {
    const data = await fetch(SERVER + "users/update/levelrank/" + id, requestOptions);
    if (data.ok) {
      const json = await data.json();
      console.log(json);
      return json;
    }
    return null;
  } catch {
    throw new Error("Error while fetching data in register");
  }
}
