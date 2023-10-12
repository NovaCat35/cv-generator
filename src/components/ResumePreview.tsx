import { Person } from "../App.tsx";

export default function ResumePreview({ personInfo }: { personInfo: Person }) {
	return (
		<>
			<header>
            <div className='name'>{personInfo.name}</div>
            <div className='email'>{personInfo.email}</div>
            <div className='phone'>{personInfo.phone}</div>
         </header>
         <main>
            
         </main>
		</>
	);
}
