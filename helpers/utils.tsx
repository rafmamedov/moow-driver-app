import { decode } from "@mapbox/polyline";
import { CircleIcon } from "../assets/icons/circleIcon";
import { DriveModeIcon } from "../assets/icons/driveModeIcon";
import { MessagesIcon } from "../assets/icons/messagesIcon";
import { MoreInfoIcon } from "../assets/icons/moreInfoIcon";
import { UserIcon } from "../assets/icons/userIcon";
import { useNavBar } from "../context/navBarContext";
import { NavLink, Route } from "../types/types"

export const getIcon = (value: NavLink) => {
  const { activeNavLink } = useNavBar();

  switch (value) {
    case NavLink.drive:
      return <DriveModeIcon isActive={activeNavLink === value} />;
      case NavLink.messages:
      return <MessagesIcon isActive={activeNavLink === value} />;
    case NavLink.circle:
      return <CircleIcon isActive={activeNavLink === value} />;
    case NavLink.user:
      return <UserIcon isActive={activeNavLink === value} />;
    case NavLink.moreInfo:
      return <MoreInfoIcon isActive={activeNavLink === value} />;
    default: return null;
  };
};

export const getMidStep = (route: google.maps.DirectionsRoute) => Math.floor(route.legs[0].steps.length / 2);

export const getPinCoords = (route: google.maps.DirectionsRoute) => {
  const coords = route.legs[0].steps[getMidStep(route)].start_location;

  return {
    latitude: coords.lat,
    longitude: coords.lng,
  };
};

//@ts-ignore
export const getRouteCoords = (route: google.maps.DirectionsRoute) => (decode(route.overview_polyline.points).map(coords => ({
  latitude: coords[0],
  longitude: coords[1],
})));

export const getRoutesDetails = (routes: google.maps.DirectionsRoute[]) => {
  const details = routes.map(route => {
    if (route.legs[0].distance && route.legs[0].duration) {
      return {
        distance: route.legs[0].distance.text,
        duration: route.legs[0].duration.text,
        pinCoords: getPinCoords(route),
        routeCoords: getRouteCoords(route),
        route,
      }
    }

    return null;
  });

  return details.filter(detail => detail !== null) as Route[];
};

export const calculateArrivalDateTime = (
  departureDate: string,
  departureTime: string,
  travelDuration: string,
) => {
  const durationMatches = travelDuration.match(/(\d+)\s*(дн|год|хв)/g);
  let totalMinutes = 0;
  for (const match of durationMatches!) {
    const [amount, unit] = match.split(' ');
    if (unit === 'дн') {
      totalMinutes += parseInt(amount) * 24 * 60;
    } else if (unit === 'год') {
      totalMinutes += parseInt(amount) * 60;
    } else if (unit === 'хв') {
      totalMinutes += parseInt(amount);
    }
  }

  const [dd, mm, yyyy] = departureDate.split('.');
  const [hh, min] = departureTime.split(':');
  const departureDateTime = new Date(+yyyy, +mm - 1, +dd, +hh, +min);
  const arrivalDateTime = new Date(departureDateTime);
  const days = Math.floor(totalMinutes / (24 * 60));
  const remainingMinutes = totalMinutes % (24 * 60);

  arrivalDateTime.setDate(arrivalDateTime.getDate() + days);
  arrivalDateTime.setHours(arrivalDateTime.getHours() + Math.floor(remainingMinutes / 60));
  arrivalDateTime.setMinutes(arrivalDateTime.getMinutes() + (remainingMinutes % 60));

  const formattedDate = `${arrivalDateTime.getDate()}.${arrivalDateTime.getMonth() + 1}.${arrivalDateTime.getFullYear()}`;
  const formattedHours = arrivalDateTime.getHours().toString().padStart(2, '0');
  const formattedMinutes = arrivalDateTime.getMinutes().toString().padStart(2, '0');
  const formattedTime = `${formattedHours}:${formattedMinutes}`;

  return {
    date: formattedDate,
    time: formattedTime,
  };
};
