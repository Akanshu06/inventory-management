import { Request, Response } from 'express';
import { Location } from '../../../../models/Location';
import { formatResponse } from '../../../../utils/helpers';

export const createLocation = async (req: Request, res: Response) => {
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
};