export interface BikeShareStation {
  id: string;
  name: string;
  availableBikes: number | null;
  emptyDocks: number | null;
  updatedAt: string | null;
}

export interface BikeShareNetwork {
  name: string;
  city: string;
  stations: BikeShareStation[];
}
