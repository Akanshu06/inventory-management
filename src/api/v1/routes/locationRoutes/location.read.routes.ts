import { Router } from 'express';
import { getAllLocations, getLocationById } from '../../controllors/locationController/location.read';

const router = Router();

router.get('/', getAllLocations);
router.get('/:id', getLocationById);

export { router as locationReadRoutes };