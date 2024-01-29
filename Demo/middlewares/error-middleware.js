const errorMiddleware = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Backend Error";
  // const extraDetails = err.extraDetails || "Error from Backend";
  console.log(
    `The status of our error is --> ${status}, and the message is --> ${message}`
  );

  return res.status(status).json({ message });
};

module.exports = errorMiddleware;
