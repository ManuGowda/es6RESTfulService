import * as restify from 'restify';
import { AnalyticsTrackController } from '../controllers/api/v1/AnalyticsTrackController';

function route(api: restify.Server): void {
  let trackCtrl = new AnalyticsTrackController();

  api.post('/track', (req: restify.Request, res: restify.Response) => {
    trackCtrl.track(req, res);
  });

  api.get('/api', (req: restify.Request, res: restify.Response) => {
    res.json(200, { routes: api.router.mounts });
  });
}

module.exports.routes = route;
