const getMeteorsInfo = require("../repositories/meteorsRepository");
const { format } = require('date-fns');

const getMeteors = async (query) => {
  const { date, count, 'were-dangerous-meteors': wereDangerousMeteors } = query;

  const queryDate = date || format(new Date(), 'yyyy-MM-dd');
  const startDate = queryDate;
  const endDate = queryDate;

  const meteorsData = await getMeteorsInfo(startDate, endDate);

  const filteredData = meteorsData.map((meteor) => {
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

  if (count === 'true') {
    return { count: filteredData.length };
  }

  if (wereDangerousMeteors === 'true') {
    const dangerousMeteors = filteredData.filter(meteor => meteor.is_potentially_hazardous_asteroid);
    return { wereDangerousMeteors: dangerousMeteors.length > 0 };
  }

  return filteredData;
};

module.exports = getMeteors;