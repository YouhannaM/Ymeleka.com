/**
 * Affiliations shown in Scene IV. A missing url renders as plain text
 * until a confirmed link is added.
 */
export interface Affiliation {
  name: string;
  role: string;
  url?: string;
}

export const cornellAffiliations: Affiliation[] = [
  {
    name: 'Cornell University Physical Intelligence',
    role: 'Founding Board Member',
  },
  {
    name: 'Big Red Ventures',
    role: 'Deep Tech Diligence and Sourcing',
    url: 'https://www.bigredventures.com',
  },
  {
    name: 'Entrepreneurship at Cornell',
    role: 'Community',
    url: 'https://eship.cornell.edu',
  },
];
