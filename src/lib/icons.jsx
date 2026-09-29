import { icons } from './iconRegistry.js';

/**
 * Renders a registered icon by name. Unknown names render nothing rather than
 * throwing, so a typo in a data file degrades quietly instead of blanking the
 * page — but it is a content bug worth catching, hence the data files use
 * only names present in `iconRegistry.js`.
 */
export function Icon({ name, ...props }) {
  const Component = icons[name];
  if (!Component) return null;
  return <Component {...props} />;
}
