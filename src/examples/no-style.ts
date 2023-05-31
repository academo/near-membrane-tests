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

    const env = createVirtualEnvironment(window, {
      distortionCallback(v: any) {
        // @ts-ignore
        return distortionMap.get(v) ?? v;
      },
      globalObjectShape: window,
      endowments: Object.getOwnPropertyDescriptors(window),
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
