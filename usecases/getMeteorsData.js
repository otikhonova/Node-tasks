const getMeteorsInfo = require('../repositories/meteorsRepository');

const getMeteorsData = async () => {
    const startDate = process.env.START_DATE;
    const endDate = process.env.END_DATE;

    const meteorsData = await getMeteorsInfo(startDate, endDate);

    const filteredData = meteorsData.map((meteor) => ({
        id: meteor.id,
        name: meteor.name,
        diameter_meters: meteor.estimated_diameter.meters.estimated_diameter_max,
        is_potentially_hazardous_asteroid: meteor.is_potentially_hazardous_asteroid,
        close_approach_date_full: meteor.close_approach_data[0].close_approach_date_full,
        relative_velocity_kps: meteor.close_approach_data[0].relative_velocity.kilometers_per_second
  }));

  return filteredData;
};

module.exports = getMeteorsData;
