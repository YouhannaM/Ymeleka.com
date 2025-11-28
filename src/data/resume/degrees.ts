export interface Degree {
  school: string;
  degree: string;
  link: string;
  year: number;
  gpa?: string;
  honors?: string[];
}

const degrees: Degree[] = [
  {
    school: 'The Pennsylvania State University',
    degree: 'B.S. Industrial, Systems, & Manufacturing Engineering',
    link: 'https://psu.edu',
    year: 2022,
    gpa: '3.88/4.00',
    honors: ["Dean's List (5 out of 6 semesters)", 'College of Engineering'],
  },
];

export default degrees;
