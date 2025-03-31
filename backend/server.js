import express from 'express';
import dotenv from 'dotenv';

import cors from 'cors';
// import userRoutes from './routes/userRoutes.js';
import connectDB from './db.js';
import User from './model/UserModel.js';
// import shopRoutes from "./routes/shopRoutes.js";
// import productRoutes from './routes/productRoutes.js';
// import orderRoutes from './routes/orderRoutes.js';
// import cartRoutes from './routes/cartRoutes.js';
// import adminRoutes from './routes/adminRoutes.js';
// import reviewRoutes from './routes/reviewRoutes.js';






// 🔹 Load Environment Variables
dotenv.config();

// 🔹 Connect to MongoDB
connectDB();

const app = express();

// 🔹 Middleware
app.use(express.json());
// const corsOptions = {
//   origin: "http://localhost:5173",
//   credentials: true,
// };

app.use(cors({
  origin:"http://localhost:5173" ,
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],

}));

// 🔹 Default Route

// app.use("/api/users", userRoutes);
// app.use("/api/shops", shopRoutes);
// app.use("/api/products", productRoutes);
// app.use('/api/order', orderRoutes);
// app.use('/api/cart', cartRoutes);
// app.use('/api/admin', adminRoutes);
// app.use('/api/reviews', reviewRoutes);

app.get('/fetch', async(req, res) => {
  const data = await User.find();
  res.json(data);
});
app.post('/push', async (req, res) => {
  console.log(req);
  const d = req.body;
  console.log(d);
  const data = await User.create(d);
  res.json(data);
})
app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
console.log(id);
  const data = await User.findByIdAndDelete(id);
  res.json(data);
})
app.put("/update/:id", async (req, res) => {
  const id = req.params.id;
  const data = await req.body;
  console.log(data);
  console.log(id);
  const result = await User.findByIdAndUpdate(id,data,{new:true});
  res.json(result);
 })
// 🔹 Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
