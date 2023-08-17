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
          <Route path="/:category/1/:hikingId" element={<Hiking />} />
          <Route path="/:categoryId" element={<Explore />} />
          <Route path="/:categoryId/:stateId" element={<Explore />} />
        </Routes>

        <Footer />
      </Container>
    </MainContext.Provider>
  );
}
