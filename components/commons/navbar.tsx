import Link from "next/link";
import {accessTokenState, userNameState, isModalOpenState} from "../storage/storage";
import { useRecoilState } from "recoil";
import { signOut} from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../config/firebase"
import { FcTodoList } from 'react-icons/fc';

const Navbar = ({ children }: { children: React.ReactNode }) => {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  const [isModalOpen, setIsModalOpen] = useRecoilState(isModalOpenState);
  const [userName, setUserName] = useRecoilState(userNameState);
  const [user, loading] = useAuthState(auth);

  const menuItems = [
    {
      id: 1,
      name: "Login",
      link: "/login",
    },
  ];

  const logOut = async () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      setAccessToken(null);
      setUserName(null);
      window.location.replace('/login');
    }).catch((error) => {
      // An error happened.
    });
  };

  return (
    <>
      <header className="fixed flex flex-wrap container mx-auto max-w-full items-center py-4 px-5 justify-between bg-white shadow-md top-0 z-50">
        <div className="flex items-center text-blue-900 hover:text-blue-800 cursor-pointer transition duration-150 ">
          <Link href="/">
            <div className="flex items-center space-x-2">
              <FcTodoList size={25}></FcTodoList>
            <span className="font-semibold text-2xl">
              MTodos
            </span>
            </div>
          </Link>
        </div>

          <ul className="text-lg inline-block">
          <>
              {!accessToken ? (
                menuItems.map((item) => (
                  <li
                    key={item.id}
                    className="md:my-0 items-center mr-4 md:inline-block block "
                  >
                    <Link legacyBehavior href={item?.link}>
                      <a href="" className="text-blue-800 hover:text-blue-900 transition text-md">
                        {item?.name}
                      </a>
                    </Link>
                  </li>
                ))
              ) : (
                <div className="flex flex-row items-center lg:text-base md:text-base text-sm">
                <li className="md:my-0 items-center mr-4 md:inline-block block ">
                  <a
                  onClick={() => setIsModalOpen(true)}  className="cursor-pointer bg-indigo-500 text-gray-100 p-2 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                  >
                    Add Todo
                  </a>
                </li>
                <li className="md:my-0 items-center mr-4 md:inline-block block ">
                  <a
                    onClick={logOut}
                    className="text-blue-800 hover:text-blue-900 transition cursor-pointer"
                  >
                    Logout
                  </a>
                </li>
                </div>
                
              )}
            </>
          </ul>
      </header>
      {children}
    </>
  );
};

export default Navbar;