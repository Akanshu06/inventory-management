import { Router } from 'express';
import { validate } from '../../../middlewares/validation';
import { LocationController } from '../controllors/locationController';
import {
    createLocationSchema,
    locationIdSchema,
    updateLocationSchema
} from '../validators/locationValidator';

const router = Router();

// Create a new location
router.post(
  '/',
  validate(createLocationSchema),
  LocationController.createLocation
);

// Get all locations
router.get(
  '/',
  LocationController.getAllLocations
);

// Get a specific location
router.get(
  '/:locationId',
  validate(locationIdSchema),
  LocationController.getLocation
);

// Update a location
router.put(
  '/:locationId',
  validate(updateLocationSchema),
  LocationController.updateLocation
);

// Delete a location
router.delete(
  '/:locationId',
  validate(locationIdSchema),
  LocationController.deleteLocation
);

export { router as locationRoutes };
