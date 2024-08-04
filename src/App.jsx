import { Route } from "react-router-dom"
import { Home } from "./components/pages/Home"
import { Routes } from "react-router-dom"
import { MainLayout } from "./components/layout/MainLayout"
import Profiles from "./components/pages/Profiles"
import useQuery from "./hooks/useQuery"

function App() {

  const apiUrl = "https://restcountries.com/v3.1/all";
  const { data, loading, error } = useQuery(apiUrl)
  if (loading) {
    return <p>Loading...</p>
  }
  if (error) return <p>Error! {error.message}</p>;
  const countries = data.map(country => country.name.common);

  console.log("Datadata", countries)
  return (
    <>
      <MainLayout>
        <Routes>
          <Route index path="/" element={<Home countries={countries} />} />
          <Route path="/profiles" element={<Profiles countries={countries}/>} />
        </Routes>
      </MainLayout>
    </>
  )
}

export default App
