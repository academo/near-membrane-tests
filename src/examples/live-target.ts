(async () => {
  const createVirtualEnvironment = require('@locker/near-membrane-dom');
  const LOCKER_LIVE_VALUE_MARKER_SYMBOL = Symbol.for('@@lockerLiveValue');

  class X {
    constructor() {
      this[LOCKER_LIVE_VALUE_MARKER_SYMBOL] = undefined;
      //@ts-ignore
      this.foo = 0;
    }

    getFooFromOutside() {
      //@ts-ignore
      return this.foo;
    }

    hasFooFromOutside() {
      return 'foo' in this;
    }

    incrementFooFromOutside() {
      //@ts-ignore
      this.foo++;
    }
  }
  const env = createVirtualEnvironment(window, {
    endowments: Object.getOwnPropertyDescriptors({
      X,
      createYFromOutside(Y: any) {
        // eslint-disable-next-line no-new
        new Y();
      },
      alert: () => {
        console.log('[Near Membrane]', 'alert');
      },
    }),
    // liveTargetCallback(target: any) {
    //   console.log('the target', target);
    //   return Object.hasOwn(target, LOCKER_LIVE_VALUE_MARKER_SYMBOL);
    // },
  });

  const code = await getCode();
  env.evaluate(code);

  async function getCode() {
    const response = await fetch('./live-target-plugin.js');
    return response.text();
  }
})();
