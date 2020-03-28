import 'react-app-polyfill/ie11';
import 'core-js/features/set';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useCheatCode } from '..';

function CheatCodeExample() {
  const invulnerability = useCheatCode(['i', 'd', 'd', 'q', 'd']);

  return (
    <div style={{ textAlign: 'center', fontSize: 24 }}>
      <header style={{ marginBottom: '4rem' }}>
        <h1>use-cheat-code playground</h1>
        <h2 style={{ fontWeight: 'lighter' }}>
          Type &quot;<code style={{ letterSpacing: 2 }}>iddqd</code>&quot; to
          toggle invulnerability!
        </h2>
      </header>
      <main>
        <p>
          <span>Invulnerability:</span>{' '}
          <span>{invulnerability ? 'enabled' : 'disabled'}</span>
        </p>
      </main>
    </div>
  );
}

ReactDOM.render(<CheatCodeExample />, document.getElementById('root'));
