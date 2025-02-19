#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const playgrounds = {
  js: 'console.log("Hello JavaScript Playground!");',
  react: `import React from "react";
          import ReactDOM from "react-dom";

          const App = () => <h1>Hello React Playground!</h1>;

          ReactDOM.render(<App />, document.getElementById("root"));
        `,
};

const type = process.argv[2];
if (!type || !playgrounds[type]) {
  console.error('Usage: pnpm playground <js|react>');
  process.exit(1);
}

const fileName = type === 'js' ? 'playground.js' : 'playground.jsx';
const filePath = path.join(__dirname, '..', fileName);

fs.writeFileSync(filePath, playgrounds[type]);
console.log(`Created ${fileName} successfully!`);
