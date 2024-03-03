import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const baseUrl = "https://dataservice.accuweather.com";
const apiKey = "Rfd670FoMOjq3jeLA6WhriGPfDAl2SAU";
// const apiKey = "bY5Bm1CUeBBJLrpFOMLAeQuEpbcSqcev";
// const apiKey = "LkaJdFFG7dDDuK4u7EF3LThNAmojVjH2";
// const apiKey = "jbwU87hsy4Owo1QNuzAheBMbTG2l43XN";
// const apiKey = "tFqWmXGR3tB9hCRulZ8Lhi9BflXAx8dz";

const client = axios.create({ baseURL: baseUrl });

const onFailure = (error: any) => {
  throw error;
};

const onSuccess = (res: AxiosResponse) => {
  return res;
};

export const request = (config: AxiosRequestConfig) => {
  return client(config).catch(onFailure).then(onSuccess);
};

export const Autocomplete = (search: string) =>
  request({
    url: `/locations/v1/cities/autocomplete?apikey=${apiKey}&q=${search}`,
  });

export const FiveDays = (keyCity: number) =>
  request({
    url: `/forecasts/v1/daily/5day/${keyCity}?apikey=${apiKey}&metric=true`,
  });

export const Current = (keyCity: number) =>
  request({
    url: `/currentconditions/v1/${keyCity}?apikey=${apiKey}`,
  });
