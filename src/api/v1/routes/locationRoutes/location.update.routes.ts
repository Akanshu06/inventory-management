import { Router } from 'express';
import { updateLocation } from '../../controllors/locationController/location.update';

const router = Router();

router.put('/:id', updateLocation);

export { router as locationUpdateRoutes };