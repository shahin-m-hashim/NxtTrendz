export default function logger(req, res, next) {
  console.log(
    `\n=== Request Received ===\n` +
      `Source IP: ${
        req.ip.includes("::ffff:") ? req.ip.split("::ffff:")[1] : req.ip
      }\n` +
      `Origin: ${req.headers["origin"] || "Not provided"}\n` +
      `URL: ${req.url}\n` +
      `Method: ${req.method}\n` +
      `Authorization: ${
        req.headers["authorization"] ? "Present" : "Not present"
      }\n` +
      (req.method !== "GET"
        ? `Content-Type: ${req.headers["content-type"]}\n`
        : "") +
      `User Agent: ${req.headers["user-agent"]}\n` +
      "========================\n"
  );

  next();
}
