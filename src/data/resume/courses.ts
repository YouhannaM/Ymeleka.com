export interface Course {
  title: string;
  number: string;
  link: string;
  university: string;
}

const courses: Course[] = [
  {
    title: 'Six-Sigma Black Belt (CCSSBBC)',
    number: 'May 2025',
    link: 'https://www.iise.org/Certification',
    university: 'IISE',
  },
  {
    title: 'Lean Six-Sigma Green Belt (LSSGBC)',
    number: 'Dec 2020',
    link: 'https://www.iise.org/Certification',
    university: 'IISE',
  },
  {
    title: 'Financial Modeling and Valuation Analyst (FMVA®)',
    number: 'May 2025',
    link: 'https://corporatefinanceinstitute.com/certifications/fmva/',
    university: 'CFI',
  },
];

export default courses;
