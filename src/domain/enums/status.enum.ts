import { registerEnumType } from '@nestjs/graphql';

export enum Status {
  Accept = 'Accept',
  Pending = 'Pending',
  Refused = 'Refused',
}


registerEnumType(Status, {
  name: 'Status', 
  description: 'Status das tarefas ou projetos',
});
