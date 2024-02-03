import { useSignOutAccount } from "@/lib/react-query/queriesAndMutation"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "../ui/button";
import { useEffect } from "react";
import { useUserContext } from "@/context/AuthContext";

const Topbar = () => {
  const { mutate: signOut, isSuccess } = useSignOutAccount();
  const navigate = useNavigate();
  const { user } = useUserContext();

  useEffect(() => {
    if (isSuccess) navigate(0);
  }, [isSuccess])

  return (
    <section className="topbar">
      <div className="flex-between py-1 px-2">
        <Link to='/'>
          <h2 className="h2-bold">splice</h2>
        </Link>

        <div>
          <Button variant="ghost" className="shad-button_ghost" onClick={() => signOut()}>
            <img src="/assets/images/logout.svg" alt="logout" />
          </Button>
          <Link to={`/profile/${user.id}`} className="flex-center gap-3">
            <img
            src={user.imageUrl || '/assets/images/profile-placeholder.svg'}
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