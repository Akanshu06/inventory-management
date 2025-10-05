import { Request, Response } from 'express';
import { Location } from '../../../models/Location';
import { formatResponse } from '../../../utils/helpers';

export class LocationController {
  static async createLocation(req: Request, res: Response) {
    try {
      const location = await Location.create(req.body);
      
      res.status(201).json(
        formatResponse(true, location, 'Location created successfully')
      );
    } catch (error: any) {
      res.status(400).json(
        formatResponse(false, null, error.message)
      );
    }
  }

  static async getLocation(req: Request, res: Response) {
    try {
      const { locationId } = req.params;
      
      const location = await Location.findById(locationId);
      
      if (!location) {
        return res.status(404).json(
          formatResponse(false, null, 'Location not found')
        );
      }

      res.json(
        formatResponse(true, location, 'Location retrieved successfully')
      );
    } catch (error: any) {
      res.status(500).json(
        formatResponse(false, null, error.message)
      );
    }
  }

  static async getAllLocations(req: Request, res: Response) {
    try {
      const locations = await Location.find();
      
      res.json(
        formatResponse(true, locations, 'Locations retrieved successfully')
      );
    } catch (error: any) {
      res.status(500).json(
        formatResponse(false, null, error.message)
      );
    }
  }

  static async updateLocation(req: Request, res: Response) {
    try {
      const { locationId } = req.params;
      
      const location = await Location.findByIdAndUpdate(
        locationId,
        { $set: req.body },
        { new: true, runValidators: true }
      );

      if (!location) {
        return res.status(404).json(
          formatResponse(false, null, 'Location not found')
        );
      }

      res.json(
        formatResponse(true, location, 'Location updated successfully')
      );
    } catch (error: any) {
      res.status(400).json(
        formatResponse(false, null, error.message)
      );
    }
  }

  static async deleteLocation(req: Request, res: Response) {
    try {
      const { locationId } = req.params;
      
      const location = await Location.findByIdAndDelete(locationId);

      if (!location) {
        return res.status(404).json(
          formatResponse(false, null, 'Location not found')
        );
      }

      res.json(
        formatResponse(true, null, 'Location deleted successfully')
      );
    } catch (error: any) {
      res.status(500).json(
        formatResponse(false, null, error.message)
      );
    }
  }
}