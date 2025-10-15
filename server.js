import app from './app.js';
import connectDB from './src/config/db.js';
const PORT = process.env.PORT||5000;
(async function() {
    await connectDB();
    app.listen(PORT,()=>{
        console.log(`App is running on port no http://localhost:${PORT}`);
    })
})();