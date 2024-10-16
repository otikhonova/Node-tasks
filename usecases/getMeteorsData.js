const getMeteorsInfo = require("../repositories/meteorsRepository");
const Exception = require('../utils/Exception'); 

const getMeteorsData = async (query) => {
  const { date, count, 'were-dangerous-meteors': wereDangerousMeteors } = query;

  const startDate = date;
  const endDate = date;

  const meteorsData = await getMeteorsInfo(startDate, endDate);

  console.log('meteorsData:', meteorsData);

  if (!meteorsData) {
    throw new Exception('Failed to fetch data from NASA API', 500);
  }

  const meteorsArray = meteorsData[startDate];
  
  if (!Array.isArray(meteorsArray)) {
    throw new Exception('Expected an array of meteors, but received something else', 500);
  }

  const filteredData = meteorsArray.map((meteor) => {
    const diameter_meters = meteor.estimated_diameter?.meters?.estimated_diameter_max || 'unknown';
    const closeApproachData = meteor.close_approach_data?.[0] || {};
    const close_approach_date_full = closeApproachData.close_approach_date_full || 'unknown';
    const relative_velocity_kps = closeApproachData.relative_velocity?.kilometers_per_second || 'unknown';
  
    return {
      id: meteor.id || 'unknown',
      name: meteor.name || 'unknown',
      diameter_meters, 
      is_potentially_hazardous_asteroid: meteor.is_potentially_hazardous_asteroid || false,
      close_approach_date_full,
      relative_velocity_kps,
    };
  });

  if (count === true) {
    return { count: filteredData.length };
  }

  if (wereDangerousMeteors === true) {
    const dangerousMeteors = filteredData.filter(meteor => meteor.is_potentially_hazardous_asteroid);
    return { wereDangerousMeteors: dangerousMeteors.length > 0 };
  }

  return filteredData;
};

module.exports = getMeteorsData;
