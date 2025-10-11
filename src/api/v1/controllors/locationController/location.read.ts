import { Request, Response } from 'express';
import { Location } from '../../../../models/Location';
import { formatResponse } from '../../../../utils/helpers';

export const getLocationById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const location = await Location.findById(id);
    
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
};

export const getAllLocations = async (req: Request, res: Response) => {
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
};