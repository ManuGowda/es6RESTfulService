import { AnalyticsEvent } from '../../../models/AnalyticsEvent';
import { logger } from '../../../services/logger';
import * as restify from 'restify';

export class AnalyticsTrackController {

  private _analyticsEvent: AnalyticsEvent;

  constructor() {
    logger.info("Init: AnalyticsTrackController");
    this._analyticsEvent = new AnalyticsEvent();
  }

  public track(req: restify.Request, res: restify.Response): void {
    this._analyticsEvent.store(req.body)
      .then((data) => {
        logger.info("Successfully published event");
        res.json("success").status(200);
      })
      .catch((err) => {
        logger.info("Failed to published event", err);
        res.json("success").status(200);
      });
  }
}
