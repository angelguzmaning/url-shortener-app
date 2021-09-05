import { Err, Ok, Result } from "@sniptt/monads/build";
import Axios from "axios";
import { array, guard, object, string } from "decoders";
import { jsendResultDecoder, jsendSuccessDecoder } from "../types/jsend";
import { popularUrlDecoder, PopularUrl } from "../types/popular";

export const shortenerServer = Axios.create();
export const serverUrl =
  process.env.REACT_APP_SERVER_URL || "http://localhost:7500";
shortenerServer.defaults.baseURL = serverUrl;

export async function getPopularUrls(): Promise<PopularUrl[]> {
  const { data } = await shortenerServer.get("/popular");

  return guard(
    jsendSuccessDecoder(object({ popularUrls: array(popularUrlDecoder) }))
  )(data).data.popularUrls;
}

export async function shorten(url: string): Promise<Result<string, string>> {
  const { data } = await shortenerServer.post("/shorten", { url });

  const result = guard(
    jsendResultDecoder(object({ code: string }), object({ error: string }))
  )(data);

  return result.status === "success"
    ? Ok(result.data.code)
    : Err(result.data.error);
}
