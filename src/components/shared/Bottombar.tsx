import { bottombarLinks } from "@/constants";
import { Link, useLocation } from "react-router-dom";


const Bottombar = () => {
  const { pathname } = useLocation();
  return (
    <section className="z-50 flex-between w-full sticky bottom-0 rounded-t-[20px] bg-dark-2 px-5 py-4 md:hidden">
      {bottombarLinks.map((link) => {
        const isActive = pathname === link.route;

        return (
            <Link
              to={link.route}
              key={link.label} 
              className={`${isActive && 'bg-primary-500 rounded-[10px]'} flex-center flex-col gap-1 p-2 transition`}
            >
              <img
                    src={link.imgURL}
                    alt={link.label}
                    width={18}
                    height={18}
                    className={`${isActive && 'invert-white'}`}
                  />
            </Link>
        )
      })}
    </section>
  )
}
export default Bottombar