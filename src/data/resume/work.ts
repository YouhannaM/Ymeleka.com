/**
 * Conforms to https://jsonresume.org/schema/
 */
export interface Position {
  name: string;
  position: string;
  url: string;
  startDate: string;
  endDate?: string;
  summary?: string;
  highlights?: string[];
}

const work: Position[] = [
  {
    name: 'Tesla',
    position: 'Supply Chain Manager',
    url: 'https://tesla.com',
    startDate: '2023-01-01',
    endDate: '2024-12-01',
    summary:
      'Led global supply chain operations managing $300M+ in annual spend across critical programs. Delivered exceptional operational performance with 100% production uptime while driving $43M in cumulative cost savings through strategic initiatives.',
    highlights: [
      'Managed $300M+ annual spend with 100% production uptime achievement',
      'Delivered $43M in cumulative cost savings through strategic supply chain optimization',
      'Developed tariff mitigation strategy achieving $13M cost avoidance with <5% tariff impact',
      'Engineered warranty process improvements delivering $15M savings and 80% time reduction',
      'Led cross-functional teams for supplier qualification and risk mitigation initiatives',
      "Recipient of Tesla's Top Talent Award (2024)",
    ],
  },
  {
    name: 'BP',
    position: 'Industrial & Systems Engineering Intern',
    url: 'https://bp.com',
    startDate: '2022-05-01',
    endDate: '2022-08-01',
    summary:
      'Drove process optimization initiatives in manufacturing operations, delivering measurable improvements in efficiency and cost reduction.',
    highlights: [
      'Implemented process improvements reducing operational costs',
      'Conducted data analysis to identify optimization opportunities',
      "Received BP's Award for Innovation and Impact (2022)",
    ],
  },
  {
    name: 'Scouting America - Troop 395',
    position: 'Co-founder',
    url: '#',
    startDate: '2024-01-01',
    summary:
      'Co-founded and established new scout troop organization focused on youth leadership development in Silicon Valley community.',
    highlights: [
      'Drafted organizational bylaws and governance framework',
      'Established financing structure for sustainable operations',
      'Created board governance framework',
      'Developed programs for youth leadership and community service',
    ],
  },
];

export default work;
