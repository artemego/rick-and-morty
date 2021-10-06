import type {
  GetStaticProps,
  GetStaticPropsContext,
  GetStaticPropsResult,
  NextPage,
} from 'next';
import React from 'react';
import { ICharacter, IEpisode, IItems, ILocation } from '../../common/types';
import { Character } from '../../components/Character/Character';
import { ParsedUrlQuery } from 'querystring';

import {
  getCharApi,
  getEpisodesApi,
  getItemsApi,
  getLocationApi,
} from '../api/items';

export const getStaticPaths = async () => {
  // get the total amount of characters
  const data = await getItemsApi();
  const paths: any = [];

  console.log('generating ids');
  // generate paths ids
  for (let i = 1; i <= data.info.count; i++) {
    paths.push({
      params: { id: i.toString() },
    });
  }

  return {
    paths,
    fallback: false,
  };
};

type Props = {
  character: ICharacter;
  location: ILocation | null;
  origin: ILocation | null;
  episodes: IEpisode | IEpisode[];
};

interface Params extends ParsedUrlQuery {
  id: string;
}

export const getStaticProps: GetStaticProps<Props, Params> = async (
  context
) => {
  const params = context.params!;
  const character = await getCharApi(params.id);
  const location = !character.location.url
    ? null
    : await getLocationApi(character.location.url);

  const origin = !character.origin.url
    ? null
    : character.location?.url === character.origin?.url
    ? location
    : await getLocationApi(character.origin.url);
  const episodeNumbers: string[] = character.episode.map(
    (ep) => ep.match(/\d+/g)?.join('') || ''
  );
  const episodes = await getEpisodesApi(episodeNumbers);
  return {
    props: { character, location, origin, episodes },
  };
};

const CharacterContainer: NextPage<Props> = ({
  character,
  location,
  origin,
  episodes,
}) => {
  return (
    <div>
      <Character
        character={character}
        location={location}
        origin={origin}
        episodes={episodes}
      />
    </div>
  );
};

export default CharacterContainer;
