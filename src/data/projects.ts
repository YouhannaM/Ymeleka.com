export interface Project {
  title: string;
  subtitle?: string;
  link?: string;
  image: string;
  date: string;
  desc: string;
}

const data: Project[] = [
  {
    title: 'Tariff Impact Reduction Initiative',
    subtitle: 'Tesla - Supply Chain Strategy',
    image: '',
    date: '2025-01-01',
    desc:
      "Developed comprehensive regionalization strategy to minimize tariff exposure across Tesla's global supply chain. " +
      'Achieved $13M cost avoidance with <5% tariff impact by mitigating 4 high-risk programs, ' +
      'qualifying local alternate suppliers, and optimizing inventory management. ' +
      'Technologies: Trade Analysis, Supply Optimization, Legal Compliance',
  },
  {
    title: 'Warranty Process Reengineering',
    subtitle: 'Tesla - Process Optimization',
    image: '',
    date: '2023-06-01',
    desc:
      'Streamlined supplier warranty chargeback process delivering $15M in savings and 80% process time reduction. ' +
      'Collaborated with global service centers to recover $2.38M in immediate cash. ' +
      'Developed scalable process framework for ongoing warranty management. ' +
      'Technologies: Process Automation, Data Analysis, Workflow Optimization',
  },
];

export default data;
