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

export {
   initialPersonState, 
   initialEducationState, 
   initialSkillHeadersState,
   initialSkillsState,
   initialExperienceState,
   initialExpBulletPtsState,
   initialAdditionalInfoState
}
