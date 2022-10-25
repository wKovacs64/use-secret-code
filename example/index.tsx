import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { useCheatCode } from 'use-secret-code';

function CheatCodeExample() {
  const invulnerability = useCheatCode(['i', 'd', 'd', 'q', 'd']);

  return (
    <div style={{ textAlign: 'center', fontSize: 24 }}>
      <header style={{ marginBottom: '4rem' }}>
        <h1>use-secret-code playground</h1>
        <h2 style={{ fontWeight: 'lighter' }}>
          Type &quot;<code style={{ letterSpacing: 2 }}>iddqd</code>&quot; to
          toggle invulnerability!
        </h2>
      </header>
      <main>
        <p>
          <span>
            Invulnerability: {invulnerability ? 'enabled' : 'disabled'}
          </span>
        </p>
      </main>
    </div>
  );
}

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(<CheatCodeExample />);
