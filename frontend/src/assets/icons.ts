import Bike from '../../assets/icons/bicycle.svg';
import Cart from '../../assets/icons/cart.svg';
import ChevronRight from '../../assets/icons/chevron-forward.svg';
import ChevronLeft from '../../assets/icons/chevron-left.svg';
import Document from '../../assets/icons/document.svg';
import EBike from '../../assets/icons/e-bike.svg';
import Heart from '../../assets/icons/heart.svg';
import Helmet from '../../assets/icons/helmet.svg';
import Map from '../../assets/icons/map.svg';
import Minus from '../../assets/icons/minus.svg';
import Mountain from '../../assets/icons/mountain.svg';
import Profile from '../../assets/icons/person.svg';
import Plus from '../../assets/icons/plus.svg';
import Road from '../../assets/icons/road.svg';
import Search from '../../assets/icons/search.svg';

export const icons = {
  bike: Bike,
  cart: Cart,
  'chevron-right': ChevronRight,
  'chevron-left': ChevronLeft,
  document: Document,
  'e-bike': EBike,
  heart: Heart,
  helmet: Helmet,
  map: Map,
  minus: Minus,
  mountain: Mountain,
  profile: Profile,
  plus: Plus,
  road: Road,
  search: Search,
} as const;

export type IconName = keyof typeof icons;
export const iconNames = Object.keys(icons) as IconName[];
