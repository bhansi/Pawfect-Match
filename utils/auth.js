const withClientAuth = (req, res, next) => {
  if (!req.session.is_employee && req.session.logged_in) {
    next();
  } else {
    res.redirect('/login');
  }
};

const withEmployeeAuth = (req, res, next) => {
  if(req.session.logged_in && req.session.is_employee) {
    next();
  }
  else {
    res.redirect('/login');
  }
};

module.exports = withClientAuth, withEmployeeAuth;
