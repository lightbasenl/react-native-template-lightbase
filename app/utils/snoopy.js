// core Snoopy
import Snoopy from 'rn-snoopy';

// some Snoopy goodies we're going to use
import bars from 'rn-snoopy/stream/bars';
import filter from 'rn-snoopy/stream/filter';
import buffer from 'rn-snoopy/stream/buffer';

import EventEmitter from 'react-native/Libraries/vendor/emitter/EventEmitter';

const emitter = new EventEmitter();
const events = Snoopy.stream(emitter);

export const logUpdateViews = () => filter((info) => info.method == 'updateView', true)(events).subscribe();
export const logCteateViews = () => filter((info) => info.method == 'createView', true)(events).subscribe();
export const ReanimatedModule = () =>
  filter((info) => info.module === 'ReanimatedModule', true)(events).subscribe();

export const logHeavyCreateViews = () =>
  bars((info) => JSON.stringify(info.args).length)(filter({ method: 'createView' })(events)).subscribe();

export const logWarnHeavyViews = () =>
  filter(
    (info) => JSON.stringify(info.args).length,
    200 /*command string length threshold*/,
    true /*show yellow box*/
  )(events).subscribe();
