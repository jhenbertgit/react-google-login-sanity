import { useEffect, useState } from "react";
import { userQuery } from "../utils";
import { client } from "../client";

type User = {
  userName: string;
  image: string;
};

const User = () => {
  const [user, setUser] = useState<User | null>(null);
  const userInforStr = localStorage.getItem("user");
  const userInfo =
    userInforStr !== null && userInforStr !== "undefined"
      ? JSON.parse(userInforStr)
      : localStorage.clear();

  useEffect(() => {
    const query = userQuery(userInfo?.sub);
    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, []);
  return (
    <div>
      <h1 className="text-3xl font-bold underline">User Page</h1>
      <p>{user?.userName}</p>
      <img src={user?.image} />
    </div>
  );
};

export default User;
