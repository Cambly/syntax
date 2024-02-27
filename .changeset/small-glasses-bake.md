---
"@cambly/syntax-codemods": minor
"@cambly/syntax-core": minor
---

Button/LinkButton: remove startIcon & endIcon props

Codemod:

```sh
npx @cambly/syntax-codemods -c component-remove-prop -p ~/cambly/Cambly-Frontend/src/ --component=Button --prop=startIcon
npx @cambly/syntax-codemods -c component-remove-prop -p ~/cambly/Cambly-Frontend/src/ --component=Button --prop=endIcon
npx @cambly/syntax-codemods -c component-remove-prop -p ~/cambly/Cambly-Frontend/src/ --component=LinkButton --prop=startIcon
npx @cambly/syntax-codemods -c component-remove-prop -p ~/cambly/Cambly-Frontend/src/ --component=LinkButton --prop=endIcon
```
