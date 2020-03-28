# use-cheat-code

_Custom hook for adding cheat codes to your React app._

[![npm Version][npm-image]][npm-url] [![Build Status][ci-image]][ci-url]
[![Code Coverage][coverage-image]][coverage-url]
[![semantic-release][semantic-release-image]][semantic-release-url]

## Installation

```
npm install use-cheat-code
```

## What is this?

This is a custom [React][react] [hook][hooks-intro] for adding "cheat codes" to
your app. It will listen for a given sequence of keystrokes and track whether
the corresponding "cheat" is enabled or disabled. You can then react (😏)
accordingly (e.g. toggle a feature, pop an alert or notification, etc.). Just
having a little fun here with this throwback to [how we used to enter cheat
codes in video games][konami-code-video].

## Usage

```js
import { useCheatCode } from 'use-cheat-code';

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

[npm-image]: https://img.shields.io/npm/v/use-cheat-code.svg?style=for-the-badge
[npm-url]: https://www.npmjs.com/package/use-cheat-code
[ci-image]:
  https://img.shields.io/circleci/project/github/wKovacs64/use-cheat-code/master.svg?style=for-the-badge
[ci-url]: https://circleci.com/gh/wKovacs64/use-cheat-code
[coverage-image]:
  https://img.shields.io/codecov/c/github/wKovacs64/use-cheat-code/master.svg?style=for-the-badge
[coverage-url]: https://codecov.io/gh/wKovacs64/use-cheat-code/branch/master
[semantic-release-image]:
  https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=for-the-badge
[semantic-release-url]: https://github.com/semantic-release/semantic-release
[license]: https://github.com/wKovacs64/use-cheat-code/tree/master/LICENSE
[react]: https://reactjs.org/
[hooks-intro]: https://reactjs.org/docs/hooks-intro.html
[konami-code-video]: https://www.youtube.com/watch?v=j2gai5kT3eU
[example]: https://github.com/wKovacs64/use-cheat-code/tree/master/example
