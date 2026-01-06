import { Schema, model, Document } from 'mongoose';

//Definimos la Interfaz para que TypeScript reconozca los campos
export interface IReport extends Document {
  category: 'geo' | 'transit'; // Diferencia si es un bache o un problema de bus
  type: string;               // Ejemplo: 'Bache', 'Semáforo dañado', 'Retraso'
  description: string;
  location: {
    city: string;
    latitude: number;
    longitude: number;
  };
  status: 'active' | 'resolved';
  createdAt: Date;
}

// 2. Definimos el Esquema de Mongoose (cómo se guarda en MongoDB)
const ReportSchema = new Schema<IReport>({
  category: { 
    type: String, 
    enum: ['geo', 'transit'], 
    required: true 
  },
  type: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  location: {
    city: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true }
  },
  status: { 
    type: String, 
    enum: ['active', 'resolved'], 
    default: 'active' 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

//  Exportamos el modelo
export const Report = model<IReport>('Report', ReportSchema);