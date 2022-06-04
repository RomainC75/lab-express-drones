module.exports = (app) => {
  app.use((req, res, next) => {
    // this middleware runs whenever a requested endpoint is not available
    res.status(404).json({ message: "Resource not found" });
  });

  app.use((err, req, res, next) => {
    // whenever you call next(err), this middleware will handle the error
    // always logs the error
    console.error("ERROR", req.method, req.path, err);

    switch (err) {
      case 1:
        res.status(400).json({
          message: 'key "name" problem',
        });
        break;
      case 2:
        res.status(400).json({
          message: "other key problem",
        });
        break;
      case 3:
        res.status(400).json({
          message: "wrong ID",
        });
        break;
    }

    // only render if the error occurred before sending the response
    if (!res.headersSent) {
      res
        .status(500)
        .json({ mymessage: err, message: "Internal server error" });
    }
  });
};
