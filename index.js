const Controller = require('./controller');
const machine = require('./machine');

let controller = new Controller(machine);

setTimeout(() => controller.sendEvent('INIT'), 1000);
setTimeout(() => controller.sendEvent('INIT_MAGPIE'), 3000);
setTimeout(() => controller.sendEvent('INIT_MORRIGU'), 4000);
setTimeout(() => controller.sendEvent('INIT_GA'), 5000);
setTimeout(() => controller.sendEvent('INIT_SEARCHLENS'), 6000);
setTimeout(() => controller.sendEvent('FINISHED_DOING_SOMETHING'), 7000);