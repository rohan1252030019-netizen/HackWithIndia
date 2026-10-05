import {
  DiscordIcon,
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
  WhatsappIcon,
} from './socialIcons.jsx';

/**
 * Platform name -> brand mark.
 *
 * Split from socialIcons.jsx so that file exports components only, which
 * is what React Fast Refresh needs. This mirrors the shape of
 * lib/iconRegistry.js so the two are interchangeable at the call site.
 */
export const socialIconMap = {
  github: GithubIcon,
  instagram: InstagramIcon,
  linkedin: LinkedinIcon,
  whatsapp: WhatsappIcon,
  discord: DiscordIcon,
};

/** Safe lookup — an unknown name renders nothing rather than throwing. */
export function getSocialIcon(name) {
  return socialIconMap[name] ?? null;
}