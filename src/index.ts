const path = require('path');

function escapeFileName(str: string) {
  const ext = path.extname(str);
  return `svg-${path.basename(str, ext)}`
    .split(/\W+/)
    .map((x) => `${x.charAt(0).toUpperCase()}${x.slice(1)}`)
    .join('');
}

const transform = (src: string, filePath: string) => {
  const ext = path.extname(filePath);
  if (ext !== '.svg' && ext !== '.inline-svg') {
    return src;
  }

  const name = escapeFileName(filePath);
  return {
    code: `
const React = require('react');
function ${name}(props) {
  return React.createElement(
    'svg', 
    Object.assign({}, props, {'data-file-name': ${name}.name})
  );
}
module.exports = ${name};
`,
  };
};

export default {
  process: transform,
};
