'use strict';

/**
 * Initializes Monkey by adding a turnToPage method, which differs depending
 * whether you're on a mobile device or desktop. This function is defined in
 * /src/js/monkeys/mobile.js and /src/js/monkeys/desktop.js respectively.
 *
 * @param  {object} $events The global Monkey events object, used to pass custom
 * events to it.
 * @param  {object} options The options that Monkey was initialized with.
 * @return {data} The data object passed through the Promise chain.
 */
module.exports = function ($events, options) {
  return function (data) {
    // Adds the turnToPage method, using data.monkeyType to determine whether
    // it should be desktop or mobile initialisation.
    data.turnToPage = this.monkeys[data.monkeyType].init(data, $events, options);

    return data;
  }.bind(this);
};
