alert('Alert from the plugin');
const button = document.querySelector('#sandbox-button');
const testDiv = document.querySelector('#test-div');
button.addEventListener('click', () => {
  console.log(testDiv);
  console.log(testDiv.style);
  testDiv['style'].display = 'block';
  testDiv['style'].backgroundColor = 'blue';
  testDiv['style'].width = '100px';
  testDiv['style'].height = '100px';
});
