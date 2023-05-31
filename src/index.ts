// import createVirtualEnvironment from '@locker/near-membrane-dom';
const createVirtualEnvironment = require('@locker/near-membrane-dom');

async function main() {
  function deny() {
    throw new Error('Access denied');
  }
  const consoleMock = {
    log: (...args: unknown[]) => {
      console.log('[Near Membrane]', ...args);
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
    distortionCallback(v) {
      //   console.log(v, typeof v, distortionMap.has(v));
      // @ts-ignore
      return distortionMap.get(v) ?? v;
    },
    globalObjectShape: window,
  });

  const code = await getCode();
  env.evaluate(code);
}

async function getCode() {
  const response = await fetch('./plugin.js');
  return await response.text();
}
main();

window.onload = () => {
  const button = document.querySelector('#original-button');
  const testDiv = document.querySelector('#test-div2');
  button.addEventListener('click', () => {
    testDiv['style'].display = 'block';
    testDiv['style'].backgroundColor = 'red';
    testDiv['style'].width = '100px';
    testDiv['style'].height = '100px';
  });
};
