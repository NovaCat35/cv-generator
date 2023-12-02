/* eslint-disable @typescript-eslint/no-explicit-any */
import { Person, Education, Experience, SkillHeader, SkillItem, ExperienceItem, ExperienceBulletPts, AdditionalInfo } from "../App.tsx";
import React, {useContext} from "react";
import { ColorContext } from "../contexts/ColorContext.ts";

export interface ResumePreviewProps {
	personInfo: Person;
	educationInfo: Education;
	skillHeaderInfo: SkillHeader[];
	skillListInfo: SkillItem[];
	experienceInfo: Experience;
	expBulletPoints: ExperienceBulletPts[];
	additionalInfo: AdditionalInfo;
}
const ResumePreview = React.forwardRef((props: ResumePreviewProps, ref: any) => {
	const { personInfo, educationInfo, skillHeaderInfo, skillListInfo, experienceInfo, expBulletPoints, additionalInfo } = props;
	const { colorName, colorHeader, colorSubheader } = useContext(ColorContext);

	const nameStyle = {
		color: colorName,
	}
	const headerStyle = {
		color: colorHeader,
	}
	const headerStyleDivider = {
		background: colorHeader,
	}
	const subHeaderStyle = {
		color: colorSubheader,
	}

	return (
		<div ref={ref} id="resume-container" className="resume-container">
			<header>
				<div className="name" style={nameStyle}>{personInfo.name}</div>
				<div className="contact-info">
					<div className="top-container" style={subHeaderStyle}>
						{personInfo.email != "" && <div className="email">{personInfo.email}</div>}
						{personInfo.phone != "" && <div className="phone">{personInfo.phone}</div>}
					</div>
					<div className="bottom-container" style={subHeaderStyle}>
						{personInfo.location != "" && <div className="location">{personInfo.location}</div>}
						{personInfo.website != "" && <div className="website">{personInfo.website}</div>}
					</div>
				</div>
			</header>
			<main>
				{Object.values(educationInfo).some((value) => value.trim() !== "") && (
					<div className="education-container">
						<h1 style={headerStyle}>Education</h1>
						<div className="line-divider" style={headerStyleDivider}></div>
						<div className="education-details">
							<div style={subHeaderStyle} className="school">{educationInfo.school}</div>
							<div className="date-container">
								<div style={subHeaderStyle} className="startDate">{educationInfo.startDate}</div>
								<div style={subHeaderStyle} className="endDate">{educationInfo.endDate}</div>
							</div>
							<div className="study">{educationInfo.study}</div>
							<div className="location">{educationInfo.location}</div>
						</div>
					</div>
				)}
				{skillListInfo.length != 0 && (
					<div className="main-skill-container">
						<h1 style={headerStyle}>Skill Proficiencies</h1>
						<div className="line-divider" style={headerStyleDivider}></div>
						{skillHeaderInfo.map((category) => (
							<div className="skill-info-container" key={category.id}>
								<p style={subHeaderStyle}>{category.header}:</p>
								<div className="skill-list-container">
									{skillListInfo
										.filter((info) => info.headerId === category.id)
										.map((info) => info.skill)
										.join(", ")}
								</div>
							</div>
						))}
					</div>
				)}
				{experienceInfo.length != 0 && (
					<div className="experience-container">
						<h1 style={headerStyle}>Career Experience</h1>
						<div className="line-divider" style={headerStyleDivider}></div>
						{experienceInfo.map((experience: ExperienceItem) => (
							<div className={`exp-details`} key={experience.id}>
								<div style={subHeaderStyle} className="company">{experience.company}</div>
								<div className="date-container">
									<div style={subHeaderStyle} className="startDate">{experience.startDate}</div>
									<div style={subHeaderStyle} className="endDate">{experience.endDate}</div>
								</div>
								<div style={subHeaderStyle} className="position">{experience.position}</div>
								<div className="description">{experience.description}</div>
								{expBulletPoints
									.filter((bullet) => bullet.headerId == experience.id)
									.map((bullet) => (
										<div className="bullet-point" key={bullet.id}>
											{bullet.bulletPoint}
										</div>
									))
								}
							</div>
						))}
					</div>
				)}
				<div className="additional-info-container">
					{additionalInfo["categories"].map((category) => (
						<div className="main-category-container" key={category.id}>
							<h1 className="category-name" style={headerStyle}>{category.header}</h1>
							<div className="line-divider" style={headerStyleDivider}></div>
							{additionalInfo["subHeaders"]
								.filter((subHeader: any) => subHeader.categoryId == category.id)
								.map((subHeader: any) => (
									<div className="subheader-container" key={subHeader.id}>
										<div className="subheader-name" style={subHeaderStyle}>{subHeader.headerName}</div>
										{additionalInfo["bulletPoints"]
											.filter((bulletPt) => bulletPt.subHeaderId == subHeader.id)
											.map((bulletPt) => (
												<div className="bullet-point" key={bulletPt.id}>
													{bulletPt.bulletPoint}
												</div>
											))}
									</div>
								))}
						</div>
					))}
				</div>
			</main>
		</div>
	);
});

export default ResumePreview;
