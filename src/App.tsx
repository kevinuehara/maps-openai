import Map, { useMap } from "react-map-gl/maplibre";
import { Openai } from "./services/openai";
import "maplibre-gl/dist/maplibre-gl.css";
import { SideBar } from "./components/Sidebar";
import { useState } from "react";

function NavigateButton() {
  const { current: map } = useMap();

  const onClick = () => {
    map?.flyTo({ center: [-46.6388, -23.5489] });
  };

  return <button onClick={onClick}>Go</button>;
}

function App() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleMessage = async () => {
    const response = await Openai.getLocations("onde fica campinas");
    console.log(response);
  };

  return (
    <>
      <div className="relative top-0 left-0">
        <Map
          initialViewState={{
            longitude: -122.4,
            latitude: 37.8,
            zoom: 14,
          }}
          style={{ width: "100vw", height: "100vh" }}
          mapStyle="https://api.maptiler.com/maps/cadastre-satellite/style.json?key=PM7adkzmbfPeABesGiEA"
        >
          <SideBar
            isOpen={isSideBarOpen}
            handleOpen={() => setIsSideBarOpen(!isSideBarOpen)}
          >
            <label htmlFor="field">O que você gostaria de saber?</label>
            <input
              type="text"
              name="field"
              id="field"
              value={inputValue}
              onChange={(evt) => setInputValue(evt.target.value)}
              className="w-10/12 pr-2 pl-2 rounded-sm h-14 border-blue-800"
            />
            <button className="w-10/12 h-12 mt-2 bg-blue-800 hover:bg-blue-500 text-white rounded">
              Buscar
            </button>
            <NavigateButton />
          </SideBar>
        </Map>
      </div>
    </>
  );
}

export default App;
