const autoParse = require('auto-parse');

const parseTypesMiddleware = (req: any, res: any, next: any) => {
  req.body = autoParse(req.body);

  next();
};

export default parseTypesMiddleware;
