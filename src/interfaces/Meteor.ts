export interface Meteor {
    id: string;
    name: string;
    estimated_diameter: {
      meters: {
        estimated_diameter_max: number;
      };
    };
    is_potentially_hazardous_asteroid: boolean;
    close_approach_data: {
      close_approach_date_full: string;
      relative_velocity: {
        kilometers_per_second: string;
      };
    }[];
  }
  