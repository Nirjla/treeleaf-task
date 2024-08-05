import MaxWidthWrapper from "../wrapper/MaxWidthWrapper"
import { Link } from "react-router-dom"

export const Header = () => {
      return (<>
            <nav className="bg-white  border-gray-300 border-b-[1px]">
                  <MaxWidthWrapper className="flex flex-wrap items-center justify-between mx-auto p-2">
                        <div className="header-logo">
                              <Link to="/">
                                    <h1 className="font-semibold text-lg md:text-xl  lg:text-2xl text-nowrap space-x-2 text-primary ">
                                          TreeLeaf
                                          <span className="text-secondary pl-2">Task</span>
                                    </h1>
                              </Link>
                        </div>
                        <div className="hidden md:flex md:items-center md:space-x-6">
                              <ul className="flex items-center space-x-6 text-black">
                                    <li>
                                          <Link
                                                to="/"
                                                className="leading-[60px] capitalize font-medium"
                                          >
                                                Home
                                          </Link>
                                    </li>
                                    <li>
                                          <Link
                                                to="/profiles"
                                                className="leading-[60px] capitalize font-medium"
                                          >
                                                Profiles
                                          </Link>
                                    </li>
                              </ul>
                        </div>

                  </MaxWidthWrapper>
            </nav>

      </>)
}