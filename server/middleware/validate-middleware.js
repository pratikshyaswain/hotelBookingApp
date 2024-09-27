const validate = (schema) => async (req, res, next) => {
  try {
    const parsedBody = await schema.parseAsync(req.body);
    req.body = parsedBody;
    next();
  } catch (err) {
    const status = 422;
    // Collect the first error message (assuming you want to capture just the first one)
    const message = "Fill the form properly";
    const extraDetails = err.errors[0].message;
    // console.log(message);

    // Create an error object
    const error = {
      // Include the status here directly
      status,
      message,
      extraDetails,
    };
    // res.status(400).json({ msg: error });

    // Log the errors to the console
    console.log(error);

    // Pass the error object to the next error-handling middleware
    next(error);
  }
};

module.exports = validate;
