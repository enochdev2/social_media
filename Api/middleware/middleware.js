const errorMiddleWare = (err, req, res, next) => {
  const defaultError = {
    statusCode: 404,
    success: "failed",
    message: err,
  };
  
  if(err?.name === "ValidationError") {
    defaultError.statusCode = 404;
    
  defaultError.message = Object.values(err, errors)
  .map((el) => el.message)
  .join(",");
};

  if (err.code && err.code === 11000) {
    defaultError.statusCode = 404;
    defaultError.message = `${Object.values(err.kayvalue)} field has to unique`;
  }

  res.status(defaultError.statusCode).json({
    success: defaultError.success,
    message: defaultError.message,
  });
};
 
export default errorMiddleWare