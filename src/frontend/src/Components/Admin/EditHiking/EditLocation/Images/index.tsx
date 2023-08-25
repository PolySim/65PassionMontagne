import { HikingInformation } from "@/type.ts";
import { EditImagesStyle } from "@/Components/Admin/styled.ts";
import { ImageHiking } from "@/Components/Hiking/styled.ts";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import React, { useEffect, useState } from "react";
import { reorderImages } from "@/Components/Admin/EditHiking/EditLocation/Images/reorderImage.ts";
import { reorder_images } from "@/API/reorderImage.ts";

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

  return (
    <EditImagesStyle>
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
                    </ImageHiking>
                  )}
                </Draggable>
              ))}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </EditImagesStyle>
  );
};

export default EditImages;
