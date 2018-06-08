const xstate = require('xstate');
let Machine = xstate.Machine;

const machine = Machine({
    key: 'parallelHierarchicalMachine',
    initial: 'pending',

    states: {
        pending: {
            on: {
                INIT: 'dependenciesResolving'
            }
        },
        dependenciesResolving: {
            parallel: true,

            on: {
                DEPENDENCY_RESOLVED: {
                    inProgress: {
                        cond: (extendedState) => {
                            return extendedState.magpie
                            && extendedState.morrigu
                        }
                    }
                }
            },

            states: {

                magpie: {
                    initial: 'pending',
        
                    states: {
                        pending: {
                            on: {
                                INIT_MAGPIE: 'inProgress'
                            }
                        },
                        inProgress: {
                            onEntry: {
                                service: 'magpie',
                                action: 'startDoingSomething'
                            },
                            onExit: {
                                service: 'magpie',
                                action: 'stopDoingSomething'
                            },
                            on: {
                                FINISHED_DOING_SOMETHING: 'doneComplete',
                                ERROR: 'doneError'
                            }
                        },
                        doneComplete: {
                            onEntry: {
                                service: 'magpie',
                                action: 'reportComplete'
                            }
                        },
                        doneError: {
                            onEntry: {
                                service: 'magpie',
                                action: 'reportError'
                            }
                        }
                    }
                },
        
                morrigu: {
                    initial: 'pending',
                    
                    states: {
                        pending: {
                            on: {
                                INIT_MORRIGU: 'dependenciesResolving'
                            }
                        },
                        dependenciesResolving: {
                            parallel: true,

                            on: {
                                DEPENDENCY_RESOLVED: {
                                    inProgress: {
                                        cond: (extendedState) => {
                                            return extendedState.searchlens
                                            && extendedState.googleAnalytics
                                        }
                                    }
                                }   
                            },

                            states: {

                                searchlens: {
                                    initial: 'pending',
                
                                    states: {
                                        pending: {
                                            on: {
                                                INIT_SEARCHLENS: 'inProgress'
                                            }
                                        },
                                        inProgress: {
                                            onEntry: {
                                                service: 'searchlens',
                                                action: 'startDoingSomething'
                                            },
                                            onExit: {
                                                service: 'searchlens',
                                                action: 'stopDoingSomething'
                                            },
                                            on: {
                                                FINISHED_DOING_SOMETHING: 'doneComplete',
                                                ERROR: 'doneError'
                                            }
                                        },
                                        doneComplete: {
                                            onEntry: {
                                                service: 'searchlens',
                                                action: 'reportComplete'
                                            }
                                        },
                                        doneError: {
                                            onEntry: {
                                                service: 'searchlens',
                                                action: 'reportError'
                                            }
                                        }
                                    }
                                },
                
                                googleAnalytics: {
                                    initial: 'pending',
                
                                    states: {
                                        pending: {
                                            on: {
                                                INIT_GA: 'inProgress'
                                            }
                                        },
                                        inProgress: {
                                            onEntry: {
                                                service: 'googleAnalytics',
                                                action: 'startDoingSomething'
                                            },
                                            onExit: {
                                                service: 'googleAnalytics',
                                                action: 'stopDoingSomething'
                                            },
                                            on: {
                                                FINISHED_DOING_SOMETHING: 'doneComplete',
                                                ERROR: 'doneError'
                                            }
                                        },
                                        doneComplete: {
                                            onEntry: {
                                                service: 'googleAnalytics',
                                                action: 'reportComplete'
                                            }
                                        },
                                        doneError: {
                                            onEntry: {
                                                service: 'googleAnalytics',
                                                action: 'reportError'
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        inProgress: {
                            onEntry: {
                                service: 'morrigu',
                                action: 'startDoingSomething'
                            },
                            onExit: {
                                service: 'morrigu',
                                action: 'stopDoingSomething'
                            },
                            on: {
                                FINISHED_DOING_SOMETHING: 'doneComplete',
                                ERROR: 'doneError'
                            }
                        },
                        doneComplete: {
                            onEntry: {
                                service: 'morrigu',
                                action: 'reportComplete'
                            }
                        },
                        doneError: {
                            onEntry: {
                                service: 'morrigu',
                                action: 'reportError'
                            }
                        }
        
                    }
                }
            }
        },
        inProgress: {
            onEntry: {
                service: 'parallelHierarchicalMachine',
                action: 'startDoingSomething'
            },
            onExit: {
                service: 'parallelHierarchicalMachine',
                action: 'stopDoingSomething'
            },
            on: {
                FINISHED_DOING_SOMETHING: 'doneComplete',
                ERROR: 'doneError'
            }
        },
        doneComplete: {
            onEntry: {
                service: 'parallelHierarchicalMachine',
                action: 'reportComplete'
            }
        },
        doneError: {
            onEntry: {
                service: 'parallelHierarchicalMachine',
                action: 'reportDoneError'
            }
        }
    }

});

module.exports = machine;