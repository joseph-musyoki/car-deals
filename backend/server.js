import express from 'express';
import dotenv from 'dotenv'
import cors from 'cors';

//db connection function
import connectDb from './config/db.js';

//routes
import authRoutes from './routes/auth.routes.js'
import vehicleRoutes from './routes/vehicle.routes.js'
import testdriveRoutes from './routes/testdrive.routes.js'
import dashboardRoutes from './routes/dashboard.routes.js'
import uploadRoutes from './routes/upload.js'

dotenv.config()

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://car-deals-1-2gdv.onrender.com"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth',authRoutes);
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/testdrives', testdriveRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/upload', uploadRoutes);

const PORT = process.env.PORT||5000;

app.listen(PORT, ()=>{
    console.log(`server started at http://localhost:${PORT}`);
    connectDb()
})