import { LinkMenuPhone, MenuPhoneStyle } from "@/Components/Header/styled.ts";
import React, { useEffect, useState } from "react";
import { CategoriesInformation, HikesState } from "@/type.ts";
import { getCategoriesInformation } from "@/API/getCategoriesInformation.ts";
import { getHikesState } from "@/API/getHikesStates.ts";

const MenuPhone = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [categories, setCategories] = useState<CategoriesInformation>([
    {
      id: 0,
      name: "",
      name_en: "",
    },
  ]);
  const [hikesState, setHikesState] = useState<HikesState>([
    {
      state: "",
      id: 1,
      path: "gavarnie.jpeg",
    },
  ]);

  useEffect(() => {
    const getData = async () => {
      const data = await getCategoriesInformation();
      setCategories(data);
      const res = await getHikesState(1);
      setHikesState(res);
    };

    void getData();
  }, []);

  return (
    <MenuPhoneStyle $isOpen={isOpen}>
      <LinkMenuPhone
        onClick={() => setIsOpen(false)}
        $isFavorite
        to={"favorite"}
      >
        Favorite
      </LinkMenuPhone>
      <LinkMenuPhone
        onClick={() => setIsOpen(false)}
        to={categories[0].id.toString()}
      >
        {categories[0].name}
      </LinkMenuPhone>
      {hikesState.map((state) => (
        <LinkMenuPhone
          key={state.state}
          onClick={() => setIsOpen(false)}
          $isState
          to={`${categories[0].id}/${state.id}`}
        >
          {state.state}
        </LinkMenuPhone>
      ))}
      {categories
        .filter((_category, i) => i > 0)
        .map((category) => (
          <LinkMenuPhone
            key={category.name}
            onClick={() => setIsOpen(false)}
            to={category.id.toString()}
          >
            {category.name}
          </LinkMenuPhone>
        ))}
    </MenuPhoneStyle>
  );
};

export default MenuPhone;
