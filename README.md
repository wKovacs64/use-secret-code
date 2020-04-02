# use-secret-code

_Custom hook for adding cheat codes to your React app._

[![npm Version][npm-image]][npm-url] [![Build Status][ci-image]][ci-url]
[![Code Coverage][coverage-image]][coverage-url]
[![semantic-release][semantic-release-image]][semantic-release-url]

## Installation

```
npm install use-secret-code
```

## What is this?

This is a custom [React][react] [hook][hooks-intro] for adding "cheat codes" to
your app. It will listen for a given sequence of keystrokes and track whether
the corresponding "cheat" is enabled or disabled. You can then react (😏)
accordingly (e.g. toggle a feature, pop an alert or notification, etc.). Just
having a little fun here with this throwback to [how we used to enter cheat
codes in video games][konami-code-video].

## Package Name

This package was originally called `use-cheat-code` but apparently the word
"cheat" is against [npm policies][npm-policies], so they denied my attempt to
publish the package under that name and I was forced to pick a new name. I went
with `use-secret-code` (it's not great, but what else do you call a cheat
code?), but I still export `useCheatCode` as well as `useSecretCode`. They are
the same thing, but I will personally be importing `useCheatCode` in my own
projects.

## Usage

```js
// import { useSecretCode } from 'use-secret-code'; // alternate
import { useCheatCode } from 'use-secret-code';

function CheatCodeExample() {
  const invulnerability = useCheatCode(['i', 'd', 'd', 'q', 'd']);
  return (
    <p>
      <span>Invulnerability:</span>{' '}
      <span>{invulnerability ? 'enabled' : 'disabled'}</span>
    </p>
  );
}
```

## Browser Support

This should work in all modern browsers, but you'll need to polyfill `Set` for
use in IE11. See the playground project in the [`example`][example] directory
for one approach.

## License

This module is distributed under the [MIT License][license].

[npm-image]:
  https://img.shields.io/npm/v/use-secret-code.svg?style=for-the-badge
[npm-url]: https://www.npmjs.com/package/use-secret-code
[ci-image]:
  https://img.shields.io/circleci/project/github/wKovacs64/use-secret-code/master.svg?style=for-the-badge
[ci-url]: https://circleci.com/gh/wKovacs64/use-secret-code
[coverage-image]:
  https://img.shields.io/codecov/c/github/wKovacs64/use-secret-code/master.svg?style=for-the-badge
[coverage-url]: https://codecov.io/gh/wKovacs64/use-secret-code/branch/master
[semantic-release-image]:
  https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=for-the-badge
[semantic-release-url]: https://github.com/semantic-release/semantic-release
[license]: https://github.com/wKovacs64/use-secret-code/tree/master/LICENSE
[react]: https://reactjs.org/
[hooks-intro]: https://reactjs.org/docs/hooks-intro.html
[npm-policies]: https://www.npmjs.com/policies
[konami-code-video]: https://www.youtube.com/watch?v=j2gai5kT3eU
[example]: https://github.com/wKovacs64/use-secret-code/tree/master/example
