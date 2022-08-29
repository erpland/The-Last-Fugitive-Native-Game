import {
  UserSignupType,
  UserLoginType,
  PlayDatesType,
  LevelRankType,
} from "../Types/userTypes";
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
    throw new Error("Network Error!");
  }
};
export const getAllLevels = async () => {
  const requestOptions = {
    method: "get",
    headers: { "Content-type": "application/json; charset=UTF-8" },
  };
  try {
    const data = await fetch(SERVER + "levels/", requestOptions);
    if (data.ok) {
      const json = await data.json();
      return json;
    }
    return new Error("Error while fetch data in get all levels");
  } catch {
    throw new Error("Network Error!");
  }
};
export const getAllHints = async () => {
  const requestOptions = {
    method: "get",
    headers: { "Content-type": "application/json; charset=UTF-8" },
  };
  try {
    const data = await fetch(SERVER + "hints/", requestOptions);
    if (data.ok) {
      const json = await data.json();
      return json;
    }
    return new Error("Error while fetch data in get all hints");
  } catch {
    throw new Error("Network Error");
  }
};
export const getAllAvatars = async () => {
  const requestOptions = {
    method: "get",
    headers: { "Content-type": "application/json; charset=UTF-8" },
  };
  try {
    const data = await fetch(SERVER + "avatars/", requestOptions);
    if (data.ok) {
      const json = await data.json();
      return json;
    }
    return new Error("Error while fetch data in get all hints");
  } catch {
    throw new Error("Network Error");
  }
};

//posts
export const registerUser = async (user: UserSignupType) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(user),
  };
  try {
    const data = await fetch(SERVER + "users/register", requestOptions);
    if (data.ok) {
      const json = await data.json();
      console.log("after", json);
      return json;
    }
    return null;
  } catch {
    throw new Error("Error while fetching data in register");
  }
};
export const resetPassword = async (email:string)=>{
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({email}),
  };
  try {
    const data = await fetch(SERVER + "password-reset/reset", requestOptions);
    return data.ok
  } catch {
    throw new Error("Error while sending email");
  }
}
//register guest
export const registerGuest = async () => {
  
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  };
  try {
    const data = await fetch(SERVER + "guests/register", requestOptions);
    if (data.ok) {
      const json = await data.json();
      console.log("after", json);
      return json;
    }
    return null;
  } catch {
    throw new Error("Error while fetching data in register");
  }
};

//sign guest as user

export const signGuestAsUser = async (guest: UserSignupType) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(guest),
  };
  try {
    console.log(guest)
    const data = await fetch(SERVER + "users/guestRegister", requestOptions);
    if (data.ok) {
      const json = await data.json();
      return json;
    }
    return null;
  } catch {
    throw new Error("Error while fetching data in register");
  }
};


//login guest
export const fetchGuestById = async (id: string) => {
  const requestOptions = {
    method: "get",
    headers: { "Content-type": "application/json; charset=UTF-8" },
  };
  try {
    const data = await fetch(SERVER + "guests/" + id, requestOptions);
    if (data.ok) {
      const json = await data.json();
      return json;
    }
    return new Error("Error while fetch data in get user by id");
  } catch {
    throw new Error("Network Error!");
  }
};

export const loginUser = async (user: UserLoginType) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
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
export const addLevelRank = async (
  id: string,
  token: string,
  rank: LevelRankType,
  isGuest: boolean
) => {
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "x-access-token": token,
    },
    body: JSON.stringify(rank),
  };
  try {
    let controller=isGuest?"guests/update/addLevelRank/"+id:"users/update/addLevelRank/" + id
    const data = await fetch(
      SERVER + controller,
      requestOptions
    );
    if (data.ok) {
      const json = await data.json();
      console.log(json);
      return json;
    }
    return null;
  } catch {
    throw new Error("Error while fetching data in register");
  }
};
export const updateUserAvatar = async (
  id: string,
  token: string,
  avatar: { avatarCode: number; avatarUrl: string }
) => {
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "x-access-token": token,
    },
    body: JSON.stringify(avatar),
  };
  try {
    const data = await fetch(
      SERVER + "users/update/avatar/" + id,
      requestOptions
    );
    if (data.ok) {
      const json = await data.json();
      return json;
    }
    return null;
  } catch {
    throw new Error("Error while fetching data in register");
  }
};
export const updateUserNickname = async (
  id: string,
  token: string,
  nickname: { nickName: string }
) => {
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "x-access-token": token,
    },
    body: JSON.stringify(nickname),
  };
  try {
    const data = await fetch(
      SERVER + "users/update/nickname/" + id,
      requestOptions
    );
    if (data.ok) {
      const json = await data.json();
      console.log(json);
      return json;
    }
    return null;
  } catch {
    throw new Error("Error while fetching data in register");
  }
};
export const updateUserNotification = async (
  id: string,
  token: string,
  is_notification: boolean, 
  isGuest: boolean
) => {
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "x-access-token": token,
    },
    body: JSON.stringify({ is_notification }),
  };
  try {
    let controller=isGuest?"guests/update/notification/"+id:"users/update/notification/" + id
    const data = await fetch(
      SERVER + controller,
      requestOptions
    );
    if (data.ok) {
      const json = await data.json();
      console.log(json);
      return json;
    }
    return null;
  } catch {
    throw new Error("Error while fetching data in register");
  }
};
export const addUserPlayDate = async (
  id: string,
  token: string,
  playDate: PlayDatesType,
  isGuset:boolean
) => {
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "x-access-token": token,
    },
    body: JSON.stringify(playDate),
  };
  try {
    let controller=isGuset?"guests/update/addplaydate/" + id:"users/update/addplaydate/" + id
    const data = await fetch(
      SERVER + controller,
      requestOptions
    );
    if (data.ok) {
      const json = await data.json();
      console.log(json);
      return json;
    }
    return null;
  } catch {
    throw new Error("Error while fetching data in register");
  }
};
export const updateUserCurrentLevel = async (
  id: string,
  token: string,
  current_level: number,
  isGuest: boolean
) => {
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "x-access-token": token,
    },
    body: JSON.stringify({ current_level }),
  };
  try {
    let controller=isGuest?"guests/update/currentlevel/" + id:"users/update/currentlevel/" + id
    const data = await fetch(
      SERVER + controller,
      requestOptions
    );
    if (data.ok) {
      const json = await data.json();
      console.log(json);
      return json;
    }
    return null;
  } catch {
    throw new Error("Error while fetching data in register");
  }
};
export const updateLevelPopulatiry = async (
  id: string,
  token: string,
  popularity: { level_code: number; popularity: number },
  isGuest: boolean
) => {
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "x-access-token": token,
    },
    body: JSON.stringify(popularity),
  };
  try {
    let controller=isGuest?"guests/update/levelpopularity/" + id:"users/update/levelpopularity/" + id
    const data = await fetch(
      SERVER + controller,
      requestOptions
    );
    if (data.ok) {
      const json = await data.json();
      console.log(json);
      return json;
    }
    return null;
  } catch {
    throw new Error("Error while fetching data in register");
  }
};
export const updateLevelRank = async (
  id: string,
  token: string,
  rank: LevelRankType,
  isGuest: boolean
) => {
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "x-access-token": token,
    },
    body: JSON.stringify(rank),
  };
  try {
    let controller=isGuest?"guests/update/levelrank/" + id:"users/update/levelrank/" + id
    const data = await fetch(
      SERVER + controller,
      requestOptions
    );
    if (data.ok) {
      const json = await data.json();
      console.log(json);
      return json;
    }
    return null;
  } catch {
    throw new Error("Error while fetching data in register");
  }
};



