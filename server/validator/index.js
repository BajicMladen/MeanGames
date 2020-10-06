/* BACKEND VALIDARION FOR SIGN-LOG IN */

exports.userSignupValidator = (req, res, next) => {
  req.check("name", "Name is reqired").notEmpty(); // name check
  req
    .check("email", "Email must be in right form") // email check
    .matches(/.+\@.+\..+/)
    .withMessage("Email must contain @")
    .isLength({
      min: 4,
      max: 32,
    });
  req.check("password", "Password is required").notEmpty(); // password check
  req
    .check("password") // password check
    .isLength({ min: 6 })
    .withMessage("Password must contain at least 6 signes")
    .matches(/\d/)
    .withMessage("Password must contain a number");

  const errors = req.validationErrors();
  if (errors) {
    const firstError = errors.map((error) => error.msg)[0];
    return res.status(400).json({ error: firstError });
  }
  next();
};
