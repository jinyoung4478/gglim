import 'dotenv/config';
import httpServer from './backend/app';

const PORT = process.env.PORT || 3000;

httpServer.listen(PORT, () => {
   console.log(`Listening on http://localhost:${PORT}`);
});
