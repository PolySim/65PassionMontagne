import { HikingInformation } from "@/type.ts";
import React from "react";
import { ActionImageHiking } from "@/Components/Admin/styled.ts";
import Garbage from "@/Components/SVG/Garbage.tsx";
import MainImage from "@/Components/SVG/MainImage.tsx";
import { update_main_image } from "@/API/updateMainImage.ts";
import { useParams } from "react-router-dom";
import { delete_image } from "@/API/deleteImage.ts";
import RotateR from "@/Components/SVG/RotateR.tsx";

const API_KEY = import.meta.env.PROD
  ? import.meta.env.VITE_PUBLIC_BACK_URL_PROD
  : import.meta.env.VITE_PUBLIC_BACK_URL_DEV;

const EditImage = ({
  imageId,
  selected,
  setHiking,
  setImageKey,
}: {
  imageId: number;
  selected: boolean;
  setHiking: React.Dispatch<React.SetStateAction<HikingInformation>>;
  setImageKey: React.Dispatch<React.SetStateAction<number>>;
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

  const handleRotate = async () => {
    if (imageId) {
      try {
        await fetch(`${API_KEY}/hiking/rotate/${imageId}`, { method: "POST" });
        setImageKey((curr) => curr + 1);
      } catch (e) {
        throw new Error(`error in rotate image - ${e}`);
      }
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
      <div onClick={handleRotate}>
        <RotateR />
      </div>
    </ActionImageHiking>
  );
};

export default EditImage;
