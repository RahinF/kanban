import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../tailwind.config.js';

const screenSizesKeys = ['sm', 'md', 'lg', 'xl', '2xl'] as const;
export type Size = (typeof screenSizesKeys)[number];

export type Screen = {
  [key in Size]: string;
};

const fullConfig = resolveConfig(tailwindConfig);

export const screenSizes = Object.fromEntries(
  Object.entries(fullConfig.theme?.screens as Screen).map(([key, value]) => {
    return [key, Number(value.substring(0, value.length - 2))];
  })
);
