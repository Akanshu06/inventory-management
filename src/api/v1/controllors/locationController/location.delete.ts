import { Request, Response } from 'express';
import { Location } from '../../../../models/Location';
import { formatResponse } from '../../../../utils/helpers';

export const deleteLocation = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const location = await Location.findByIdAndDelete(id);

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
};