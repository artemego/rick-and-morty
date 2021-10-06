import React from 'react';
import { ICharacter, IEpisode, ILocation } from '../../common/types';
import styles from './Character.module.scss';
import Image from 'next/image';
import { EpTable } from '../Table/EpTable';

interface CharacterProps {
  character: ICharacter;
  origin: ILocation | null;
  location: ILocation | null;
  episodes: IEpisode[] | IEpisode;
}

export const Character: React.FC<CharacterProps> = ({
  character,
  origin,
  location,
  episodes,
}) => {
  return (
    <div className={styles.characterWrapper}>
      <h1>{character.name}</h1>
      <Image
        width="300px"
        height="300px"
        src={character.image}
        alt={`${character.name} avatar`}
      />
      <div className={styles.characterInfo}>
        <h2>
          <span>Location{origin?.id === location?.id && '/Origin'}: </span>
          {character.location.name}
        </h2>
        {location && (
          <ul>
            <li>
              <h3>Dimention: {location.dimension}</h3>
            </li>
            <li>
              <h3>Type: {location.type}</h3>
            </li>
            <li>
              <h3>Residents count: {location.residents.length}</h3>
            </li>
            <li>
              <h3>Dimention: {location.dimension}</h3>
            </li>
            <li>
              <h3>Created: {location.created}</h3>
            </li>
          </ul>
        )}

        {origin?.id !== location?.id && (
          <div>
            <h2>
              <span>Origin: </span>
              {character.origin.name}
            </h2>
            {origin && (
              <ul>
                <li>
                  <h3>Dimention: {origin.dimension}</h3>
                </li>
                <li>
                  <h3>Type: {origin.type}</h3>
                </li>
                <li>
                  <h3>Residents count: {origin.residents.length}</h3>
                </li>
                <li>
                  <h3>Dimention: {origin.dimension}</h3>
                </li>
                <li>
                  <h3>Created: {origin.created}</h3>
                </li>
              </ul>
            )}
          </div>
        )}

        <h2>
          <span>Created: </span>
          {character.created}
        </h2>
        <h2>
          <span>Gender: </span>
          {character.gender}
        </h2>
        <h2>
          <span>Species: </span>
          {character.species}
        </h2>
        <h2>
          <span>Status: </span>
          {character.status}
        </h2>
        {character.type && (
          <h2>
            <span>Type: </span>
            {character.type}
          </h2>
        )}
      </div>

      <h2>List of episodes with this character: </h2>
      <EpTable eps={episodes} />
    </div>
  );
};
