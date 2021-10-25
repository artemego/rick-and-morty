import {
  Gender,
  ICharacter,
  IEpisode,
  IItems,
  ILocation,
  IParams,
  Status,
} from "../../common/types";

export async function getItemsApi(page = 1, params?: IParams): Promise<IItems> {
  let queryParams: string;
  if (params) {
    queryParams = Object.entries(params)
      .map((entrie) => {
        return `${entrie[0]}=${entrie[1]}`;
      })
      .join("&");
  } else {
    queryParams = "";
  }

  const response = await fetch(
    `https://rickandmortyapi.com/api/character?page=${page}&${queryParams}`
  );
  if (!response.ok) throw response.statusText;
  const result: IItems = await response.json();
  return result;
}
export async function getCharApi(
  id: string | string[]
): Promise<ICharacter | null> {
  try {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character/${id}`
    );
    if (!response.ok) throw response.statusText;
    const result: ICharacter = await response.json();
    return result;
  } catch (err) {
    return null;
  }
}

export async function getLocationApi(url: string): Promise<ILocation | null> {
  try {
    const response = await fetch(url);
    if (!response.ok) throw response.statusText;
    const result = await response.json();
    return result;
  } catch (err) {
    return null;
  }
}
export async function getEpisodesApi(
  ids: string[]
): Promise<IEpisode[] | IEpisode | null> {
  try {
    const episodeIds: string = ids.join(",");
    const response = await fetch(
      `https://rickandmortyapi.com/api/episode/${episodeIds}`
    );
    if (!response.ok) throw response.statusText;
    const result = await response.json();
    return result;
  } catch (err) {
    return null;
  }
}
