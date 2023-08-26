import { LocationHiking, Map } from "@/Components/Hiking/styled.ts";
import { useParams } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import { get_gpx } from "@/API/getGpx.ts";
import gpxParser from "gpxparser";
import { Polyline, TileLayer } from "react-leaflet";
import EditImages from "@/Components/Admin/EditHiking/EditLocation/Images";
import { HikingInformation } from "@/type.ts";
import { AddFiles } from "@/Components/Admin/styled.ts";
import { useForm } from "react-hook-form";
import { upload_gpx } from "@/API/uploadNewGpx.ts";

const EditLocation = ({
  hiking,
  setHiking,
}: {
  hiking: HikingInformation;
  setHiking: React.Dispatch<React.SetStateAction<HikingInformation>>;
}) => {
  const { hikingId } = useParams();
  const [resetGpx, setResetGpx] = useState<number>(0);
  const [positions, setPositions] = useState<[number, number][]>([[0, 0]]);
  const [positionCenter, setPositionCenter] = useState([0, 0]);
  const formRef = useRef<HTMLFormElement>(null);
  const { register, handleSubmit } = useForm<{ gpx: FileList }>();

  const onSubmit = async (data: { gpx: FileList }) => {
    if (data.gpx.length && hikingId && hikingId !== "-1") {
      const formData = new FormData();
      formData.append("gpx", data.gpx[0]);
      void (await upload_gpx(formData, parseInt(hikingId)));
      setResetGpx((curr) => curr + 1);
    }
  };

  useEffect(() => {
    const getData = async () => {
      if (hikingId && hikingId !== "-1") {
        const data = await get_gpx(parseInt(hikingId));
        const parser = new gpxParser();
        parser.parse(data);
        setPositions(
          parser.tracks[0].points.map((point) => [point.lat, point.lon]),
        );
        setPositionCenter(
          parser.tracks[0].points
            .map((point) => [point.lat, point.lon])
            .reduce(
              (acc, curr: number[]) => [acc[0] + curr[0], acc[1] + curr[1]],
              [0, 0],
            )
            .map((elt) => elt / parser.tracks[0].points.length),
        );
      }
    };
    void getData();
  }, [resetGpx]);

  return (
    <LocationHiking>
      <Map
        key={positions[0].toString()}
        // @ts-ignore
        center={positionCenter}
        zoom={11.5}
        scrollWheelZoom={true}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Polyline
          pathOptions={{ fillColor: "red", color: "blue" }}
          positions={positions}
        />
      </Map>
      <AddFiles $gpx ref={formRef} onSubmit={handleSubmit(onSubmit)}>
        <input
          disabled={hikingId === "-1"}
          type="file"
          {...register("gpx")}
          accept=".gpx"
        />
        <input type="submit" value="Valider" />
      </AddFiles>
      <EditImages setHiking={setHiking} hiking={hiking}></EditImages>
    </LocationHiking>
  );
};

export default EditLocation;
