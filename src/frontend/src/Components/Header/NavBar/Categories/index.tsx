import {
  CategoriesStyle,
  Category,
  ImageCategory,
} from "@/Components/Header/styled.ts";
import React, { useEffect } from "react";
import { useState } from "react";
import HikingState from "@/Components/Header/NavBar/Categories/HikingState";
import { CategoriesInformation } from "@/type.ts";
import { getCategoriesInformation } from "@/API/getCategoriesInformation.ts";

const API_KEY = import.meta.env.PROD
  ? import.meta.env.VITE_PUBLIC_BACK_URL_PROD
  : import.meta.env.VITE_PUBLIC_BACK_URL_DEV;

const Categories = () => {
  const [categoryHover, setCategoryHover] = useState<number>(1);
  const [categories, setCategories] = useState<CategoriesInformation>([
    {
      id: 0,
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
    <CategoriesStyle>
      <div>Categories</div>
      <div>
        {categories.map((category) => (
          <Category
            onMouseEnter={() => setCategoryHover(category.id)}
            key={category.name}
            to={`/${category.id}`}
          >
            {category.name}
          </Category>
        ))}
        <ImageCategory>
          {categories.map((category, index) => (
            <React.Fragment key={category.id}>
              {index < 4 ? (
                <HikingState
                  categoryId={category.id}
                  visible={categoryHover === category.id}
                />
              ) : (
                <img
                  src={`${API_KEY}/categories/getImage/${category.id}`}
                  style={{ opacity: categoryHover === category.id ? "1" : "0" }}
                  alt={category.name}
                />
              )}
            </React.Fragment>
          ))}
        </ImageCategory>
      </div>
    </CategoriesStyle>
  );
};

export default Categories;
