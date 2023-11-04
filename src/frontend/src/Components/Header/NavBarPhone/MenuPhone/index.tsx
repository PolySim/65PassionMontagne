import {
  CategoriesWithState,
  LinkMenuPhone,
  MenuPhoneStyle,
} from "@/Components/Header/styled.ts";
import React, { useEffect, useState } from "react";
import { CategoriesInformation } from "@/type.ts";
import { getCategoriesInformation } from "@/API/getCategoriesInformation.ts";

const MenuPhone = ({
  handlerStateOpen,
  withStateOpen,
  setIsOpen,
}: {
  handlerStateOpen: (id: number) => void;
  withStateOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [categories, setCategories] = useState<CategoriesInformation>([
    {
      id: 0,
      name: "",
      name_en: "",
      withState: false,
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
    <MenuPhoneStyle $withStateOpen={withStateOpen}>
      <LinkMenuPhone
        onClick={() => setIsOpen(false)}
        $isFavorite
        to={"favorite"}
      >
        Favorite
      </LinkMenuPhone>

      {categories.map((category) =>
        category.withState ? (
          <CategoriesWithState
            key={category.name}
            onClick={() => handlerStateOpen(category.id)}
          >
            {category.name}
          </CategoriesWithState>
        ) : (
          <LinkMenuPhone
            key={category.name}
            onClick={() => setIsOpen(false)}
            to={category.id.toString()}
          >
            {category.name}
          </LinkMenuPhone>
        ),
      )}
    </MenuPhoneStyle>
  );
};

export default MenuPhone;
