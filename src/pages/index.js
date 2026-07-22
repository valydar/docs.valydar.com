import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/quickstart">
            Get Started
          </Link>
          <Link
            className="button button--outline button--lg"
            to="/docs/api/overview"
            style={{marginLeft: '1rem'}}>
            API Reference
          </Link>
        </div>
      </div>
    </header>
  );
}

const features = [
  {
    title: 'Document Verification',
    description: 'OCR, MRZ extraction, and format validation for passports, ID cards, and driver\'s licenses.',
    link: '/docs/verification/document',
  },
  {
    title: 'Face Match',
    description: 'Compare selfies to document photos with colour histograms, texture analysis, and SSIM.',
    link: '/docs/verification/face-match',
  },
  {
    title: 'Liveness Detection',
    description: 'Anti-spoofing checks for photo, screen, and mask attacks using 6 signal analyses.',
    link: '/docs/verification/liveness',
  },
  {
    title: 'Document Liveness',
    description: 'Detect photocopies, printouts, and screen captures of identity documents.',
    link: '/docs/verification/doc-liveness',
  },
  {
    title: 'AML Screening',
    description: 'Screen against OFAC, EU, UN, and HMT sanctions with fuzzy name matching.',
    link: '/docs/verification/aml',
  },
  {
    title: 'Web SDK',
    description: 'Drop-in JavaScript SDK for browser-based verification flows.',
    link: '/docs/sdk/web',
  },
];

function Feature({title, description, link}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center padding-vert--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
        <Link to={link}>Learn more →</Link>
      </div>
    </div>
  );
}

function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {features.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title="Identity verification for developers"
      description="Single API for document verification, biometrics, KYC, AML, and fraud detection.">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
