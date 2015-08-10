module.exports = {
  name: 'deploy:list',
  description: 'Lists the currently uploaded deploy-revisions',
  works: 'insideProject',

  anonymousOptions: [
    '<deployTarget>'
  ],

  availableOptions: [
    { name: 'deploy-config-file', type: String, default: 'config/deploy.js' },
    { name: 'amount', type: Number, default: 10 }
  ],

  run: function(commandOptions, rawArgs) {
    commandOptions.deployTarget = rawArgs.shift();
    process.env.DEPLOY_TARGET = commandOptions.deployTarget;

    var PipelineTask = require('../tasks/pipeline');
    var pipeline = new PipelineTask({
      project: this.project,
      ui: this.ui,
      deployTarget: commandOptions.deployTarget,
      deployConfigPath: commandOptions.deployConfigFile,
      commandOptions: commandOptions,
      hooks: [
        'configure',
        'fetchRevisions',
        'displayRevisions'
      ]
    });

    return pipeline.run();
  }
};