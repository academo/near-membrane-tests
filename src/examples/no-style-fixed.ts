(async () => {
  const createVirtualEnvironment = require('@locker/near-membrane-dom');

  async function main() {
    const consoleMock = {
      log: (...args: unknown[]) => {
        console.log('[Plugin]', ...args);
      },
    };

    function alertMock(text: string) {
      console.log('[Near Membrane]', text);
    }

    const distortionMap = new Map<any, any>([
      [alert, alertMock],
      [console, consoleMock],
    ]);

    const LOCKER_LIVE_VALUE_MARKER_SYMBOL = Symbol.for('@@lockerLiveValue');

    const env = createVirtualEnvironment(window, {
      distortionCallback(v: any) {
        // console.log('distortionCallback', v);
        if (v instanceof HTMLElement) {
          try {
            Reflect.defineProperty(
              v.style,
              LOCKER_LIVE_VALUE_MARKER_SYMBOL,
              {},
            );
          } catch (e) {}
        }
        //   console.log(v, typeof v, distortionMap.has(v));
        // @ts-ignore
        return distortionMap.get(v) ?? v;
      },
      globalObjectShape: window,
      endowments: Object.getOwnPropertyDescriptors(window),
      liveTargetCallback(target) {
        // console.log('live target stuff', target);
        return Object.hasOwn(target, LOCKER_LIVE_VALUE_MARKER_SYMBOL);
      },
    });

    const code = await getCode();
    env.evaluate(code);
  }

  async function getCode() {
    const response = await fetch('./no-style-plugin.js');
    return await response.text();
  }
  main();

  window.onload = () => {
    const button = document.querySelector('#original-button');
    const testDiv = document.querySelector('#test-div');
    button.addEventListener('click', () => {
      testDiv['style'].display = 'block';
      testDiv['style'].backgroundColor = 'red';
      testDiv['style'].width = '100px';
      testDiv['style'].height = '100px';
    });
  };
})();
