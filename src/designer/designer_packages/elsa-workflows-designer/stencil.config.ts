import purgecss from '@fullhuman/postcss-purgecss';
import { Config } from '@stencil/core';
import { postcss } from '@stencil/postcss';
import { sass } from '@stencil/sass';
import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';

import { angularOutputTarget } from '@stencil/angular-output-target';

// @ts-ignore
const dev: boolean = process.argv && process.argv.indexOf('--dev') > -1;

export const config: Config = {
  namespace: 'elsa-workflows-designer',
  globalStyle: 'src/global/tailwind.scss',

  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
      copy: [
        {
          src: '**/*.i18n.*.json',
          dest: 'i18n',
        },
      ],
    },
    {
      type: 'dist-custom-elements',

    },
    angularOutputTarget({
      componentCorePackage: '@elsa-workflows/elsa-workflows-designer',
      directivesProxyFile: 'C:\\dev\\cp-suite\\src\\CP Automation\\Solution\\npx-cp-elsa-designer\\projects\\npx-cp-angular-designer\\src\\lib\\elsa-components\\components.ts',
      directivesArrayFile: 'C:\\dev\\cp-suite\\src\\CP Automation\\Solution\\npx-cp-elsa-designer\\projects\\npx-cp-angular-designer\\src\\lib\\elsa-components\\index.ts',
      excludeComponents: ['context-consumer'],
    }),
    {
      type: 'www',
      serviceWorker: null, // disable service workers
      copy: [
        {
          src: '**/*.i18n.*.json',
          dest: 'i18n',
        },
      ],
    },
  ],
  plugins: [
    sass(),
    postcss({
      plugins: [
        tailwindcss(),
        autoprefixer(),
        ...(dev
          ? []
          : [
              purgecss({
                content: ['./**/*.tsx', './**/*.ts'],
                defaultExtractor: content => content.match(/[\w-/:.]+(?<!:)/g) || [],
              }),
            ]),
      ],
    }),
  ],
};
