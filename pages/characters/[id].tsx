import type {
  GetStaticProps,
  GetStaticPropsContext,
  GetStaticPropsResult,
  NextPage,
} from "next";
import React from "react";
import { ICharacter, IEpisode, IItems, ILocation } from "../../common/types";
import { Character } from "../../components/Character/Character";
import { ParsedUrlQuery } from "querystring";

import {
  getCharApi,
  getEpisodesApi,
  getItemsApi,
  getLocationApi,
} from "../api/items";

export const getStaticPaths = async () => {
  // get the total amount of characters
  const data = await getItemsApi();
  const paths: any = [];

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
  character: ICharacter | null;
  location: ILocation | null;
  origin: ILocation | null;
  episodes: IEpisode | IEpisode[] | null;
};

interface Params extends ParsedUrlQuery {
  id: string;
}

const formatDateString = (dateString: string): string => {
  let date = new Date(dateString);

  let year = date.getFullYear();
  let month: number | string = date.getMonth() + 1;
  let day: number | string = date.getDate();

  if (day < 10) {
    day = "0" + day;
  }
  if (month < 10) {
    month = "0" + month;
  }

  let formattedDate = day + "-" + month + "-" + year;

  return formattedDate;
};

export const getStaticProps: GetStaticProps<Props, Params> = async (
  context
) => {
  const params = context.params!;
  const character = await getCharApi(params.id);
  if (character) {
    const location = !character.location.url
      ? null
      : await getLocationApi(character.location.url);

    const origin = !character.origin.url
      ? null
      : character.location?.url === character.origin?.url
      ? location
      : await getLocationApi(character.origin.url);
    const episodeNumbers: string[] = character.episode.map(
      (ep) => ep.match(/\d+/g)?.join("") || ""
    );
    const episodes = await getEpisodesApi(episodeNumbers);

    // format dates
    character.created = formatDateString(character.created);
    if (location) {
      location.created = formatDateString(location.created);
    }
    if (origin && origin !== location) {
      origin.created = formatDateString(origin.created);
    }

    return {
      props: { character, location, origin, episodes },
    };
  } else {
    return {
      props: {
        character: null,
        location: null,
        origin: null,
        episodes: null,
      },
    };
  }
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
