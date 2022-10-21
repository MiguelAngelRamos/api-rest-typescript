import express from 'express';
import { createContainer, asClass } from 'awilix';
import { scopePerRequest } from 'awilix-express';
// import { SubscriptionMySQLRepository } from './services/repositories/impl/mysql/subscription.repository';
import { SubscriptionService } from './services/subscription.service';
import { SubscriptionMSSQLRepository } from './services/repositories/impl/mssql/subscription.respository';

export default (app: express.Application) => {

  const container = createContainer( { injectionMode: 'CLASSIC' } );

  container.register(
    {
      //* Repositories
      // subscriptionRepository: asClass(SubscriptionMySQLRepository).scoped(), 
      subscriptionRepository: asClass(SubscriptionMSSQLRepository).scoped(), 
      //* Servicios
      subscriptionService: asClass(SubscriptionService).scoped()
    }
  );
  app.use(scopePerRequest(container));

};

