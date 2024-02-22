import { useSignOutAccount } from "@/lib/react-query/queriesAndMutation"
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom"
import { Button } from "../ui/button";
import { useEffect } from "react";
import { useUserContext } from "@/context/AuthContext";
import { sidebarLinks } from "@/constants";
import { INavLink } from "@/types";
import logoutSvg from '/assets/icons/logout.svg'

const LeftSidebar = () => {
  const { pathname } = useLocation();
  const { mutate: signOut, isSuccess } = useSignOutAccount();
  const navigate = useNavigate();
  const { user } = useUserContext();

  useEffect(() => {
    if (isSuccess) navigate(0);
  }, [isSuccess])

  return (
    <nav className="hidden md:flex px-6 py-10 flex-col justify-between min-w-[270px] bg-dark-2">
      <div className="flex flex-col gap-11">
        <Link to='/' className="flex gap-3 items-center">
        <div className="flex">
          <img
            src="/assets/images/splicelogo.svg"
            alt="logo"
            height={38}
            width={38}
            className="mt-1.5"
          />
          <h1 className="h1-bold">splice</h1>
        </div>
        </Link>

        <Link to={`/profile/${user.id}`} className="flex gap-3 items-center">
          <img
            src={user.imageUrl || 'assets/icons/profile-placeholder.svg'}
            alt="profile"
            className="h-14 w-14 rounded-full"
          />
          <div className="flex flex-col">
            <p className="body-bold">{user.name}</p>
            <p className="small-regular text-light-3">@{user.username}</p>
          </div>
        </Link>

        <ul className="flex flex-col gap-6">
          {sidebarLinks.map((link: INavLink) => {
            const isActive = pathname === link.route;
            return (
              <li key={link.label} className={`leftsidebar-link group ${isActive && 'bg-blue-600'} `}>
                <NavLink
                  to={link.route}
                  className="flex gap-4 items-center p-4"
                >
                  <img
                    src={link.imgURL}
                    alt={link.label}
                    className={`group-hover:invert-white ${isActive && 'invert-white'}`}
                  />
                  {link.label}
                </NavLink>
              </li>
            )
          })}
        </ul>

        <Button variant="ghost" className="shad-button_ghost" onClick={() => signOut()}>
          <img src={logoutSvg} alt="logout" />
          <p className="small-medium lg:base-medium">Logout</p>
        </Button>
      </div>
    </nav>
  )
}
export default LeftSidebar