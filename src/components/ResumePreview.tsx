import { Person, Education, Experience } from "../App.tsx";

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
					<div className="company">{experienceInfo.company}</div>
					<div className="position">{experienceInfo.position}</div>
					<div className="description">{experienceInfo.description}</div>
					<div className="startDate">{experienceInfo.startDate}</div>
					<div className="endDate">{experienceInfo.endDate}</div>
				</div>
			</main>
		</div>
	);
}
