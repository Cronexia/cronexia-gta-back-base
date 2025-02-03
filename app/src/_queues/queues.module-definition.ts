import { ConfigurableModuleBuilder } from '@nestjs/common';
import { QueuesModuleOptions } from './queues.interface';

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN, OPTIONS_TYPE } =
  new ConfigurableModuleBuilder<QueuesModuleOptions>().build();
