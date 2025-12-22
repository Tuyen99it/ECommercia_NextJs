'use client';

import { useQueryState } from 'nuqs';

export default function TestNuqs() {
  const [name, setName] = useQueryState('name', {
    defaultValue: null,
    throttleMs: 500,
  });

  return (
    <>
      <h1>Hello, {name ?? 'anonymous visitor'}!</h1>

      <input
        value={name ?? ''}
        onChange={(e) => setName(e.target.value || null)}
      />

      <button onClick={() => setName(null)}>Clear</button>
    </>
  );
}
