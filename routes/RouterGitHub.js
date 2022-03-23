const passport = require('passport');
const RouterGitHub = express.Router();

RouterGitHub.get('/auth/github',
  passport.authenticate('github', { scope: [ 'user:email' ] }));

RouterGitHub.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(request, response) {
    // Successful authentication, redirect home.
    // res.redirect('/');
    response.json(req.user)
  });

  module.exports = { RouterGitHub };