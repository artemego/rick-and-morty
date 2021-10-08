export enum Gender {
  Male = 'Male',
  Female = 'Female',
  Unknown = 'unknown',
}
export enum Status {
  Alive = 'Alive',
  Dead = 'Dead',
  Unknown = 'unknown',
}

export interface ICharacter {
  id: number;
  name: string;
  status: Status; //enum
  gender: Gender; //enum
  created: string;
  episode: string[];
  image: string;
  location: {
    name: string;
    url: string;
  };
  origin: {
    name: string;
    url: string;
  };
  species: string;
  type: string;
  url: string;
}

export interface IInfo {
  count: number;
  next?: string;
  pages: number;
  prev?: string;
}

export interface IEpisode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
}

export interface ILocation {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  url: string;
  created: string;
}

export interface IItems {
  info: IInfo;
  results: ICharacter[];
}
