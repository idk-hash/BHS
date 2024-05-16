import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'testtt',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    BackgroundRunner: {
      label: 'io.ionic.starter.check',
      src: 'runner/runner.js',
      event: 'hello',
      repeat: false,
      interval: 0,
      autoStart: false,
    },
  },
};

export default config;
