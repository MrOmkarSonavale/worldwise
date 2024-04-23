import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"


import Product from "./pages/Product"
import Pricing from "./pages/Pricing"
import Homepage from "./pages/Homepage"
import PageNotFound from "./pages/PageNotFound"
import AppLayout from "./pages/AppLayout"
import Login from "./pages/Login"
import CityList from "./components/cityList"
import CountryList from "./components/CountryList"
import City from "./components/City"
import Form from "./components/Form";
import { CitiesProvider } from "./contexts/CitiesContext"
import { AuthProvider } from "./contexts/FakeAuthContext"
import ProtectedRoute from "./pages/ProtectedRoute";


function App() {


  return (
    <div>

      <AuthProvider>
        <CitiesProvider>
          <BrowserRouter>
            <Routes>
              <Route
                index
                element={<Homepage />}
              />

              <Route
                path="product"
                element={<Product />}
              />

              <Route
                path="pricing"
                element={<Pricing />}
              />

              <Route
                path="app"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }>
                <Route index
                  element={<Navigate replace to="cities" />}
                >
                </Route>

                <Route path="cities"
                  element={
                    <CityList
                    />}>
                </Route>

                <Route path="cities/:id" element={<City />}>

                </Route>

                <Route path="countries" element={
                  <CountryList
                  />
                }>
                </Route>

                <Route path="form" element={<Form />}></Route>


              </Route>

              <Route
                path="login"
                element={<Login />}
              />

              <Route
                path="*"
                element={<PageNotFound />}
              />
            </Routes>
          </BrowserRouter>
        </CitiesProvider>
      </AuthProvider>
    </div>
  )
}

export default App