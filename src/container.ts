import express from 'express';
import { createContainer, asClass } from 'awilix';
import { scopePerRequest } from 'awilix-express';
// import { SubscriptionMySQLRepository } from './services/repositories/impl/mysql/subscription.repository';
import { BalanceMSSQLRepository } from './services/repositories/impl/mssql/balance.repository';
import { MovementMSSQLRepository } from './services/repositories/impl/mssql/movement.repository';
import { MovementService } from './services/movement.service';
// import { BalanceMysqlRepository } from './services/repositories/impl/mysql/balance.repository';
// import { MovementMySQLRepository } from './services/repositories/impl/mysql/movement.repository';
import { SubscriptionService } from './services/subscription.service';
// import { SubscriptionMSSQLRepository } from './services/repositories/impl/mssql/subscription.respository';
import { SubscriptionMySQLRepository } from './services/repositories/impl/mysql/subscription.repository';

export default (app: express.Application) => {

  const container = createContainer( { injectionMode: 'CLASSIC' } );

  container.register(
    {
      //* Repositories
      subscriptionRepository: asClass(SubscriptionMySQLRepository).scoped(), 
      // subscriptionRepository: asClass(SubscriptionMSSQLRepository).scoped(), 
      // movementRepository: asClass(MovementMySQLRepository).scoped(),
      // balanceRepository: asClass(BalanceMysqlRepository).scoped,
      movementRepository: asClass(MovementMSSQLRepository).scoped(),
      balanceRepository: asClass(BalanceMSSQLRepository).scoped(),
      //* Servicios
      subscriptionService: asClass(SubscriptionService).scoped(),
      movementService: asClass(MovementService).scoped()
    }
  );
  app.use(scopePerRequest(container));

};

