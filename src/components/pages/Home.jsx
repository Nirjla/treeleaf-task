import { Link } from "react-router-dom"
import useQuery from "../../hooks/useQuery"
import Headline from "../common/Headline"
import UserForm from "../features/UserForm"
import UserTable from "../features/UserTable"
import SectionWrapper from "../wrapper/SectionWrapper"

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
            <SectionWrapper>
                  <Link to='/profiles'>
                  <Headline title={'View'} highlight={'Profiles'}/>
                  </Link>
            </SectionWrapper>
      </>)
}