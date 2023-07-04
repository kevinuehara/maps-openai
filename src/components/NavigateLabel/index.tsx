import { useMap } from "react-map-gl/maplibre";
import { MessageResult } from "../../App";

interface NavigateLabelProps extends MessageResult {
  index: number;
  handleLocation: (location: number[]) => void;
}

export const NavigateLabel = ({
  location,
  name,
  index,
  handleLocation,
}: NavigateLabelProps) => {
  const { current: map } = useMap();

  const onClick = () => {
    if (location) {
      handleLocation(location);
      const [lat, lng] = location;
      map?.flyTo({ center: [lng, lat], zoom: 14 });
      return;
    }

    map?.flyTo({ center: [-46.6388, -23.5489], zoom: 14 });
  };

  return (
    <label
      onClick={onClick}
      key={index}
      className="text-blue-700 hover:cursor-pointer hover:text-blue-500"
    >
      {index + 1} - {name}
    </label>
  );
};
