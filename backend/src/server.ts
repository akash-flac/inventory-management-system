// import * as jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

import express, { Request, Response } from 'express';

import itemRouter from './Item/Router/itemRoutes'
import employeeRouter from './Employee/Router/employeeRoutes'
import approvalRouter from './Approvals/Router/approvalRoutes'
import defectiveInventoryRouter from './DefectiveInventory/Router/defectiveInventoryRoutes'
import assignedItemRouter from './AssignedItem/Router/assignedItemsRoutes'
import authenticationRouter from './Authentication/Router/authenticationRouter'

import { prisma } from './lib/db';
import cors from 'cors';
import { decodeToken, generateAccessToken, isTokenSignatureValid } from './Authentication/Service/authenticationService';
import { authMiddleware } from './middleware/authMiddleware'

import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const PORT: number = 3000;

const app = express();

app.use(cookieParser());
app.use(express.json());

const corsOptions = {  // Replace with your frontend URL
    origin: process.env.FRONTEND_URL,
    // origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  };

  
app.use(cors(corsOptions))


// Enable pre-flight for all routes
app.options('*', cors(corsOptions));

app.use('/auth', authenticationRouter)
app.use('/employee', authMiddleware, employeeRouter);
app.use('/item', authMiddleware, itemRouter);
app.use('/approval', authMiddleware, approvalRouter);
app.use('/defective', authMiddleware, defectiveInventoryRouter);
app.use('/assignedItem', authMiddleware, assignedItemRouter);


// app.get('/', authMiddleware,  function (req: Request, res: Response) {
app.get('/', function (req: Request, res: Response) {
    res.json({msg: "All good"});
}
)


app.get('/delete', async function (req: Request, res: Response) {

    const response = await prisma.admin.deleteMany({

    })

    res.json(response)
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})

