import { array, Decoder, object, string } from "decoders";
import { useEffect, useState } from "react";
import { guardOr } from "./decoder";

export interface SavedURL {
  url: string;
  code: string;
}

export const savedUrlDecoder: Decoder<SavedURL> = object({
  url: string,
  code: string,
});

export function useSavedUrls(): [SavedURL[], (url: SavedURL) => void] {
  const [savedUrls, setSavedUrls] = useState<SavedURL[]>([]);

  useEffect(() => {
    loadStoredUrls(setSavedUrls);
  }, []);

  const addUrl = (url: SavedURL) => {
    if (isUrlAlreadySaved(url, savedUrls)) return;
    addUrlToStateAndStorage(url, savedUrls, setSavedUrls);
  };

  return [savedUrls, addUrl];
}

function loadStoredUrls(setter: (urls: SavedURL[]) => void) {
  const storageUrls = localStorage.getItem("savedUrls");
  if (storageUrls) {
    setter(guardOr(array(savedUrlDecoder), JSON.parse(storageUrls), []));
  }
}

function isUrlAlreadySaved(url: SavedURL, savedUrls: SavedURL[]) {
  return savedUrls.find((x) => x.code === url.code && x.url === url.url);
}

function addUrlToStateAndStorage(
  url: SavedURL,
  savedUrls: SavedURL[],
  setter: (urls: SavedURL[]) => void
) {
  const newSavedUrls = [url, ...savedUrls];
  localStorage.setItem("savedUrls", JSON.stringify(newSavedUrls));
  setter(newSavedUrls);
}
