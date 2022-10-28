import { controllerTemplate } from './template.controller.js'
import { serviceTemplate } from './template.service.js'
import { domainTemplate } from './template.domain.js'
import { createDTOTemplate } from './template.create.js'
import { entityTemplate } from './template.entity.js'
import { repositoryInterfaceTemplate } from './template.iRepository.js'
import { moduleTemplate } from './template.module.js'
import { repositoryTemplate } from './template.repository.js'
import { updateTemplate } from './template.update.js'

const TEMPLATE = {
  controller: controllerTemplate,
  service: serviceTemplate,
  module: moduleTemplate,
  repository: repositoryTemplate,
  entity: entityTemplate,
  domain: domainTemplate,
  create: createDTOTemplate,
  iRepository: repositoryInterfaceTemplate,
  update: updateTemplate,
}
export default TEMPLATE
