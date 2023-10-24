import { Person, Education, Experience, SkillHeader, SkillItem, ExperienceItem, ExperienceBulletPts } from "../App.tsx";
import { v4 as uuidv4 } from "uuid";

interface ResumePreviewProps {
	personInfo: Person;
	educationInfo: Education;
	skillHeaderInfo: SkillHeader[];
	skillListInfo: SkillItem[];
	experienceInfo: Experience;
	expBulletPoints: ExperienceBulletPts[];
}
export default function ResumePreview({ personInfo, educationInfo, skillHeaderInfo, skillListInfo, experienceInfo, expBulletPoints }: ResumePreviewProps) {
	return (
		<div className="resume-container">
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
					<div className="education-details">
						<div className="school">{educationInfo.school}</div>
						<div className="date-container">
							<div className="startDate">{educationInfo.startDate}</div>
							<div className="endDate">{educationInfo.endDate}</div>
						</div>
						<div className="study">{educationInfo.study}</div>
						<div className="location">{educationInfo.location}</div>
					</div>
				</div>
				<div className="skill-container">
					<h1>Skills</h1>
					{skillHeaderInfo.map((category) => (
						<div className="skill-header-detail" key={category.id}>
							{category.header}:
							{skillListInfo
								.filter((info) => info.headerId === category.id)
								.map((info) => (
									<div className="skill-detail" key={info.id}>
										{info.skill}
									</div>
								))}
						</div>
					))}
				</div>
				<div className="experience-container">
					<h1>Career Experience</h1>
					{experienceInfo.map((experience: ExperienceItem, index: number) => (
						<div className={`exp-details`} key={experience.id}>
							<div className="company">{experience.company}</div>
							<div className="date-container">
								<div className="startDate">{experience.startDate}</div>
								<div className="endDate">{experience.endDate}</div>
							</div>
							<div className="position">{experience.position}</div>
							<div className="description">{experience.description}</div>
							{ expBulletPoints
								.filter(bullet => bullet.expId == experience.id)
								.map(bullet => (
									<div className="bullet-point" key={bullet.id}>{bullet.bulletPoint}</div>
								))
							}
						</div>
					))}
				</div>
			</main>
		</div>
	);
}
