import { HikingInformation } from "@/type.ts";
import React from "react";
import { ActionImageHiking } from "@/Components/Admin/styled.ts";
import Garbage from "@/Components/SVG/Garbage.tsx";
import MainImage from "@/Components/SVG/MainImage.tsx";
import { update_main_image } from "@/API/updateMainImage.ts";
import { useParams } from "react-router-dom";
import { delete_image } from "@/API/deleteImage.ts";

const EditImage = ({
  imageId,
  selected,
  setHiking,
}: {
  imageId: number;
  selected: boolean;
  setHiking: React.Dispatch<React.SetStateAction<HikingInformation>>;
}) => {
  const { hikingId } = useParams();

  const handleMainImage = () => {
    if (hikingId) {
      void update_main_image(parseInt(hikingId), imageId);
      setHiking((curr) => ({ ...curr, main_image: imageId }));
    }
  };

  const handleDelete = () => {
    if (hikingId && !selected) {
      setHiking((curr) => ({
        ...curr,
        images: curr.images.filter((image) => image !== imageId),
      }));
      void delete_image(parseInt(hikingId), imageId);
    }
  };

  return (
    <ActionImageHiking $selected={selected}>
      <div onClick={handleDelete}>
        <Garbage />
      </div>
      <div onClick={handleMainImage}>
        <MainImage />
      </div>
    </ActionImageHiking>
  );
};

export default EditImage;
