import { categories } from "@/Components/Header/categories.ts";
import {
  CategoriesStyle,
  Category,
  ImageCategory,
} from "@/Components/Header/styled.ts";
import React from "react";
import { useState } from "react";
import HikingState from "@/Components/Header/NavBar/Categories/HikingState";

const API_KEY = import.meta.env.PROD
  ? import.meta.env.VITE_PUBLIC_BACK_URL_PROD
  : import.meta.env.VITE_PUBLIC_BACK_URL_DEV;

const Categories = () => {
  const [categoryHover, setCategoryHover] = useState<number>(1);

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
              {index === 0 ? (
                <HikingState visible={categoryHover === category.id} />
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
