import {
  ArrowRight,
  Award,
  BookOpen,
  Briefcase,
  Building2,
  Calendar,
  Check,
  CheckCircle2,
  ChevronDown,
  Cloud,
  Code2,
  Compass,
  Cpu,
  ExternalLink,
  GitPullRequest,
  Globe,
  GraduationCap,
  Image as ImageIcon,
  Layers,
  Mail,
  MapPin,
  Network,
  Quote,
  Rocket,
  Sparkles,
  Terminal,
  TerminalSquare,
  Trophy,
  Users,
} from 'lucide-react';

/**
 * Icon name -> component registry.
 *
 * Data files store icons as plain strings ("Trophy") rather than JSX, which
 * keeps `src/data/` a pure content layer: content can be edited without
 * touching React, and this stays the single place names map to icons.
 *
 * Kept in its own module (no JSX) so it can be imported from `.js` files too.
 */
export const icons = {
  ArrowRight,
  Award,
  BookOpen,
  Briefcase,
  Building2,
  Calendar,
  Check,
  CheckCircle2,
  ChevronDown,
  Cloud,
  Code2,
  Compass,
  Cpu,
  ExternalLink,
  GitPullRequest,
  Globe,
  GraduationCap,
  Image: ImageIcon,
  Layers,
  Mail,
  MapPin,
  Network,
  Quote,
  Rocket,
  Sparkles,
  Terminal,
  TerminalSquare,
  Trophy,
  Users,
};
