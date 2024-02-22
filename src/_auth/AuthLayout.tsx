import { Outlet, Navigate } from "react-router-dom";


const AuthLayout = () => {
  const isAuthenticated = false;

  return (
    <>
      {isAuthenticated ? (
        <Navigate to='/' />
      ) : (
        <>
          <section className="flex flex-col justify-center items-center flex-1 py-10">
            <Outlet />
          </section>

          <img
            src="/assets/images/sideImg.svg"
            alt="logo"
            className="hidden xl:block h-screen w-1/2 object-cover bg-no-repeat"
          />
        </>
      )}
    </>
  )
}
export default AuthLayout