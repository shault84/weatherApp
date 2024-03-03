import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { DailyForecast } from "../service/@typs";
import moment from "moment";

import { useState, useEffect } from "react";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";

const CardsFiveDays = ({ data, name, locationKey }: any) => {
  const [favoriteCities, setFavoriteCities] = useState<
    { name: string; key: number }[]
  >([]);

  useEffect(() => {
    const storedCities = localStorage.getItem("favoriteCities");
    if (storedCities) {
      setFavoriteCities(JSON.parse(storedCities));
    }
  }, []);

  const addCityToFavorites = (cityName: string, cityKey: number) => {
    const updatedFavoriteCities = [
      ...favoriteCities,
      { name: cityName, key: cityKey },
    ];
    setFavoriteCities(updatedFavoriteCities);
    localStorage.setItem(
      "favoriteCities",
      JSON.stringify(updatedFavoriteCities)
    );
  };

  const removeCityFromFavorites = (cityName: string) => {
    const updatedFavoriteCities = favoriteCities.filter(
      (city) => city.name !== cityName
    );
    setFavoriteCities(updatedFavoriteCities);
    localStorage.setItem(
      "favoriteCities",
      JSON.stringify(updatedFavoriteCities)
    );
  };

  const isFavorite = favoriteCities.some((city) => city.name === name);

  return (
    <div className="w-5/6 m-auto mt-4">
      <Card className="text-center">
        <Card.Header className="d-flex justify-content-between align-items-center">
          <span>{name}</span>
          <button
            className="btn btn-link p-0"
            onClick={() => {
              if (isFavorite) {
                removeCityFromFavorites(name);
              } else {
                addCityToFavorites(name, locationKey);
              }
            }}
          >
            {isFavorite ? (
              <MdFavorite size={30} />
            ) : (
              <MdFavoriteBorder size={30} />
            )}
          </button>
        </Card.Header>
        <Card.Body>
          <Card.Title bsPrefix="mt-1">{data.Headline.Text}</Card.Title>
        </Card.Body>
      </Card>
      <Row xs={1} sm={2} md={3} lg={4} xl={5} className="g-4 mt-1">
        {data.DailyForecasts.map((daily: DailyForecast) => (
          <Col key={daily.EpochDate}>
            <Card>
              <Card.Img
                variant="top"
                src={`https://developer.accuweather.com/sites/default/files/${String(
                  daily.Day.Icon
                ).padStart(2, "0")}-s.png`}
                alt="weather image"
              />
              <Card.Body>
                <Card.Title>
                  {daily.Date
                    ? moment(daily.Date, "YYYY-MM-DD").format("DD/MM/YYYY")
                    : ""}
                </Card.Title>
                <Card.Text>{daily.Temperature.Maximum.Value} °C</Card.Text>
                <Card.Text>{daily.Day.IconPhrase}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default CardsFiveDays;
