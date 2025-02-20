#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const playgrounds = {
  js: 'console.log("Hello JavaScript Playground!");',
  react: `import React from "react";
import ReactDOM from "react-dom/client";

const App = () => <h1>Hello React Playground!</h1>;

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(<App />);
`,
  jest: `describe('Jest Playground', () => {
  it('should pass a basic test', () => {
    expect(1 + 1).toBe(2);
  });

  it('should test a function', () => {
    const add = (a, b) => a + b;
    expect(add(2, 3)).toBe(5);
  });
});`
};

const type = process.argv[2];
if (!type || !playgrounds[type]) {
  console.error('Usage: pnpm playground <js|react|jest>');
  process.exit(1);
}

const projectRoot = path.join(__dirname, '..');
const playgroundDir = path.join(projectRoot, 'playground');
if (!fs.existsSync(playgroundDir)) {
  fs.mkdirSync(playgroundDir, { recursive: true });
}

let fileName;
if (type === 'js') fileName = 'playground.js';
if (type === 'react') fileName = 'playground.jsx';
if (type === 'jest') fileName = 'playground.test.js';

const filePath = path.join(playgroundDir, fileName);

fs.writeFileSync(filePath, playgrounds[type]);
console.log(`Created ${fileName} successfully!`);
