import Footer from "../features/Footer"
import { Header } from "../features/Header"
import MaxWidthWrapper from "../wrapper/MaxWidthWrapper"

export const MainLayout = ({ children }) => {
      return (<>
            <Header />
            <MaxWidthWrapper>
            {children && children}
            </MaxWidthWrapper>
            <Footer/>
      </>)
}