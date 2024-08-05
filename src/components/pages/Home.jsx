import { Link } from "react-router-dom"
import useQuery from "../../hooks/useQuery"
import Headline from "../common/Headline"
import UserForm from "../features/UserForm"
import UserTable from "../features/UserTable"
import SectionWrapper from "../wrapper/SectionWrapper"
import { MdKeyboardArrowRight } from "react-icons/md"

export const Home = ({countries}) => {
      return (<>
            <SectionWrapper>
                  <Headline title={"User"} highlight={"Form"} />
                  <UserForm countries={countries}/>
            </SectionWrapper>
            <SectionWrapper>
                  <Headline title='User' highlight='Details' />
                  <UserTable countries={countries}/>
            </SectionWrapper>
            <SectionWrapper className={'lg:pt-4 md:pt-2 sm:pt-2'}>
                  <Link to='/profiles' className="hover:underline">
                  <div className="inline-flex items-center justify-center ">
                  <Headline title={'View'} highlight={'Profiles'} className="lg:text-[18px] md:text-sm text-sm "/>
                  <MdKeyboardArrowRight className="text-[18px] text-primary"/>
                  </div>
                  </Link>
            </SectionWrapper>
      </>)
}