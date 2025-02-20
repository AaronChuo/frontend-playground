#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const playgrounds = {
  js: 'console.log("Hello JavaScript Playground! 🚀");',
  ts: `const greet = (name: string): string => {
  return \`Hello, \${name}!\`;
};
console.log(greet("Hello TypeScript Playground! 🚀"));
`,
  react: `import React from "react";
import ReactDOM from "react-dom/client";

const App = () => <h1>Hello React Playground! 🚀</h1>;

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(<App />);
`,
'react-ts': `import React from "react";
import ReactDOM from "react-dom/client";

const App: React.FC = () => <h1>Hello React TypeScript Playground! 🚀</h1>;

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(<App />);
`,
  jest: `describe('Jest Playground 🚀', () => {
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
  console.error('Usage: pnpm playground <js|ts|react|react-ts|jest>');
  process.exit(1);
}

const projectRoot = path.join(__dirname, '..');
const playgroundDir = path.join(projectRoot, 'playground');
if (!fs.existsSync(playgroundDir)) {
  fs.mkdirSync(playgroundDir, { recursive: true });
}

const fileName = {
  js: 'playground.js',
  ts: 'playground.ts',
  react: 'playground.jsx',
  'react-ts': 'playground.tsx',
  jest: 'playground.test.js',
}[type];

const filePath = path.join(playgroundDir, fileName);
fs.writeFileSync(filePath, playgrounds[type]);
console.log(`✅ Created ${fileName} successfully!`);
