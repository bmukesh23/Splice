import { useSignOutAccount } from "@/lib/react-query/queriesAndMutation"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "../ui/button";
import { useEffect } from "react";
import { useUserContext } from "@/context/AuthContext";

const LeftSidebar = () => {
  const { mutate: signOut, isSuccess } = useSignOutAccount();
  const navigate = useNavigate();
  const { user } = useUserContext();

  useEffect(() => {
    if (isSuccess) navigate(0);
  }, [isSuccess])

  return (
    <nav className="md: flex px-6 py-10 flex-col justify-between min-w-[270px] bg-dark-2">
      <div className="flex flex-col gap-11">
        <Link to='/' className="flex gap-3 items-center">
          <h2 className="h3-bold">Splice</h2>
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
          
        </ul>
      </div>
    </nav>
  )
}
export default LeftSidebar