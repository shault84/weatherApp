export interface Location {
  Version: number;
  Key: string;
  Type: string;
  Rank: number;
  LocalizedName: string;
  Country: {
    ID: string;
    LocalizedName: string;
  };
  AdministrativeArea: {
    ID: string;
    LocalizedName: string;
  };
}

export interface AutocompleteResponse {
  location: Location[];
}

export interface Headline {
  EffectiveDate: string;
  EffectiveEpochDate: number;
  Severity: number;
  Text: string;
  Category: string;
  EndDate: string;
  EndEpochDate: number;
  MobileLink: string;
  Link: string;
}

export interface Temperature {
  Minimum: {
    Value: number;
    Unit: string;
    UnitType: number;
  };
  Maximum: {
    Value: number;
    Unit: string;
    UnitType: number;
  };
}

export interface DayNightForecast {
  Icon: number;
  IconPhrase: string;
  HasPrecipitation: boolean;
  PrecipitationType?: string;
  PrecipitationIntensity?: string;
}

export interface DailyForecast {
  Date: Date;
  EpochDate: number;
  Temperature: Temperature;
  Day: DayNightForecast;
  Night: DayNightForecast;
  Sources: string[];
  MobileLink: string;
  Link: string;
}

export interface FiveDaysDailyForecast {
  Headline: Headline;
  DailyForecasts: DailyForecast[];
}

export interface CurrentWeather {
  LocalObservationDateTime: string;
  EpochTime: number;
  WeatherText: string;
  WeatherIcon: number;
  HasPrecipitation: boolean;
  PrecipitationType: string;
  IsDayTime: boolean;
  Temperature: {
    Metric: {
      Value: number;
      Unit: string;
      UnitType: number;
    };
    Imperial: {
      Value: number;
      Unit: string;
      UnitType: number;
    };
  };
  MobileLink: string;
  Link: string;
}
