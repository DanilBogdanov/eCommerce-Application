import { ReactElement } from 'react';

export default function Catalog(): ReactElement {
  return (
    <main>
      <h2>Catalog</h2>
      <img
        src='/img/inProgress.png'
        alt='in building'
        style={{ width: '100%' }}
      />
    </main>
  );
}
