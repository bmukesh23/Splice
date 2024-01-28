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
        </>
      )}
    </>
  )
}
export default AuthLayout