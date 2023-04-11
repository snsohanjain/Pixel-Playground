import { useState, useEffect } from "react";
import apiClient from "../services/api-client";

export interface Platform {
    id: number;
    name: string;
    slug:string;
}
export interface Game {
    id: number;
    name: string;
    background_image: string;
    parent_platforms: {platform: Platform} []
    metacritic: number;
  }
  
  interface FetchGamesResponse {
    count: number;
    results: Game[];
  }

export const useGames = () => {
    const [games, setGames] = useState<Game[]>([]);
    const [error, setError] = useState("");
    const [isLoading, setLoading] = useState(false);

   
    useEffect(() => {
        setLoading(true);
      apiClient
        .get<FetchGamesResponse>("/games")
        .then((res) => {setGames(res.data.results);
            setLoading(false);
    })
        .catch((err) => {setError(err.message);
            setLoading(false);
        });
    }, []);
    return {games, error, isLoading};
}
