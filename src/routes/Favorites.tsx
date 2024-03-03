import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Col, Row } from "react-bootstrap";
import { Current } from "../service/api";
import ErrorDialog from "../components/ErrorDialog ";

const Favorites = () => {
  const [showErrorDialog, setShowErrorDialog] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [favoriteCities, setFavoriteCities] = useState<
    { name: string; key: number }[]
  >([]);
  const [currentWeather, setCurrentWeather] = useState<any[]>([]);

  const fetchCurrentWeatherForAllCities = () => {
    const promises = favoriteCities.map((city) => {
      return Current(city.key)
        .then((res) => res.data[0])
        .catch((error) => {
          setShowErrorDialog(true);
          setErrorMsg(error?.message);
        });
    });

    Promise.all(promises)
      .then((weatherData) => {
        setCurrentWeather(weatherData);
      })
      .catch((error) => {
        setShowErrorDialog(true);
        setErrorMsg(error?.message);
      });
  };

  useEffect(() => {
    const storedCities = localStorage.getItem("favoriteCities");
    if (storedCities) {
      setFavoriteCities(JSON.parse(storedCities));
    }
  }, []);

  useEffect(() => {
    if (favoriteCities.length > 0) {
      fetchCurrentWeatherForAllCities();
    }
  }, [favoriteCities]);

  return (
    <div className="w-5/6 m-auto mt-4">
      <Row xs={1} sm={2} md={3} lg={4} xl={5} className="g-4 mt-1">
        {favoriteCities.map((city, index) => {
          const weather = currentWeather[index] || {};
          return (
            <Col key={index}>
              <Card>
                <Card.Body>
                  <Card.Title>{city.name}</Card.Title>
                  <Card.Text>{weather.Temperature?.Metric?.Value} °C</Card.Text>
                  <Card.Text>{weather.WeatherText}</Card.Text>
                  <Link
                    to={`/forecast/${city.name}/${city.key}`}
                    className="text-white text-decoration-none"
                  >
                    <Button variant="success">More</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
      <ErrorDialog
        show={showErrorDialog}
        onClose={() => setShowErrorDialog(false)}
        errorMsg={errorMsg}
      />
    </div>
  );
};

export default Favorites;
