module.exports = {
  extends: ["stylelint-config-standard", "stylelint-config-css-modules"],
  rules: {
    "alpha-value-notation": "number",
    "color-named": "never",
    "declaration-no-important": true,
    "declaration-property-value-no-unknown": true,
    "keyframes-name-pattern": [
      "^syntax[a-zA-Z0-9]+$",
      {
        message:
          "Keyframes should be written in lower camelCase and start with syntax to avoid conflicts with other libraries",
      },
    ],
    "length-zero-no-unit": true,
    "max-nesting-depth": 0,
    "no-unknown-animations": true,
    "number-max-precision": 2,
    "selector-class-pattern": [
      "^[a-z][a-zA-Z0-9]+$",
      {
        message: "Selector should be written in lower camelCase",
      },
    ],
    "color-function-notation": "legacy",
    "selector-id-pattern": null,
    "selector-max-class": 1,
    "selector-max-compound-selectors": 1,
    "selector-max-id": 0,
    "selector-max-pseudo-class": 1,
    "selector-max-specificity": "0,2,0",
    "selector-max-type": [
      0,
      {
        ignoreTypes: ["html"],
        message: "Tag selectors are not allowed since it breaks encapsulation",
      },
    ],
    "selector-max-universal": 0,
    "shorthand-property-no-redundant-values": true,
  },
  reportDescriptionlessDisables: true,
  reportInvalidScopeDisables: true,
  reportNeedlessDisables: true,
};
