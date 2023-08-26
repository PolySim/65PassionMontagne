import { HikingInformation } from "@/type.ts";
import { ImageHiking } from "@/Components/Hiking/styled.ts";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import React, { useEffect, useRef, useState } from "react";
import { reorderImages } from "@/Components/Admin/EditHiking/EditLocation/Images/reorderImage.ts";
import { reorder_images } from "@/API/reorderImage.ts";
import { AddFiles } from "@/Components/Admin/styled.ts";
import { useForm } from "react-hook-form";
import { download_images } from "@/API/downloadImages.ts";
import { useParams } from "react-router-dom";
import { get_hiking_information } from "@/API/getHikingInformation.ts";
import EditImage from "@/Components/Admin/EditHiking/EditLocation/Images/Image";

const API_KEY = import.meta.env.PROD
  ? import.meta.env.VITE_PUBLIC_BACK_URL_PROD
  : import.meta.env.VITE_PUBLIC_BACK_URL_DEV;

export const EditImages = ({
  hiking,
  setHiking,
}: {
  hiking: HikingInformation;
  setHiking: React.Dispatch<React.SetStateAction<HikingInformation>>;
}) => {
  const [state, setState] = useState(0);
  const { register, handleSubmit } = useForm<{ images: FileList }>();
  const formRef = useRef<HTMLFormElement>(null);
  const { hikingId } = useParams();

  useEffect(() => {
    setState((curr) => curr + 1);
  }, []);
  const onDragEnd = (result: DropResult) => {
    void reorder_images(
      reorderImages(
        hiking.images,
        result.source.index,
        result.destination?.index,
      ),
    );
    setHiking((curr) => ({
      ...curr,
      images: reorderImages(
        hiking.images,
        result.source.index,
        result.destination?.index,
      ),
    }));
  };

  const onSubmit = async (data: { images: FileList }) => {
    if (data.images.length && hikingId) {
      const formData = new FormData();
      for (let i = 0; i < data.images.length; i++) {
        formData.append(`images`, data.images[i]);
      }
      formData.append("hikingId", hikingId);
      try {
        void (await download_images(formData, parseInt(hikingId)));
        const newHikingInformation = await get_hiking_information(
          parseInt(hikingId),
        );
        setHiking(newHikingInformation);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId={"droppable"} key={state}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {hiking.images.map((imageId, i) => (
              <Draggable draggableId={`${imageId}`} index={i} key={imageId}>
                {(provided) => (
                  <ImageHiking
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <img
                      src={`${API_KEY}/hiking/getImage/${imageId}`}
                      alt={`image-${imageId}`}
                    />
                    <EditImage
                      imageId={imageId}
                      selected={hiking.main_image === imageId}
                      setHiking={setHiking}
                    />
                  </ImageHiking>
                )}
              </Draggable>
            ))}
          </div>
        )}
      </Droppable>
      <AddFiles ref={formRef} onSubmit={handleSubmit(onSubmit)}>
        <input
          type="file"
          multiple
          {...register("images")}
          accept="image/png, image/jpeg"
        />
        <input type="submit" value="Valider" />
      </AddFiles>
    </DragDropContext>
  );
};

export default EditImages;
