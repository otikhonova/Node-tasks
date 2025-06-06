export interface MeteorResponse {
    id: string;
    name: string;
    diameter_meters: number | string;
    is_potentially_hazardous_asteroid: boolean;
    close_approach_date_full: string;
    relative_velocity_kps: string;
  }