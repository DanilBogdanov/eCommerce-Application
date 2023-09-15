import { ReactElement } from 'react';

export default function Main(): ReactElement {
  return (
    <main>
      <h2>Main</h2>
      <img
        src='/img/inProgress.png'
        alt='in building'
        style={{ width: '100%' }}
      />
    </main>
  );
}
