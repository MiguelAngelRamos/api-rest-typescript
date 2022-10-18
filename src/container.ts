import express from 'express';
import { createContainer, asClass } from 'awilix';
import { scopePerRequest } from 'awilix-express';
import { SubscriptionMySQLRepository } from './services/repositories/impl/mysql/subscription.repository';

export default (app: express.Application) => {

  const container = createContainer( { injectionMode: 'CLASSIC' } );

  container.register(
    {
      //* Repositories
      subscriptionRepository: asClass(SubscriptionMySQLRepository).scoped(), 
      //* Servicios
    }
  );
  app.use(scopePerRequest(container));

};

