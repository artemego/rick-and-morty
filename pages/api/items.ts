import {
  Gender,
  ICharacter,
  IEpisode,
  IItems,
  ILocation,
  IParams,
  Status,
} from '../../common/types';

export async function getItemsApi(page = 1, params?: IParams): Promise<IItems> {
  let queryParams: string;
  if (params) {
    queryParams = Object.entries(params)
      .map((entrie) => {
        return `${entrie[0]}=${entrie[1]}`;
      })
      .join('&');
    console.log(queryParams);
  } else {
    queryParams = '';
  }

  const response = await fetch(
    `https://rickandmortyapi.com/api/character/?page=${page}&${queryParams}`
  );
  console.log(response);
  if (!response.ok) throw response.statusText;
  const result: IItems = await response.json();
  console.log(result);
  return result;
}
export async function getCharApi(id: string | string[]): Promise<ICharacter> {
  const response = await fetch(
    `https://rickandmortyapi.com/api/character/${id}`
  );
  const result: ICharacter = await response.json();
  return result;
}

export async function getLocationApi(url: string): Promise<ILocation> {
  const response = await fetch(url);
  const result = await response.json();
  return result;
}
export async function getEpisodesApi(
  ids: string[]
): Promise<IEpisode[] | IEpisode> {
  const episodeIds: string = ids.join(',');
  const response = await fetch(
    `https://rickandmortyapi.com/api/episode/${episodeIds}`
  );
  const result = await response.json();
  return result;
}
