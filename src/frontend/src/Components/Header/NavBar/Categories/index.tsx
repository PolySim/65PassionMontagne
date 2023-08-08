import { categories } from "@/Components/Header/categories.ts";
import { CategoriesStyle, Category } from "@/Components/Header/styled.ts";

const Categories = () => {
  return (
    <CategoriesStyle>
      <div>Categories</div>
      <div>
        {categories.map((category) => (
          <Category key={category.name} to={`/${category.id}`}>
            {category.name}
          </Category>
        ))}
      </div>
    </CategoriesStyle>
  );
};

export default Categories;
