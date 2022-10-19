import { Request, Response } from "express";
import { SubscriptionService } from '../services/subscription.service';
import { route, GET } from "awilix-express";
import { ErrorBaseController } from "../common/error-controllers/error-base.controller";

@route('/subscription')
export class SubscriptionController extends ErrorBaseController {

  constructor(private readonly subscriptionService: SubscriptionService) {
    super();
  }

  @GET()
  public async all(req: Request, res: Response) {
    try {
      res.send(await this.subscriptionService.all());
    } catch (error) {
      this.handleException(error, res);
    }
  }

}