// .svgrrc.js

const path = require('path');

function defaultIndexTemplate(filePaths) {
  const exportEntries = filePaths.map((filePath) => {
    const basename = path.basename(filePath, path.extname(filePath));
    const exportName = /^\d/.test(basename) ? `Svg${basename}` : basename;
    return `export { default as SvgIcon${exportName} } from './${basename}'`;
  });
  return exportEntries.join('\n');
}

function template({ template, types: t }, opts, { imports, componentName, props, jsx, exports }) {
  const plugins = ['jsx'];
  const typeScriptTpl = template.smart({ plugins });

  props[0] = {
    ...props[0],
    typeAnnotation: t.typeAnnotation(t.genericTypeAnnotation(t.identifier('SvgProps'))),
  };

  return typeScriptTpl.ast`
    ${imports}
    
    export default function ${componentName}(${props}) { return ${jsx} }
  `;
}

module.exports = {
  template: template,
  indexTemplate: defaultIndexTemplate,
  native: true,
  typescript: true,
  ignoreExisting: true,
  svgoConfig: {
    plugins: {
      removeViewBox: false,
      removeXMLNS: true,
    },
  },
};
