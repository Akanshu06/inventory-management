import { Router } from 'express';
import { createLocation } from '../../controllors/locationController/location.create';
import { getAllLocations, getLocationById } from '../../controllors/locationController/location.read';
import { updateLocation } from '../../controllors/locationController/location.update';
import { deleteLocation } from '../../controllors/locationController/location.delete';

const router = Router();

router.post('/', createLocation);
router.get('/', getAllLocations);
router.get('/:id', getLocationById);
router.put('/:id', updateLocation);
router.delete('/:id', deleteLocation);

export { router as locationRoutes };