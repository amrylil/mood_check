import app from "./app";
import "dotenv/config";

const PORT = process.env.PORT || 3000;

console.log(`🚀 Server starting on port ${PORT}...`);
console.log(
  `📚 Swagger docs will be available at http://localhost:${PORT}/api/v1/docs/ui`
);

export default {
  port: PORT,
  fetch: app.fetch,
};
