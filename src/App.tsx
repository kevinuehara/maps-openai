import Map, { Marker } from "react-map-gl/maplibre";
import { Openai } from "./services/openai";
import "maplibre-gl/dist/maplibre-gl.css";
import { SideBar } from "./components/Sidebar";
import { useState } from "react";
import { PinIcon } from "./components/icons";
import { LoadingSpinner } from "./components/LoadingSpinner";
import { NavigateLabel } from "./components/NavigateLabel";

export interface MessageResult {
  name?: string;
  location?: number[];
}

const initialValueLocation = {
  longitude: -47.0616,
  latitude: -22.9064,
  zoom: 10,
};

function App() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messageResult, setMessageResult] = useState<MessageResult[]>([]);
  const [chosenLocation, setChosenLocation] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleMessage = async () => {
    setIsLoading(true);
    const response = await Openai.getLocations(inputValue);
    const message = response?.data.choices.length
      ? response?.data.choices[0].text
      : "";

    try {
      if (message) {
        setMessageResult(JSON.parse(message));
      }
    } catch (error) {
      console.error("Failed on JSON Parse");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCleanResults = () => {
    setInputValue("");
    setMessageResult([]);
    setChosenLocation([]);
  };

  return (
    <>
      <div className="relative top-0 left-0">
        <Map
          initialViewState={initialValueLocation}
          style={{ width: "100vw", height: "100vh" }}
          mapStyle={`https://api.maptiler.com/maps/cadastre-satellite/style.json?key=${
            import.meta.env.VITE_MAP_TILER_API_KEY
          }`}
        >
          <SideBar
            isOpen={isSideBarOpen}
            handleOpen={() => setIsSideBarOpen(!isSideBarOpen)}
          >
            <label className="text-base mt-3 mb-2" htmlFor="message">
              O que você gostaria de saber?
            </label>
            <input
              type="text"
              name="message"
              id="message"
              value={inputValue}
              onChange={(evt) => setInputValue(evt.target.value)}
              className="w-11/12 pr-2 pl-2 rounded-sm h-14 border-blue-800 text-base border-2"
            />
            <span className="text-sm text-gray-500 mt-1">
              Ex: Me dê sugestões de praias no brasil
            </span>
            <button
              className="w-11/12 h-12 mt-3 bg-blue-800 hover:bg-blue-500 text-white rounded text-base"
              onClick={handleMessage}
            >
              Buscar
            </button>
            <button
              className="w-11/12 h-12 mt-2 bg-red-700 hover:bg-red-500 text-white rounded text-base"
              onClick={handleCleanResults}
            >
              Limpar Busca
            </button>

            {isLoading && (
              <div className="mt-3 flex justify-center">
                <LoadingSpinner />
              </div>
            )}

            <div className="mt-10 text-base flex flex-col">
              {!isLoading && messageResult.length > 0 && (
                <h2 className="text-xl text-blue-700 font-bold mb-2">
                  Resultados
                </h2>
              )}

              {!isLoading &&
                messageResult.map((result, index) => (
                  <NavigateLabel
                    {...result}
                    index={index}
                    handleLocation={(loc) => setChosenLocation(loc)}
                  />
                ))}
            </div>

            <div className="mt-20">
              <label className="text-sm text-gray-500">
                Created by Kevin Uehara
              </label>
            </div>
          </SideBar>

          {chosenLocation && chosenLocation.length && (
            <Marker latitude={chosenLocation[0]} longitude={chosenLocation[1]}>
              <PinIcon />
            </Marker>
          )}
        </Map>
      </div>
    </>
  );
}

export default App;
