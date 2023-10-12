import { Person, Education } from "../App.tsx";

interface ResumePreviewProps {
    personInfo: Person;
    educationInfo: Education
}
export default function ResumePreview({ personInfo, educationInfo }: ResumePreviewProps) {
	return (
		<>
			<header>
            <div className='name'>{personInfo.name}</div>
            <div className='email'>{personInfo.email}</div>
            <div className='phone'>{personInfo.phone}</div>
         </header>
         <main>
            <div className='school'>{educationInfo.school}</div>
            <div className='study'>{educationInfo.study}</div>
            <div className='startDate'>{educationInfo.startDate}</div>
            <div className='endDate'>{educationInfo.endDate}</div>
         </main>
		</>
	);
}
