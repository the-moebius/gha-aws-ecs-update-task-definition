
import * as core from '@actions/core';

import {
  updateTaskDefinition,
  UpdateTaskDefinitionOptions,

} from '@moebius/aws-ecs-update-task-definition';


(async () => {

  try {
    await main();

  } catch (error: any) {
    core.setFailed(error);
  }

})();

async function main() {

  core.info(`Starting the task`);


  //======//
  // NAME //
  //======//

  const name = core.getInput('name', {
    required: true,
  });


  //==============//
  // BASE OPTIONS //
  //==============//

  const options: UpdateTaskDefinitionOptions = {
    name,
  };


  //========//
  // REGION //
  //========//

  const region = core.getInput('region');
  if (region) {
    options.region = region;
  }


  //===========//
  // IMAGE TAG //
  //===========//

  const imageTag = core.getInput('imageTag');
  if (imageTag) {
    options.containerOverrides = {
      0: {
        imageTag,
      },
    };
  }


  //===========//
  // EXECUTING //
  //===========//

  await updateTaskDefinition(options);

}
