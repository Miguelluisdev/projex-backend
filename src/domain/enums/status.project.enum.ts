import { registerEnumType } from '@nestjs/graphql';

export enum StatusProject {
  Ativo = 'Ativo',
  Pendente = 'Pendente',
  Completo = 'Completo',
}

registerEnumType(StatusProject, {
  name: 'StatusProject',
  description: 'Status das tarefas ou projetos',
});
