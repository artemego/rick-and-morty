import { ICharacter, IEpisode, IItems, ILocation } from '../../common/types';

export async function getItemsApi(page = 1): Promise<IItems> {
  const response = await fetch(
    `https://rickandmortyapi.com/api/character/?page=${page}`
  );
  const result: IItems = await response.json();
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
  // console.log(episodeIds);
  const response = await fetch(
    `https://rickandmortyapi.com/api/episode/${episodeIds}`
  );
  const result = await response.json();
  // console.log(result);
  return result;
}
