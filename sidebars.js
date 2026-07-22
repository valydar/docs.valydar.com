/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  guideSidebar: [
    'intro',
    'quickstart',
    'authentication',
    'authorization',
    {
      type: 'category',
      label: 'Verification',
      items: [
        'verification/overview',
        'verification/document',
        'verification/barcode',
        'verification/face-match',
        'verification/liveness',
        'verification/active-liveness',
        'verification/doc-liveness',
        'verification/aml',
        'verification/kyb',
        'verification/affordability',
      ],
    },
    {
      type: 'category',
      label: 'SDKs',
      items: [
        'sdk/web',
        'sdk/mobile',
        'sdk/python',
        'sdk/csharp',
        'sdk/java',
      ],
    },
    'errors',
    'security',
  ],
  apiSidebar: [
    'api/overview',
    'api/verifications',
    'api/documents',
    'api/selfie',
    'api/face-match',
    'api/doc-liveness',
    'api/active-liveness',
    'api/webhooks',
    'api/admin',
  ],
};

export default sidebars;
