import { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Form, ListGroup } from "react-bootstrap";
import { Autocomplete, FiveDays } from "../service/api";
import { Location } from "../service/@typs";
import ErrorDialog from "../components/ErrorDialog ";
import CardsFiveDays from "../components/CardsFiveDays";
import Spinner from "../components/Spinner ";
import WeatherContext from "../utils/WeatherContext";
import { useParams } from "react-router-dom";

const Home = () => {
  const { setFiveDaysDailyForecast } = useContext(WeatherContext);
  const { city: selectedCity, key: selectedCityKey } = useParams<{
    city: string;
    key: string;
  }>();
  const [searchTerm, setSearchTerm] = useState<string>(
    selectedCity || "Tel Aviv"
  );
  const [keyCity, setKeyCity] = useState<number>(
    selectedCityKey ? parseInt(selectedCityKey) : 215854
  );
  const [city, setCity] = useState<string>(selectedCity || "Tel Aviv");
  const [autocompleteOptions, setAutocompleteOptions] = useState<string[]>([]);
  const [pageLoading, setPageLoading] = useState<boolean>(false);
  const [showErrorDialog, setShowErrorDialog] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [optionSelected, setOptionSelected] = useState<boolean>(false);

  const { data: res } = useQuery("get five days", () => FiveDays(keyCity), {
    enabled: !pageLoading,
  });

  useEffect(() => {
    if (res && res.data) {
      setFiveDaysDailyForecast(res.data);
      setPageLoading(false);
    }
  }, [keyCity, res]);

  const handleAutocomplete = (e: any) => {
    const { value } = e.target;
    setSearchTerm(value);
    fetchAutocompleteOptions(value);
  };

  const handleCitySelection = (selectedCity: string) => {
    setSearchTerm(selectedCity);
    setCity(selectedCity);
    setKeyCity(keyCity);
    setPageLoading(true);
    setOptionSelected(true);
    Autocomplete(selectedCity)
      .then((res) => {
        setKeyCity(Number(res.data[0]?.Key));
        FiveDays(keyCity)
          .then((res) => {
            setFiveDaysDailyForecast(res.data);
            setPageLoading(false);
          })
          .catch((error) => {
            setShowErrorDialog(true);
            setErrorMsg(error?.message);
            setPageLoading(false);
          });
      })
      .catch((error) => {
        setShowErrorDialog(true);
        setErrorMsg(error?.message);
        setPageLoading(false);
      });
  };

  const fetchAutocompleteOptions = (value: any) => {
    setTimeout(() => {
      if (value !== "") {
        Autocomplete(value)
          .then((res) => {
            setAutocompleteOptions(
              res.data.map((city: Location) => city.LocalizedName)
            );
          })
          .catch((error) => {
            setShowErrorDialog(true);
            setErrorMsg(error?.message);
          });
      } else {
        setAutocompleteOptions([]);
      }
    }, 500);
  };

  // Determine if the data is still loading
  const isLoading = pageLoading || !res;

  return (
    <div>
      <Form.Group controlId="searchInput" className="w-1/2 m-auto mt-4">
        <Form.Control
          type="text"
          placeholder="Search for a city..."
          value={searchTerm}
          onChange={handleAutocomplete}
          autoComplete="off"
          onClick={() => {
            if (autocompleteOptions.length > 0) {
              setOptionSelected(false);
            }
          }}
        />
        {autocompleteOptions.length > 0 && !optionSelected && (
          <ListGroup className="mt-1">
            {autocompleteOptions.map((option, index) => (
              <ListGroup.Item
                key={index}
                action
                onClick={() => handleCitySelection(option)}
              >
                {option}
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Form.Group>

      {res?.data.DailyForecasts.length > 0 ? (
        <CardsFiveDays data={res?.data} name={city} locationKey={keyCity} />
      ) : (
        <div className="flex justify-center items-center mt-16 ">
          {isLoading ? (
            <Spinner name="Puff" />
          ) : (
            <h5> No results have been found</h5>
          )}
        </div>
      )}

      <ErrorDialog
        show={showErrorDialog}
        onClose={() => setShowErrorDialog(false)}
        errorMsg={errorMsg}
      />
    </div>
  );
};

export default Home;
