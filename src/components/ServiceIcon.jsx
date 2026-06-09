import {
  Activity,
  Bot,
  Cloud,
  Code2,
  Container,
  Database,
  Globe,
  HardDrive,
  Lock,
  Mail,
  Monitor,
  Network,
  RefreshCw,
  Server,
  ShieldCheck,
  Sparkles,
  Workflow,
} from 'lucide-react'

/** Category id → Lucide icon (stroke-only, no emoji) */
const SERVICE_ICON_MAP = {
  'managed-it': Monitor,
  'cloud-infra': Cloud,
  'cloud-hybrid': Cloud,
  security: ShieldCheck,
  'infra-security': Lock,
  devops: Workflow,
  development: Code2,
  'data-backup': Database,
  productivity: Mail,
  'ai-agents': Bot,
  'ai-solutions': Sparkles,
  'ai-automation': RefreshCw,
  digital: Globe,
  'network-edge': Network,
  'compute-storage': Server,
  'containers-platform': Container,
  'observability-sre': Activity,
  'backup-dr': HardDrive,
}

export function ServiceIcon({ id, className = 'w-6 h-6', strokeWidth = 1.75 }) {
  const Icon = SERVICE_ICON_MAP[id]
  if (!Icon) return null
  return <Icon className={className} strokeWidth={strokeWidth} aria-hidden />
}

export default ServiceIcon
