enum Gender {
  Male = 'male',
  Female = 'female',
}
enum Status {
  Alive = 'alive',
  Dead = 'dead',
}

export interface ICharacter {
  id: number;
  name: string;
  status: Status; //enum
  gender: Gender; //enum
  created: Date;
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
  air_date: Date;
  episode: string;
  characters: string[];
  url: string;
  created: Date;
}

export interface ILocation {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  url: string;
  created: Date;
}

export interface IItems {
  info: IInfo;
  results: ICharacter[];
}
