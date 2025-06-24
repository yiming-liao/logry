import type { FlushStrategy } from "logry";
import { logry } from "logry";

// flushStrategy controls when to flush handlers (e.g. write to file, send to server)
const autoFlush = (ms: number): FlushStrategy => {
  return (flush) => {
    const intervalId = setInterval(() => {
      console.log("🚽 Auto flush triggered");
      flush().catch((err) => console.error("❌ Auto flush failed:", err));
    }, ms);
    return () => clearInterval(intervalId);
  };
};

// Create a logger
const logger = logry({
  id: "my-logger",
  handlerManagerConfig: {
    onError: (error) => console.log(error),
    flushStrategy: autoFlush(2000),
  },
});

// 🚀 Fire logs
logger.fatal("Critical server failure!", new Error("Database connection lost"));
logger.error("Payment failed", { userId: "u_12345", orderId: "o_22345" });
logger.warn("Slow response from /api/orders", { endpoint: "/api/orders" });
logger.info("Maintenance started", { deliveryTime: "08:30 AM" });
logger.debug("Token validated", { tokenId: "jwt_xyz" });
logger.trace("Running validateOrderPayload()", { route: "/checkout" });

// Optional: manually trigger flush (e.g. before app shutdown)
// await logger.flush();
