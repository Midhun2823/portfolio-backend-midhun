export const catchAsyncErrors = (theFunction) => {
  return (req, res, next) => {
    // Promise.reslove(theFunction(req, res, next)).catch(next); // Mistake written so error
    Promise.resolve(theFunction(req, res, next)).catch(next);
  };
};
// Using this the PORT would not be crashed it will double check the errors
