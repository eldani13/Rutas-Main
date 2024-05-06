import { useEffect, useState } from "react";
import { LoadingMap } from "../loaders/LoadingMap";
import { DirectionsResponse } from "@/types/RouteResponseApi";
import { Map } from "./Map";
import { MessageRoute } from "@/types/routes";
import { MessageStores, RootStores } from "@/types/stores";
import { processEnv } from "@/utils/cookies";
import { getAllFetchDataValues } from "@/utils/api";

export default function MapboxMap({ route }: { route: MessageRoute | null }) {
    const [loadingDirections, setLoadingDirections] = useState(false);
    const [allStores, setAllStores] = useState<MessageStores[] | null>();

    const [responseDirections, setResponseDirections] =
        useState<DirectionsResponse | null>(null);

    const getDataDirections = async () => {
        if ((route?.tiendas.length || 0) < 2) return;
        setLoadingDirections(true);

        const url = `https://api.mapbox.com/directions/v5/mapbox/driving/`;
        const routes = route?.tiendas
            .map((tienda) => {
                const coordinate = allStores?.find(
                    (u) => u._id === tienda
                )?.coordenadas;
                return coordinate ? `${coordinate.x},${coordinate.y}` : null;
            })
            .filter((coordinate) => coordinate) // Filtrar coordenadas no válidas
            .join("; ");
        const options = `?alternatives=false&geometries=geojson&overview=simplified&steps=false&access_token=pk.eyJ1IjoibGRhbmlpMTMiLCJhIjoiY2xxemE3OXBuMDMxaDJxb2ZwbWYyeXczNSJ9.Clw9VnVZszkfexTJ1tOMUw`;

        console.log(`${url}${routes}${options}`);
        console.log(routes);

        await getAllFetchDataValues(`${url}${routes}${options}`)
            .then((data) => {
                setResponseDirections(data);
            })
            .finally(() => setLoadingDirections(false));
    };

    const getAllStores = async () => {
        await getAllFetchDataValues(`${processEnv.back}tiendas`).then(
            (resp: RootStores) => {
                console.log(resp.message);
                setAllStores(resp.message);
            }
        );
    };

    useEffect(() => {
        if (!allStores) return;
        console.log("Stores");
        console.log(allStores);
        console.log(route);
        getDataDirections();
    }, [allStores]);
    useEffect(() => {
        getAllStores();
    }, []);
    return (
        <div
            className="mapa flex flex-1 flex-col text-black px-3"
            style={{ gridArea: "productSold" }}
        >
            <span className="font-bold">Mapa de la Ruta.</span>
            <div className="flex flex-1">
                {loadingDirections ? (
                    <LoadingMap />
                ) : (
                    responseDirections && <Map route={responseDirections} controls />
                )}
            </div>
        </div>
    );
}
