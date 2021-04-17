export interface Result {
  name: string;
  url: string;
}

export interface pokemonResponseModel {
  count: number;
  next: string;
  previous?: any;
  results: Result[];
}
