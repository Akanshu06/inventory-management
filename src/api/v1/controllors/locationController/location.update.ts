import { Request, Response } from 'express';
import { Location } from '../../../../models/Location';
import { formatResponse } from '../../../../utils/helpers';

export const updateLocation = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const location = await Location.findByIdAndUpdate(
      id,
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
};