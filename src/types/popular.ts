import { Decoder, number, object, string } from "decoders";
import { useEffect, useState } from "react";
import { getPopularUrls } from "../services/shortenerService";

export interface PopularUrl {
  code: string;
  visited: number;
}

export const popularUrlDecoder: Decoder<PopularUrl> = object({
  code: string,
  visited: number,
});

export function usePopularUrls(): [PopularUrl[], (popularUrls: PopularUrl[]) => void] {
  const [popularUrls, setPopularUrls] = useState<PopularUrl[]>([]);

  useEffect(() => {
    loadPopularUrls(setPopularUrls);
  }, []);

  return [popularUrls, setPopularUrls];
}

export async function loadPopularUrls(setter: (popularUrls: PopularUrl[]) => void) {
  setter(await getPopularUrls());
}