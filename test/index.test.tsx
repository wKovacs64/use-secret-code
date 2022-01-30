import * as React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useCheatCode } from '../src';

function TestComponent({ cheatCodeKeys }: { cheatCodeKeys: Array<string> }) {
  const cheatCodeActivated = useCheatCode(cheatCodeKeys);
  return <div data-testid={cheatCodeActivated ? 'enabled' : 'disabled'} />;
}

describe('useCheatCode', () => {
  it('toggles cheat when cheat code is entered', async () => {
    const user = userEvent.setup();
    const cheatCode = 'iddqd';
    const cheatCodeKeys = cheatCode.split('');
    render(<TestComponent cheatCodeKeys={cheatCodeKeys} />);

    expect(screen.getByTestId('disabled')).toBeInTheDocument();
    await user.keyboard(cheatCode);
    expect(screen.getByTestId('enabled')).toBeInTheDocument();
    await user.keyboard(cheatCode);
    expect(screen.getByTestId('disabled')).toBeInTheDocument();
  });
});
