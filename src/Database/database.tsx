const SERVER = "https://the-last-fugitive.herokuapp.com/api/";

interface User {
  nickname: string;
  email: string;
  password: string;
  avatars: string;
  gender: number;
}
interface UserLogin {
  email: string;
  password: string;
}
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
    return null;
  } catch {
    throw new Error("Error while fetch data in get user by id")
  }
};

export const registerUser = async (user: User) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(user),
  };
  try {
    const data = await fetch(SERVER + "users/register", requestOptions);
    if (data.status === 409) {
      return {};
    }
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

export const loginUser = async (user: UserLogin) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
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
    return null;
  } catch {
    throw new Error("Error while fetch data in get all levels")
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
    return null;
  } catch {
    throw new Error("Error while fetch data in get all hints")
  }
};