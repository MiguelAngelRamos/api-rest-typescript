import { Request, Response } from "express";
import { route, GET, POST } from "awilix-express";

import { MovementService } from '../services/movement.service';
import { IMovementCreateDto } from "../dtos/movement.dto";
import { ErrorBaseController } from "../common/error-controllers/error-base.controller";

@route('/movements')
export class MovementController extends ErrorBaseController{
  //* Inyectamos el servicio subscription

  constructor( private readonly movementService: MovementService) {
    super();
  }

  @GET()
  public async all(req: Request, res: Response) {
    try {
      res.send( await this.movementService.all());
    } catch (error) {
      //* metodo heredado de BaseController
      this.handleException(error, res);
    }
  }

  @route('/:id')
  @GET()
  public async find(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const result = await this.movementService.find(id);
      if(!result) {
        res.status(404);
        res.send();
        return;
      } 
      res.send(result);
      // res.send(await this.subscriptionService.find(id));

    } catch (error) {
      this.handleException(error, res);
    }
  }

  //* Creación de una Subscription
  @POST()
  public async store(req: Request, res: Response) {
    //* al que mapear el request actual al dto para la creación
    try {
      await this.movementService.store(
        {
          type: req.body.type,
          amount: req.body.amount,
          user_id: req.body.user_id,
        } as IMovementCreateDto);
        res.send();
    } catch (error) {
      this.handleException(error, res);
    }
  }


}