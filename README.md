# use-secret-code

_Custom hook for adding cheat codes to your React app._

[![npm Version][npm-image]][npm-url] [![Build Status][ci-image]][ci-url]
[![Code Coverage][coverage-image]][coverage-url]

## Installation

```
npm install use-secret-code
```

## What is this?

This is a custom [React][react] [hook][hooks-intro] for adding "cheat codes" to your app. It will
listen for a given sequence of keystrokes and track whether the corresponding "cheat" is enabled or
disabled. You can then react (😏) accordingly (e.g. toggle a feature, pop an alert or notification,
etc.). Just having a little fun here with this throwback to [how we used to enter cheat codes in
video games][konami-code-video].

## Package Name

This package was originally called `use-cheat-code` but apparently the word "cheat" is against [npm
policies][npm-policies], so they denied my attempt to publish the package under that name and I was
forced to pick a new name. I went with `use-secret-code` (it's not great, but what else do you call
a cheat code?), but I still export `useCheatCode` as well as `useSecretCode`. They are the same
thing, but I will personally be importing `useCheatCode` in my own projects.

## Usage

```js
// import { useSecretCode } from 'use-secret-code'; // alternate
import { useCheatCode } from "use-secret-code";

function CheatCodeExample() {
  const invulnerability = useCheatCode(["i", "d", "d", "q", "d"]);
  return <span>Invulnerability: {invulnerability ? "enabled" : "disabled"}</span>;
}
```

## Browser Support

This should work in all modern browsers, but you'll need to polyfill `Set` for use in IE11. See the
playground project in the [`example`][example] directory for one approach.

## License

This module is distributed under the [MIT License][license].

[npm-image]: https://img.shields.io/npm/v/use-secret-code.svg?style=for-the-badge
[npm-url]: https://www.npmjs.com/package/use-secret-code
[ci-image]: https://img.shields.io/github/actions/workflow/status/wKovacs64/use-secret-code/ci.yml?logo=github&style=for-the-badge
[ci-url]: https://github.com/wKovacs64/use-secret-code/actions?query=workflow%3Aci
[coverage-image]: https://img.shields.io/codecov/c/github/wKovacs64/use-secret-code/main.svg?style=for-the-badge
[coverage-url]: https://codecov.io/gh/wKovacs64/use-secret-code/branch/main
[license]: https://github.com/wKovacs64/use-secret-code/tree/main/LICENSE
[react]: https://reactjs.org/
[hooks-intro]: https://reactjs.org/docs/hooks-intro.html
[npm-policies]: https://www.npmjs.com/policies
[konami-code-video]: https://www.youtube.com/watch?v=j2gai5kT3eU
[example]: https://github.com/wKovacs64/use-secret-code/tree/main/example
