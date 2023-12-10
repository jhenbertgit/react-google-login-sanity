import sharedVideo from "../assets/share.mp4";
import logo from "../assets/react.svg";
import { GoogleLogin } from "@react-oauth/google";
import { createOrGetUser } from "../utils";
import { client } from "../client";
import { useNavigate } from "react-router-dom";

interface UserData {
  name: string;
  picture: string;
  sub: string;
}

const Login = () => {
  const navigate = useNavigate();

  const responseGoogle = async (response: any) => {
    const { name, picture, sub } = await createOrGetUser(response);

    const userData: UserData = {
      name,
      picture,
      sub,
    };

    localStorage.setItem("user", JSON.stringify(userData));

    const doc = {
      _id: sub,
      _type: "user",
      userName: name,
      image: picture,
    };

    client.createIfNotExists(doc).then(() => {
      navigate("/user", { replace: true });
    });
  };
  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className="relative w-full h-full">
        <video
          src={sharedVideo}
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
          type="video/mp4"
        />
        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
          <div className="p-5">
            <img src={logo} />
          </div>
          <div className="shadow-2xl"></div>
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              responseGoogle(credentialResponse);
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
