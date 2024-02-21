import { useSignOutAccount } from "@/lib/react-query/queriesAndMutation"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "../ui";
import { useEffect } from "react";
import { useUserContext } from "@/context/AuthContext";
import logoutSvg from '/assets/icons/logout.svg'
import profileSvg from '/assets/icons/profile-placeholder.svg'

const Topbar = () => {
  const { mutate: signOut, isSuccess } = useSignOutAccount();
  const navigate = useNavigate();
  const { user } = useUserContext();

  useEffect(() => {
    if (isSuccess) navigate(0);
  }, [isSuccess])

  return (
    <section className="sticky top-0 z-50 md:hidden bg-dark-2 w-full">
      <div className="flex-between py-2 px-4">
        <Link to='/'>
          <h2 className="h2-bold">splice</h2>
        </Link>

        <div className="flex gap-4">
          <Button variant="ghost" className="shad-button_ghost" onClick={() => signOut()}>
            <img src={logoutSvg} alt="logout" />
          </Button>
          <Link to={`/profile/${user.id}`} className="flex-center gap-3">
            <img
              src={user.imageUrl || profileSvg}
              alt="profile"
              className="h-8 w-8 rounded-full"
            />
          </Link>
        </div>
      </div>
    </section>
  )
}
export default Topbar