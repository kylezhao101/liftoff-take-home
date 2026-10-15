module.exports = {
  svgo: false,
  replaceAttrValues: { white: 'currentColor', '#FAFEFF': 'currentColor' },
  jsx: {
    babelConfig: {
      plugins: [function overridableFillOpacity({ types: t }) {
        return {
          visitor: {
            JSXAttribute(path) {
              if (!['fillOpacity', 'fill-opacity'].includes(path.node.name.name)) return;
              const value = path.node.value;
              const original = t.isJSXExpressionContainer(value) ? value.expression : value;
              if (!t.isNumericLiteral(original, { value: 0.6 }) &&
                  !t.isStringLiteral(original, { value: '0.6' })) return;
              path.node.value = t.jsxExpressionContainer(t.logicalExpression(
                '??',
                t.memberExpression(t.identifier('props'), t.identifier('fillOpacity')),
                t.numericLiteral(0.6),
              ));
            },
          },
        };
      }],
    },
  },
};
