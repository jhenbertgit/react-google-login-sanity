import { useEffect, useState } from "react";
import { userQuery } from "../utils";
import { client } from "../client";
import { Navbar } from "../components";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export type User = {
  userName: string;
  image: string;
};

const User = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

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

  const handleLogout = () => {
    setUser(null);
    localStorage.clear();
    navigate("/", { replace: true });
  };
  return (
    <>
      <Navbar user={user} />
      <div className="text-center">
        <h1 className="text-3xl font-bold">
          Hello, <span className="text-teal-500">{user?.userName}!</span>{" "}
          Welcome to test site
        </h1>
        <p>
          Don't worry your email address does not save in database. This site
          used Sanity visite their website{" "}
          <a
            href="https://www.sanity.io/"
            target="_blank"
            className="underline link"
          >
            here
          </a>
        </p>
        <Button onClick={handleLogout}>Logout</Button>
      </div>
    </>
  );
};

export default User;
