const withAuth = (req, res, next) => {
  if (!req.session.logged_in) {
    res.redirect('/login');
  } else {
    next();
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

module.exports = withAuth, withEmployeeAuth;
