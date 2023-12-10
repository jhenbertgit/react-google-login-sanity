import { User } from "../pages/User";
import logo from "../assets/react.svg";

type NavBarProps = {
  user: User | null;
};

const Navbar = ({ user }: NavBarProps) => {
  return (
    <nav className="mb-5">
      <div className="flex flex-col items-end p-3 px-5 ">
        {user ? (
          <img
            src={user?.image}
            alt="avatar"
            className="w-10 h-10 rounded-full"
          />
        ) : (
          <img src={logo} alt="avatar" />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
