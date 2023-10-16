import { Person, Education, Experience, ExperienceItem } from "../App.tsx";
import { v4 as uuidv4 } from 'uuid';

interface ResumePreviewProps {
	personInfo: Person;
	educationInfo: Education;
	experienceInfo: Experience;
}
export default function ResumePreview({ personInfo, educationInfo, experienceInfo }: ResumePreviewProps) {
	return (
		<div className='resume-container'>
			<header>
				<div className="name">{personInfo.name}</div>
				<div className="contact-info">
					<div className="email">{personInfo.email}</div>
					<div className="phone">{personInfo.phone}</div>
					<div className="location">{personInfo.location}</div>
					<div className="website">{personInfo.website}</div>
				</div>
			</header>
			<main>
				<div className="education-container">
					<h1>Education</h1>
					<div className="school">{educationInfo.school}</div>
					<div className="study">{educationInfo.study}</div>
					<div className="startDate">{educationInfo.startDate}</div>
					<div className="endDate">{educationInfo.endDate}</div>
				</div>
				<div className="experience-container">
					<h1>Career Experience</h1>
					{experienceInfo.map((experience : ExperienceItem, index: number) => (
						<div className={`exp-${index}`} key={uuidv4()}>
							<div className="company">{experience.company}</div>
							<div className="position">{experience.position}</div>
							<div className="description">{experience.description}</div>
							<div className="startDate">{experience.startDate}</div>
							<div className="endDate">{experience.endDate}</div>
						</div>
					))}
				</div>
			</main>
		</div>
	);
}
