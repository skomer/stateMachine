class Controller {

    constructor(machine) {
        this.machine = machine;
        this.state = this.machine.initialState;
    }

    updateState(newState) {
        this.state = newState;
        console.log('NEW STATE:', this.state.value);
    }

    sendEvent(eventName, extendedState = {}) {
        let newState = this.machine.transition(
            this.state.value,
            eventName,
            extendedState
        );

        this.updateState(newState);  

        for (let i = 0; i < newState.actions.length; i++) {
            this.takeAction(newState.actions[i]);
        }
    }

    takeAction(options) {
        let servicesComplete = {
            magpie: false,
            searchlens: false,
            googleAnalytics: false,
            morrigu: false
        };

        const actionMap = {
            startDoingSomething: () => console.log(options.service, 'started doing something...'),
            stopDoingSomething: () => console.log(options.service, '... stopped doing something.'),

            reportComplete: () => {
                console.log(options.service, 'reporting doneComplete');
                servicesComplete[options.service] = true;
                this.sendEvent('DEPENDENCY_RESOLVED', servicesComplete);
            },

            reportError: () => {
                console.log(options.service, 'reporting doneError');
                this.sendEvent('ERROR');
            }
        }

        actionMap[options.action]();
    }

}

module.exports = Controller;