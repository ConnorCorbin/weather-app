export interface Weather {
  date: string;
  tempMaxUnit: string;
  tempMinUnit: string;
  speedMaxUnit: string;
  tempMax: number;
  tempMin: number;
  speedMax: number;
  descriptionCode: number;
  description: string | null;
}
