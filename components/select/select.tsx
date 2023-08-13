import { FC } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { LatLng } from "react-native-maps";
import { destinationInput, originInput } from "./style";
import { KEY } from "../../helpers/api";

type Props = {
  setOrigin: React.Dispatch<React.SetStateAction<LatLng | null>>;
  setDestination: React.Dispatch<React.SetStateAction<LatLng | null>>;
}

const Select: FC<Props> = ({ setOrigin, setDestination }) => {
  return (
    <>
      <GooglePlacesAutocomplete
          placeholder='Адреса точки загрузки'
          fetchDetails
          GooglePlacesSearchQuery={{
            rankby: 'distance',
          }}
          onPress={(data, details = null) => {
            details && (
              setOrigin({
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
              })
            )
          }}
          query={{
            key: KEY,
            language: 'en',
            types: ['(cities)', 'address'],
          }}
          styles={originInput}
        />

        <GooglePlacesAutocomplete
          placeholder='Пункт призначення'
          fetchDetails
          GooglePlacesSearchQuery={{
            rankby: 'distance',
          }}
          onPress={(data, details = null) => {
            details && (
              setDestination({
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
              })
            )
          }}
          query={{
            key: KEY,
            language: 'en',
            types: ['(cities)', 'address'],
          }}
          styles={destinationInput}
        />
    </>
  );
};

export default Select;
