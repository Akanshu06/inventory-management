import { Router } from 'express';
import { deleteLocation } from '../../controllors/locationController/location.delete';

const router = Router();

router.delete('/:id', deleteLocation);

export { router as locationDeleteRoutes };