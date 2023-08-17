import { AdminStyle } from "@/Components/Admin/styled.ts";
import React, { useEffect, useState } from "react";
import { CategoriesInformation } from "@/type.ts";
import { getCategoriesInformation } from "@/API/getCategoriesInformation.ts";
import {
  ButtonExploreTopo,
  HikingExploreCardStyle,
} from "@/Components/Explore/styled.ts";

const API_KEY = import.meta.env.PROD
  ? import.meta.env.VITE_PUBLIC_BACK_URL_PROD
  : import.meta.env.VITE_PUBLIC_BACK_URL_DEV;

const Admin = () => {
  const [categories, setCategories] = useState<CategoriesInformation>([
    {
      id: -1,
      name: "",
      name_en: "",
    },
  ]);

  useEffect(() => {
    const getData = async () => {
      const data = await getCategoriesInformation();
      setCategories(data);
    };

    void getData();
  }, []);

  return (
    <AdminStyle>
      {categories.map((category) => (
        <React.Fragment key={category.id}>
          {category.id !== -1 && (
            <HikingExploreCardStyle>
              <div>
                <img
                  src={`${API_KEY}/categories/getImage/${category.id}`}
                  alt={category.name}
                />
              </div>
              <p>{category.name}</p>
              <ButtonExploreTopo to={`${category.id}`}>
                Modifier les activités
              </ButtonExploreTopo>
            </HikingExploreCardStyle>
          )}
        </React.Fragment>
      ))}
    </AdminStyle>
  );
};

export default Admin;
