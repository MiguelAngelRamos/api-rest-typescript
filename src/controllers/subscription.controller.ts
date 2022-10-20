import { Request, Response } from "express";
import { SubscriptionService } from '../services/subscription.service';
import { route, GET, POST, PUT, DELETE } from "awilix-express";
import { ErrorBaseController } from "../common/error-controllers/error-base.controller";
import { ISubscriptionCreateDto, ISuscriptionUpdateDto } from '../dtos/subscription.dto';

@route('/subscriptions')
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

  @route('/:id')
  @GET()
  public async find(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const result = await this.subscriptionService.find(id);
     
      if(!result) {
        res.status(404);
        res.send();
        return;
      }
      //* Existe el recurso lo retornamos
      res.send(result);
    } catch (error) {
      this.handleException(error, res);
    }
  }

  @POST()
  public async store(req: Request, res: Response) {
    try {
      await this.subscriptionService.store({
        user_id: req.body.user_id,
        code: req.body.code,
        amount: req.body.amount,
        cron: req.body.cron
      } as ISubscriptionCreateDto);
      res.status(201);
      res.send({ data: "subscription creada con exito!"});
    } catch (error) {
      this.handleException(error, res);
    }
  }

  @route('/:id')
  @PUT()
  public async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      await this.subscriptionService.update(id, {
        code: req.body.code,
        amount: req.body.amount,
        cron: req.body.cron
      } as ISuscriptionUpdateDto);
      res.send();
    } catch (error) {
      this.handleException(error, res);
    }
  }

  @route('/:id')
  @DELETE()
  public async remove(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      await this.subscriptionService.remove(id);
      res.send();
    } catch (error) {
      this.handleException(error, res);
    }
  }
}