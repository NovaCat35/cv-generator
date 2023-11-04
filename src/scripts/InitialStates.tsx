import {
	Person,
	Education,
	SkillHeader,
	SkillItem,
	Experience,
	ExperienceBulletPts,
	AdditionalInfo,
} from "../App.tsx";

const initialPersonState: Person = {
	name: "",
	email: "",
	phone: "",
	location: "",
	website: "",
};

const initialEducationState: Education = {
	school: "",
	study: "",
	location: "",
	startDate: "",
	endDate: "",
};

const initialSkillHeadersState: SkillHeader[] = [
	{ id: "header1", header: "" },
	{ id: "header2", header: "" },
];

const initialSkillsState: SkillItem[] = [];

const initialExperienceState: Experience = [];

const initialExpBulletPtsState: ExperienceBulletPts[] = [];

const initialAdditionalInfoState: AdditionalInfo = {
	categories: [],
	subHeaders: [],
	bulletPoints: [],
};

// -------------------------------------------------
// INITIAL SAMPLES BELOW

const initialSamplePerson: Person = {
	name: "Edward Elric",
	email: "edward.elric@gmail.com",
	phone: "(202) 456-1111",
	location: "Resembool, Amestris",
	website: "linkedin.com/in/edwardelric",
};

const initialSampleEducation: Education = {
	school: "Amestrian State Military",
	location: "Amestris, Central City",
	study: "Master of State Alchemy",
	startDate: "Oct 1911",
	endDate: "May 1913",
};

const initialSampleSkillHeaders: SkillHeader[] = [
	{ id: "header1", header: "Scientific Disciplines" },
	{ id: "header2", header: "Adventure Expertise" },
];

const initialSampleSkills: SkillItem[] = [
   { id: "nova789", headerId: "header1", skill: "transmutation" },
   { id: "efg456", headerId: "header1", skill: "biology" },
   { id: "han23", headerId: "header1", skill: "alchemic mastery" },
   { id: "abc456", headerId: "header1", skill: "elemental manipulation" },
   { id: "head23", headerId: "header2", skill: "survival instincts" },
   { id: "sans23", headerId: "header2", skill: "swimming" },
   { id: "did89", headerId: "header2", skill: "physical combat" },
   { id: "magic234", headerId: "header2", skill: "tracking" },
   { id: "stealth678", headerId: "header2", skill: "stealth" },
   { id: "leadership432", headerId: "header2", skill: "adaptability" },
];

const initialSampleExperience: Experience = [
   {
      id: "abc123",
      company: "Aperture Science, Inc.",
      position: "Research Assistant",
      location: "USA",
      description: "Contributed invaluable insights to the development of cutting-edge technologies, most notably the revolutionary portal gun.",
      startDate: "Aug 1957",
      endDate: "April 1970",
   },
   {
      id: "pwd888",
      company: "Amestrian State Military",
      position: "State Alchemist",
      location: "Amestris, Central City",
      description: "Utilized alchemical expertise and innovative problem-solving to investigate and resolve complex alchemical mysteries. Demonstrated exceptional skill in both theoretical and practical alchemy, ensuring the safety and security of Amestris through pioneering advancements in alchemical techniques.",
      startDate: "Sept 1911",
      endDate: "May 1917",
   },
];

const initialSampleExpBulletPts: ExperienceBulletPts[] = [
   {
      id: "bullet1",
      headerId: "abc123",
      bulletPoint: "Conducted extensive research on quantum mechanics and theoretical physics to support the development of innovative technologies.",
   },
   {
      id: "bullet2",
      headerId: "abc123",
      bulletPoint: "Collaborated with a multidisciplinary team of scientists and engineers to solve complex scientific challenges related to portal technology.",
   },
   {
      id: "b3ll3t3",
      headerId: "pwd888",
      bulletPoint: "Investigated and resolved intricate alchemical mysteries, utilizing a deep understanding of alchemical principles and techniques to uncover hidden truths and solve complex problems.",
   },
   {
      id: "bullet4",
      headerId: "pwd888",
      bulletPoint: "Actively participated in intelligence missions, employing alchemical skills to decrypt codes, decipher ancient texts, and gain insights into the enemy's alchemical capabilities.",
   },
   {
      id: "bu5et5",
      headerId: "pwd888",
      bulletPoint: "Conducted public demonstrations and educational outreach programs to raise awareness about alchemy, its applications, and its ethical use, promoting understanding and cooperation within the community.",
   },
];

const initialSampleAdditionalInfo: AdditionalInfo = {
   categories: [{ id: "cat1", header: "Personal Projects" }],
   subHeaders: [
      { id: "sub1", categoryId: "cat1", headerName: "Alchemy Mastery: Philosopher's Stone Revelation", bulletPointIds: ["hol3", "fed"] },
      { id: "sub2", categoryId: "cat1", headerName: "Automail Revolution: Enhanced Prosthetics", bulletPointIds: ["see3"] },
   ],
   bulletPoints: [
      { id: "hol3", subHeaderId: "sub1", bulletPoint: "Researched ancient alchemical manuscripts and decoded complex symbols, advancing the understanding of Philosopher's Stone synthesis." },
      { id: "fed", subHeaderId: "sub1", bulletPoint: "Developed a groundbreaking technique for Philosopher's Stone synthesis, demonstrating expertise in advanced alchemy." },
      { id: "see3", subHeaderId: "sub2", bulletPoint: "Worked closely with renowned automail expert Winry Rockbell, contributing expertise in alchemical principles to improve compatibility and integration with the human body." },
   ],
};

export {
   initialPersonState, 
   initialEducationState, 
   initialSkillHeadersState,
   initialSkillsState,
   initialExperienceState,
   initialExpBulletPtsState,
   initialAdditionalInfoState,
   initialSamplePerson,
   initialSampleEducation,
   initialSampleSkillHeaders,
   initialSampleSkills,
   initialSampleExperience,
   initialSampleExpBulletPts,
   initialSampleAdditionalInfo,
}
