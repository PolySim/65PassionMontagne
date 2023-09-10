import { MainContext } from "@/context.ts";
import Header from "@/Components/Header";
import { Route, Routes } from "react-router-dom";
import Home from "@/Components/Home";
import { Container } from "@/styled.ts";
import Footer from "@/Components/Footer";
import Hiking from "@/Components/Hiking";
import { useEffect, useState } from "react";
import { UserType } from "@/type.ts";
import { sign_in_token } from "@/API/signInToken.ts";
import Explore from "@/Components/Explore";
import Admin from "@/Components/Admin";
import SelectHiking from "@/Components/Admin/SelectHiking";
import EditHiking from "@/Components/Admin/EditHiking";

export default function App(): JSX.Element {
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    const getData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const userInformation = await sign_in_token(token);
        setUser(userInformation);
      }
    };

    void getData();
  }, []);

  return (
    <MainContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      <Container>
        <Header />

        <Routes>
          <Route path="*" element={<Home />} />
          <Route
            path="/admin"
            element={user?.role === 0 ? <Admin /> : <Home />}
          />
          <Route
            path="/admin/:categoryId"
            element={user?.role === 0 ? <SelectHiking /> : <Home />}
          />
          <Route
            path="/admin/:categoryId/:hikingId"
            element={user?.role === 0 ? <EditHiking /> : <Home />}
          />
          <Route path="/:category/:stateId/:hikingId" element={<Hiking />} />
          <Route path="/:categoryId" element={<Explore />} />
          <Route path="/:categoryId/:stateId" element={<Explore />} />
        </Routes>

        <Footer />
      </Container>
    </MainContext.Provider>
  );
}
