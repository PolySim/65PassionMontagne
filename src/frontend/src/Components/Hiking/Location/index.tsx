import {
  ImageHiking,
  LocationHiking,
  Map,
} from "@/Components/Hiking/styled.ts";
import { HikingInformation } from "@/type.ts";
import { useParams } from "react-router-dom";
import { Polyline, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { get_gpx } from "@/API/getGpx.ts";
import gpxParser from "gpxparser";
import FullScreenImage from "@/Components/Hiking/Location/FullScreenImage";

const API_KEY = import.meta.env.PROD
  ? import.meta.env.VITE_PUBLIC_BACK_URL_PROD
  : import.meta.env.VITE_PUBLIC_BACK_URL_DEV;

const HikingLocation = ({ hiking }: { hiking: HikingInformation }) => {
  const [fullScreenId, setFullScreenId] = useState<number | null>(null);
  const params = useParams();
  const hikingId = parseInt(params.hikingId || "1");
  const [positions, setPositions] = useState<[number, number][]>([[0, 0]]);
  const [positionCenter, setPositionCenter] = useState([0, 0]);

  useEffect(() => {
    const getData = async () => {
      const data = await get_gpx(hikingId);
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
    };
    void getData();
  }, []);

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
      {hiking.images.map((image, index) => (
        <ImageHiking key={image} onClick={() => setFullScreenId(index)}>
          <img
            src={`${API_KEY}/hiking/getImage/${image}`}
            alt={`image-${image}`}
          />
        </ImageHiking>
      ))}
      {fullScreenId !== null ? (
        <FullScreenImage
          setFullScreenId={setFullScreenId}
          imageFocus={fullScreenId}
          images={hiking.images}
        />
      ) : (
        <></>
      )}
    </LocationHiking>
  );
};

export default HikingLocation;
