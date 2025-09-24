function checkRole(allowedRoles = []) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: 'No autorizado' });
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Acceso denegado' });
    }
    next();
  };
}

module.exports = { checkRole };
