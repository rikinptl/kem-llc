/** Infrastructure services catalog for KEM Infrastructure page */
export const INFRASTRUCTURE_CATEGORIES = [
  {
    id: 'cloud-hybrid',
    title: 'Cloud & Hybrid Architecture',
    subtitle: 'AWS, Azure, GCP—and what stays on-prem',
    intro:
      'Landing zones, migrations, and hybrid designs that match your compliance and budget—not a rip-and-replace playbook copied from a Big Four slide deck.',
    benefits: [
      { title: 'Cloud migration', description: 'Assess, prioritize, and execute lift-and-shift or refactor with rollback plans.' },
      { title: 'Landing zones & guardrails', description: 'Multi-account structure, IAM baselines, networking, and tagging from day one.' },
      { title: 'Hybrid connectivity', description: 'ExpressRoute, Direct Connect, VPN, and site-to-cloud routing that actually works.' },
      { title: 'FinOps & cost governance', description: 'Budget alerts, reserved instances, right-sizing, and chargeback reporting.' },
      { title: 'Multi-region & DR', description: 'Active-passive and active-active patterns with tested failover.' },
      { title: 'PaaS & managed services', description: 'RDS, Cloud SQL, Azure App Service—when VMs aren’t the answer.' },
    ],
    ctaTitle: 'Plan a migration that sticks',
    ctaBody: 'We start with workload inventory and dependency mapping—then phase cutovers so teams aren’t firefighting on go-live night.',
    ctaLabel: 'Request cloud assessment',
    features: [
      { title: 'Documented architecture', description: 'Diagrams your team can maintain' },
      { title: 'Secure defaults', description: 'Encryption, IAM, and segmentation' },
      { title: 'Scale-ready', description: 'Grow regions without rework' },
    ],
  },
  {
    id: 'network-edge',
    title: 'Network & Edge',
    subtitle: 'LAN, WAN, SD-WAN, Wi-Fi, and remote access',
    intro:
      'Office, warehouse, and remote users on one coherent network—performance, segmentation, and visibility without mystery bottlenecks.',
    benefits: [
      { title: 'Enterprise Wi-Fi', description: 'Survey, design, and deploy APs with guest and IoT segmentation.' },
      { title: 'SD-WAN & WAN', description: 'Multi-link failover, QoS, and centralized policy for branch offices.' },
      { title: 'VPN & zero-trust access', description: 'Site-to-site and client VPN, ZTNA, and conditional access for remote staff.' },
      { title: 'Firewall & segmentation', description: 'Next-gen firewalls, micro-segmentation, and east-west traffic control.' },
      { title: 'DNS, DHCP & IPAM', description: 'Reliable naming, address management, and split-horizon DNS where needed.' },
      { title: 'Network monitoring', description: 'SNMP, flow data, and alerting before users open tickets.' },
    ],
    ctaTitle: 'Fix the network before it fixes you',
    ctaBody: 'We document what you have, find single points of failure, and propose upgrades that fit headcount—not datacenter fantasies.',
    ctaLabel: 'Talk network design',
    features: [
      { title: 'As-built docs', description: 'Diagrams and IP plans included' },
      { title: 'Performance tuned', description: 'QoS and path selection' },
      { title: 'Segmented by default', description: 'Guest, corp, and IoT separated' },
    ],
  },
  {
    id: 'compute-storage',
    title: 'Compute, Storage & Virtualization',
    subtitle: 'Servers, hypervisors, and data platforms',
    intro:
      'On-prem and cloud compute that stays patched, backed up, and right-sized—from VMware clusters to cloud VM fleets.',
    benefits: [
      { title: 'Server lifecycle', description: 'Procurement guidance, imaging, patching, and decommission with data sanitization.' },
      { title: 'VMware & Hyper-V', description: 'Cluster design, HA, vMotion, and storage integration for private cloud.' },
      { title: 'Storage & SAN/NAS', description: 'Capacity planning, tiering, snapshots, and performance tuning.' },
      { title: 'Cloud compute fleets', description: 'EC2, Azure VMs, GCE—autoscaling groups and instance families chosen deliberately.' },
      { title: 'Database hosting', description: 'SQL Server, PostgreSQL, MySQL—HA, backups, and migration support.' },
      { title: 'Hardware break-fix', description: 'RMA coordination, spares strategy, and vendor escalation on your behalf.' },
    ],
    ctaTitle: 'Stable servers, predictable ops',
    ctaBody: 'We run steady-state: patching windows, capacity reviews, and refresh cycles so hardware surprises don’t become outages.',
    ctaLabel: 'Review your fleet',
    features: [
      { title: 'Patch cadence', description: 'Scheduled, tested updates' },
      { title: 'Right-sized', description: 'No idle CPU burning budget' },
      { title: 'Asset tracking', description: 'Warranty and lifecycle visibility' },
    ],
  },
  {
    id: 'containers-platform',
    title: 'Containers & Platform Engineering',
    subtitle: 'Docker, Kubernetes, and internal developer platforms',
    intro:
      'Ship services in containers with platforms your engineers actually want to use—EKS, AKS, GKE, or on-prem K8s with GitOps.',
    benefits: [
      { title: 'Docker & container standards', description: 'Base images, scanning, registries, and compose for local dev parity.' },
      { title: 'Kubernetes operations', description: 'Cluster build, upgrades, RBAC, network policies, and resource quotas.' },
      { title: 'GitOps & deployments', description: 'Argo CD, Flux, Helm—promotion paths from staging to production.' },
      { title: 'Infrastructure as Code', description: 'Terraform, Pulumi, and Ansible modules with review and state management.' },
      { title: 'Internal developer platforms', description: 'Self-service envs, templates, and guardrails for product teams.' },
      { title: 'Secrets & config', description: 'Vault, sealed secrets, and centralized configuration without leaks.' },
    ],
    ctaTitle: 'Platforms that unblock developers',
    ctaBody: 'We balance velocity with guardrails—your teams deploy faster without bypassing security or cost controls.',
    ctaLabel: 'Scope platform work',
    features: [
      { title: 'Faster deploys', description: 'Minutes, not ticket queues' },
      { title: 'Env parity', description: 'Dev matches prod topology' },
      { title: 'Cluster visibility', description: 'Metrics and logs built in' },
    ],
  },
  {
    id: 'observability-sre',
    title: 'Observability & Reliability',
    subtitle: 'Monitoring, logging, alerting, and SRE practices',
    intro:
      'Know when things break before customers do—metrics, logs, traces, and on-call runbooks that turn noise into actionable alerts.',
    benefits: [
      { title: 'Metrics & dashboards', description: 'Prometheus, Grafana, CloudWatch, Datadog—SLO dashboards leadership reads.' },
      { title: 'Centralized logging', description: 'ELK, Loki, or cloud-native log aggregation with retention policies.' },
      { title: 'Alerting & on-call', description: 'PagerDuty, Opsgenie, escalation policies that wake the right person.' },
      { title: 'SLOs & error budgets', description: 'Define reliability targets and prioritize work that protects uptime.' },
      { title: 'Distributed tracing', description: 'OpenTelemetry and APM for latency hunts across microservices.' },
      { title: 'Runbooks & postmortems', description: 'Blameless reviews and documented fixes so incidents don’t repeat.' },
    ],
    ctaTitle: 'Stop flying blind',
    ctaBody: 'We instrument what matters first—customer paths and revenue-critical services—then expand coverage without alert fatigue.',
    ctaLabel: 'Improve observability',
    features: [
      { title: 'Full stack view', description: 'Infra through application' },
      { title: 'Fewer false alarms', description: 'Tuned thresholds and routing' },
      { title: 'Faster MTTR', description: 'Context-rich incidents' },
    ],
  },
  {
    id: 'backup-dr',
    title: 'Backup, DR & Business Continuity',
    subtitle: 'Recovery plans you have actually tested',
    intro:
      'Backups that restore, DR that fails over, and continuity plans your auditors and board can follow—not shelfware binders.',
    benefits: [
      { title: 'Backup strategy (3-2-1)', description: 'On-prem, cloud, and immutable copies with encryption and access control.' },
      { title: 'Disaster recovery', description: 'RTO/RPO aligned to the business—warm standby, pilot light, or multi-site active.' },
      { title: 'Restore testing', description: 'Scheduled drills that prove recovery works—not just backup job success.' },
      { title: 'Cloud backup & archival', description: 'Long-term retention for compliance without runaway storage bills.' },
      { title: 'BCP documentation', description: 'Roles, comms plans, and decision trees for extended outages.' },
      { title: 'Ransomware resilience', description: 'Air-gapped copies, MFA on backup admin, and rapid isolation playbooks.' },
    ],
    ctaTitle: 'Recovery you can trust',
    ctaBody: 'We map critical systems to recovery tiers and build automation so failover isn’t a manual scramble at 2 a.m.',
    ctaLabel: 'Review BDR posture',
    features: [
      { title: 'Tested restores', description: 'Evidence for audits' },
      { title: 'Defined RTO/RPO', description: 'Expectations documented' },
      { title: 'Immutable copies', description: 'Protection from ransomware' },
    ],
  },
  {
    id: 'infra-security',
    title: 'Infrastructure Security',
    subtitle: 'Hardening, compliance, and secure operations',
    intro:
      'Security woven into how infrastructure is built and run—patching, access, logging, and controls that satisfy auditors and CISOs.',
    benefits: [
      { title: 'Identity & privileged access', description: 'MFA, PAM, break-glass accounts, and least-privilege IAM policies.' },
      { title: 'Hardening baselines', description: 'CIS benchmarks, STIG-aligned configs, and automated compliance scans.' },
      { title: 'Compliance mapping', description: 'HIPAA, SOC 2, PCI controls tied to infrastructure evidence.' },
      { title: 'Vulnerability management', description: 'Scanning, prioritization, and patch SLAs by severity.' },
      { title: 'Audit logging', description: 'CloudTrail, Azure Activity Log, centralized retention for investigations.' },
      { title: 'Incident response prep', description: 'Isolation procedures, forensics hooks, and comms templates.' },
    ],
    ctaTitle: 'Secure infrastructure by default',
    ctaBody: 'We align with your compliance framework and leave you with policies, evidence, and monitoring—not a one-time scan report.',
    ctaLabel: 'Request security review',
    features: [
      { title: 'Audit-ready', description: 'Controls mapped to evidence' },
      { title: 'Defense in depth', description: 'Layered controls, not single tools' },
      { title: 'Continuous checks', description: 'Drift detection and alerts' },
    ],
  },
]

export const INFRASTRUCTURE_PILLARS = INFRASTRUCTURE_CATEGORIES.map(({ id, title }) => ({
  id,
  title,
}))

export const INFRA_STATS = [
  { value: '99.9%+', label: 'Uptime targets we design for' },
  { value: 'AWS · Azure · GCP', label: 'Cloud platforms we operate' },
  { value: '24/7', label: 'Monitoring & escalation options' },
  { value: 'Tested DR', label: 'Restore drills, not assumptions' },
]

export const INFRA_PROCESS = [
  { step: '01', title: 'Assess', body: 'Inventory workloads, dependencies, risks, and gaps in your current stack.' },
  { step: '02', title: 'Design', body: 'Architecture, security, and cost model—with phased roadmap and rollback plans.' },
  { step: '03', title: 'Build & migrate', body: 'IaC, cutovers, and validation—minimal disruption to production.' },
  { step: '04', title: 'Run & improve', body: 'Monitoring, patching, capacity reviews, and continuous optimization.' },
]
