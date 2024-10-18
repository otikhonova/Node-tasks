import express, { Request, Response, NextFunction } from 'express';
import getMeteorsUseCase from '../usecases/getMeteorsData';
import getLatestRoverImage from '../usecases/getLatestRoverImage';
import stringToBoolean from '../utils/booleanUtils';
import { format } from 'date-fns';
import config from '../config';
import validateRequest from '../middlewares/validateRequest';
import latestRoverImageSchema from '../schemas/latestRoverImageSchema';
import meteorsSchema from '../schemas/meteorsSchema';

const router = express.Router();

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

export default router;
