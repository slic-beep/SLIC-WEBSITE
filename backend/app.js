var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var membersRouter = require('./routes/members');
var projectsRouter = require('./routes/projects');
var eventsRouter = require('./routes/events');
var programsRouter = require('./routes/programs');
var partnersRouter = require('./routes/partners');
var leadershipRouter = require('./routes/leadership');
var applicationsRouter = require('./routes/applications');
var authRouter = require('./routes/auth');
var announcementsRouter = require('./routes/announcements');
var heroImagesRouter = require('./routes/heroImages');
var impactMetricsRouter = require('./routes/impactMetrics');
var uploadRouter = require('./routes/upload');
var dashboardController = require('./controllers/dashboardController');

var app = express();

app.use(logger('dev'));
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-fileupload')());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/members', membersRouter);
app.use('/api/projects', projectsRouter);
app.use('/api/events', eventsRouter);
app.use('/api/programs', programsRouter);
app.use('/api/partners', partnersRouter);
app.use('/api/leadership', leadershipRouter);
app.use('/api/applications', applicationsRouter);
app.use('/api/auth', authRouter);
app.use('/api/announcements', announcementsRouter);
app.use('/api/hero-images', heroImagesRouter);
app.use('/api/impact-metrics', impactMetricsRouter);
app.use('/api/upload', uploadRouter);
app.get('/api/dashboard/overview', dashboardController.getOverview);
app.get('/api/dashboard/recent', dashboardController.getRecent);
app.get('/api/dashboard/pending', dashboardController.getPending);
app.get('/api/health', function(req, res) {
  res.json({ success: true, message: 'SLIC backend is running' });
});

function normalizePort(val) {
  const port = parseInt(val, 10);
  if (Number.isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
}

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  console.log('Listening on ' + bind);
}

const port = normalizePort(process.env.PORT || '4000');
app.set('port', port);

const server = require('http').createServer(app);
server.on('error', onError);
server.on('listening', onListening);

if (require.main === module) {
  server.listen(port);
}

module.exports = app;
