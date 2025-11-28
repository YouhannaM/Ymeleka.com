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
    image: '/images/projects/nearestdollar.jpg',
    date: '2024-01-01',
    desc:
      "Developed comprehensive regionalization strategy to minimize tariff exposure across Tesla's global supply chain. " +
      'Achieved $13M cost avoidance with <5% tariff impact by mitigating 4 high-risk programs, ' +
      'qualifying local alternate suppliers, and optimizing inventory management. ' +
      'Technologies: Trade Analysis, Supply Optimization, Legal Compliance',
  },
  {
    title: 'Warranty Process Reengineering',
    subtitle: 'Tesla - Process Optimization',
    image: '/images/projects/harvest.jpg',
    date: '2023-06-01',
    desc:
      'Streamlined supplier warranty chargeback process delivering $15M in savings and 80% process time reduction. ' +
      'Collaborated with global service centers to recover $2.38M in immediate cash. ' +
      'Developed scalable process framework for ongoing warranty management. ' +
      'Technologies: Process Automation, Data Analysis, Workflow Optimization',
  },
  {
    title: 'Scouting America Troop 395',
    subtitle: 'Non-Profit - Community Leadership',
    image: '/images/projects/spacepotato.jpg',
    date: '2024-01-01',
    desc:
      'Co-founded and established new scout troop organization focused on youth leadership development ' +
      'in Silicon Valley community. Drafted organizational bylaws, established financing structure, ' +
      'and created board governance framework for sustainable community impact. ' +
      'Technologies: Community Organizing, Leadership Development',
  },
  {
    title: 'AI-Powered Supply Chain Solutions',
    subtitle: 'Research & Development',
    image: '/images/projects/catdetector.jpg',
    date: '2024-01-01',
    desc:
      'Exploring agentic supply chains and AI applications for operational excellence. ' +
      'Researching how artificial intelligence can create autonomous, adaptive supply chain systems ' +
      'that optimize themselves in real-time. Focus on developing technology solutions to address ' +
      'food security challenges and extend educational opportunities to underserved communities.',
  },
];

export default data;
