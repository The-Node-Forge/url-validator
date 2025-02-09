import React from 'react';
import PackageMarkdown from '@site/static/PROJECTMARKDOWN.md';
import useBaseUrl from '@docusaurus/useBaseUrl';

export default function Homepage(): JSX.Element {
  return (
    <main className="container margin-vert--lg">
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <img
          src={useBaseUrl('/img/theNodeForge.png')}
          alt="The Node Forge Logo"
          width={150}
          height={150}
          style={{ borderRadius: '50%' }}
        />
        <h1 style={{ marginTop: '1rem', fontSize: '2rem' }}>
          The Node Forge presents:
        </h1>
      </div>
      <PackageMarkdown />
    </main>
  );
}
