import express, { Request, Response, NextFunction } from 'express';
import getMeteorsUseCase from '../usecases/getMeteorsData';
import getLatestRoverImage from '../usecases/getLatestRoverImage';
import getApod from '../usecases/getApod';
import getEpicImages from '../usecases/getEpicImages';
import getEonetEvents from '../usecases/getEonetEvents';
import getDonkiNotifications from '../usecases/getDonkiNotifications';
import searchNasaImages from '../usecases/searchNasaImages';
import stringToBoolean from '../utils/booleanUtils';
import { format } from 'date-fns';
import validateRequest from '../middlewares/validateRequest';
import latestRoverImageSchema from '../schemas/latestRoverImageSchema';
import meteorsSchema from '../schemas/meteorsSchema';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.render('index.njk');
});

interface MeteorsQuery {
  date?: string;
  count?: string;
  'were-dangerous-meteors'?: string;
}

router.get("/meteors", async (req: Request<unknown, unknown, unknown, MeteorsQuery>, res: Response, next: NextFunction) => {
  try {
    let { date, count, "were-dangerous-meteors": wereDangerousMeteors } = req.query;

    date = date || format(new Date(), "yyyy-MM-dd");
    const countBoolean = stringToBoolean(count || "false");
    const wereDangerousMeteorsBoolean = stringToBoolean(wereDangerousMeteors || "false");

    const meteors = await getMeteorsUseCase({
      date,
      count: countBoolean,
      'were-dangerous-meteors': wereDangerousMeteorsBoolean,
    });

    res.json(meteors);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/meteors/html",
  validateRequest(meteorsSchema),
  async (req: Request<unknown, unknown, unknown, MeteorsQuery>, res: Response, next: NextFunction) => {
    try {
      let { date, count, "were-dangerous-meteors": wereDangerousMeteors } = req.query;

      date = date || format(new Date(), "yyyy-MM-dd");
      const countBoolean = stringToBoolean(count || "false");
      const wereDangerousMeteorsBoolean = stringToBoolean(wereDangerousMeteors || "false");

      const meteors = await getMeteorsUseCase({
        date,
        count: countBoolean,
        'were-dangerous-meteors': wereDangerousMeteorsBoolean,
      });

      res.render("meteors.njk", { date, meteors });
    } catch (error) {
      next(error);
    }
  }
);

router.get("/latest-rover-image-form", (req: Request, res: Response) => {
  res.render("roverForm.njk");
});

router.post(
  "/latest-rover-image",
  validateRequest(latestRoverImageSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId, userName, userAPIKey } = req.body;

      const imageData = await getLatestRoverImage({
        userId,
        userName,
        userAPIKey,
      });

      res.render("roverImage.njk", {
        userId,
        userName,
        latestImage: imageData.latestImage,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.get('/apod', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await getApod();
    res.render('apod.njk', { data });
  } catch (error) {
    next(error);
  }
});

router.get('/epic', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const images = await getEpicImages();
    res.render('epic.njk', { images });
  } catch (error) {
    next(error);
  }
});

router.get('/eonet', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const events = await getEonetEvents();
    res.render('eonet.njk', { events });
  } catch (error) {
    next(error);
  }
});

router.get('/donki', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const notifications = await getDonkiNotifications();
    res.render('donki.njk', { notifications });
  } catch (error) {
    next(error);
  }
});

router.get('/image-search', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const items = await searchNasaImages('moon');
    res.render('imageSearch.njk', { items });
  } catch (error) {
    next(error);
  }
});

export default router;
