import { Route, Routes } from "react-router-dom";

import { LoginPage } from "../auth";
import { HeroesRoutes } from "../heroes/Routes/HeroesRoutes";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";


export const AppRouter = () => {
  return (
   <>

        <Routes>
     
            <Route path="login" element = {
              <PublicRoute>
                <Routes>
                  <Route path="/*" element={<LoginPage />} />
                </Routes>
              </PublicRoute>
            }/>
            
            {/* <Route path="login" element={<LoginPage />} /> */}

            <Route path="/*" element= {
              <PrivateRoute>
                <HeroesRoutes />
              </PrivateRoute>
            }/>

           {/* <Route path="/*" element={<HeroesRoutes />} /> */}

        </Routes>
   
   </>
  )
}
