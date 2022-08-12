import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: '00_ionic_tests',
  webDir: 'build',
  bundledWebRuntime: false,

  "server": {
    "url": "http://192.168.1.180:3000",
    "cleartext": true
  },
};

export default config;
