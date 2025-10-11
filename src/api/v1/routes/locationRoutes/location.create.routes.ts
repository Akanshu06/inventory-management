import { Router } from 'express';
import { createLocation } from '../../controllors/locationController/location.create';

const router = Router();

router.post('/', createLocation);

export { router as locationCreateRoutes };