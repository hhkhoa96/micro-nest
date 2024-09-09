import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'payment-ui',
  exposes: {
    './Routes': 'apps/payment-ui/src/app/remote-entry/entry.routes.ts',
  },
};

export default config;
