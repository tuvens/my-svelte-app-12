export interface City {
  name: string;
  latitude: number;
  longitude: number;
  globalRegion: string;
}

export interface Country {
  name: string;
  isoCode: string;
  latitude: number;
  longitude: number;
  cities: City[];
}

export interface GlobalRegion {
  name: string;
  latitude: number;
  longitude: number;
  countries: string[]; // Array of country names
}

export interface PlacesData {
  globalRegions: GlobalRegion[];
  countries: Country[];
}

  