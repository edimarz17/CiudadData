import { Request, Response } from 'express';
import { GeoService } from '../services/geo.service';
import { Report } from '../models/report.model';

export const getCityData = async (req: Request, res: Response) => {
  try {
    const { city } = req.params; 
    
    const data = await GeoService.getCityData(city); 
    
    return res.status(200).json({
      status: 'success',
      data
    });
  } catch (error: any) {

    if (error.message === 'Ciudad no encontrada') {
      return res.status(404).json({ message: error.message });
    }
    
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const createReport = async (req: Request, res: Response) => {
  try {
    const { type, description, city, latitude, longitude } = req.body;

    if (!type || !city) {
      return res.status(400).json({ message: 'Faltan campos obligatorios' });
    }

   const newReport = new Report({
      category: 'geo',
      type: req.body.type,
      description: req.body.description,
      location: {
        city: req.body.city,
        latitude: req.body.latitude,
        longitude: req.body.longitude
      }
    });

    const savedReport = await newReport.save();

    return res.status(201).json({
      status: 'success',
      message: 'Reporte ciudadano guardado correctamente',
      data: savedReport
    });
  } catch (error: any) {
    return res.status(400).json({ message: 'Error al guardar el reporte', error: error.message });
  }
};