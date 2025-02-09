import type { ReactNode } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="A fully-configured TypeScript NPM package template with built-in CI/CD, automated tests, ESLint, Prettier, and Docusaurus documentation. Get started quickly with best practices for package development"
    >
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
