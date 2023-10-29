import { useState } from "react";
import { Input } from "./Input.tsx";
import { HandleChange, AdditionalInfo, HandleListRemove, Category, BulletPoint, SubHeader } from "../App.tsx";
import Header from "./Header.tsx";
import FormButtons from "./FormButtons.tsx";
import CardList from "./CardList.tsx";
import InputCards from "./InputCards.tsx";
import ErrorText from "./ErrorText.tsx";
import BannerOptions from "./BannerOptions.tsx";
import infoSvg from "../assets/info.svg";
import { v4 as uuidv4 } from "uuid";

interface AdditionalFormProps {
	isActive: boolean;
	onExpand: (param: number) => void;
	currState: AdditionalInfo;
	setState: React.Dispatch<React.SetStateAction<any>>;
   handleRemoveChange: (date: HandleListRemove) => void;
}

interface MainInfo {
   id: string;
   categoryName: string;
   subHeaders: SubHeader[];
   bulletPoints: BulletPoint[];
}

export default function AdditionalForm({ isActive, onExpand, currState, setState, handleRemoveChange }: AdditionalFormProps) {
	const initMainInfo = {
      id: "",
		categoryName: "",
		subHeaders: [],
		bulletPoints: [],
	};
   const initSubHeader = {
      id: '',
      categoryId: '',
      headerName: '',
   }
   const initBulletPoint = {
      id: '',
      subHeaderId: '',
      bulletPoint: '',
   }
	const [currMainInfo, setCurrMainInfo] = useState<MainInfo>(initMainInfo);
	const [currSubHeader, setCurrSubHeader] = useState(initSubHeader);
	const [currBulletPt, setCurrBulletPt] = useState(initBulletPoint);
	const [showForm, setShowForm] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [errorAlert, setErrorAlert] = useState(false);

	const handleExpandClick = () => {
		isActive ? onExpand(-1) : onExpand(4);
	};

   // When input is changed, we should update our curr info values before we update directly the mainInfo
	const onChangeInputInfo = ({ value, keyName, setState, currState}: HandleChange) => {
		setState({ ...currState, [keyName]: value });
	};

	const handleSubmit = () => {
		return;
	};

   const removeBulletCard = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		const targetID = (e.currentTarget.parentNode as HTMLElement).getAttribute("id");
		if (targetID !== null) {
			const newSkillList = currMainInfo['bulletPoints'].filter((bullet) => bullet.id != targetID);
			setCurrMainInfo({...currMainInfo, bulletPoints: newSkillList});
		} else {
			console.error("Error: Target ID is null.");
		}
	};

   const onChangeBulletPt = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = e.target.value;
		setCurrBulletPt({ ...currBulletPt, bulletPoint: newValue });
	};

   /**
    * We need to pair bulletPoint to their specific subHeader, 
    * We thus keep a record of the currSubHeader.id if there is one, otherwise we can't add the bulletPoint to any empty subHeader!!
    * In addition, the headerName will determine the grouping of each bulletPt
    */
   const onAddBulletPtToList = () => {
      if(currSubHeader.headerName != '') {
         const updatedSubID= setSubHeaderID(); // first we populate the id 
         const newBulletPt: BulletPoint = {
            id: uuidv4(),
            subHeaderId: updatedSubID,
            bulletPoint: currBulletPt.bulletPoint,
         };
         console.log(currSubHeader.id)
        // Creating a new array with the updated bullet points
        const updatedBulletPoints: BulletPoint[] = [...currMainInfo.bulletPoints, newBulletPt];

         // Can't add an empty bullet point
         if (newBulletPt.bulletPoint != "") {
            setCurrMainInfo((prevState) => ({...prevState, bulletPoints: updatedBulletPoints}));
            // Reset below, we don't use resetInit since we don't want to reset entire form info
            setCurrBulletPt(initBulletPoint);
            setErrorMessage("");
         } else {
            setErrorMessage("Can't add an empty bullet points!");
            setErrorAlert(true);
         }
      } else {
         setErrorMessage("Please specify the subheader.");
         setErrorAlert(true);
      }
	};

   /**
    * Case 1: subheader's name already exist, reuse ID found in currMainInfo for our current subheader
    * Case 2: new subheader, create a new ID for our current subheader & add to list
    */
   function setSubHeaderID() {
      const subHeaderFound = currMainInfo['subHeaders'].find(subHeader => subHeader.name == currSubHeader.headerName)
      if(subHeaderFound) {
         // setCurrSubHeader({...currSubHeader, id: subHeaderFound.id})
         return subHeaderFound.id;
      } else {
         const newSubHeader = { id: uuidv4(), name: currSubHeader.headerName, categoryId: currMainInfo.id };
         const newSubHeaderList = [...currMainInfo.subHeaders, newSubHeader];
         // I'm using prevState since we'll need to use the setCurrMainInfo again for adding bulletPt in onAddBulletPtToList()
         setCurrMainInfo((prevState) => ({ ...prevState, subHeaders: newSubHeaderList })); 

         // setCurrSubHeader({ ...currSubHeader, id: newSubHeader.id });
         return newSubHeader.id;
      }
   }


	const handleSeeExpClick = (e: React.MouseEvent<HTMLDivElement>) => {
		const targetId = e.currentTarget.getAttribute("id");

		// Repopulate all "Curr" info base on information from currState if the ID match
		const targetCategory:Category | undefined = currState['categories'].find((category) => category.id == targetId);
      const targetSubHeaders = currState['subHeaders'].filter((subHeader) => subHeader.categoryId == targetId);
      const targetBulletPts = currState['bulletPoints'].filter((bulletPt) => {
         return targetSubHeaders.find(subHeader => subHeader.id === bulletPt.subHeaderId)
      })

      // Check if the category is defined before accessing its properties
      if (targetCategory) {
         setCurrMainInfo({ ...currMainInfo, id:targetCategory.id, categoryName: targetCategory.header, subHeaders: targetSubHeaders, bulletPoints: targetBulletPts});
         setShowForm(true);
      } else {
         console.error(`Category with ID ${targetId} not found.`);
      }
		setShowForm(true);
	};

	const handleAddExpClick = () => {
		setShowForm(true);
	};

   const handleCancelClick = () => {
		resetInit();
		setShowForm(false);
	};

   // In order to removes the info banner from the main page and resume preview, we pass in an unique typeId to target the category header
	const removeInfo = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		const targetID = (e.currentTarget.parentNode as HTMLElement).getAttribute("id");
		if (targetID !== null) {
			handleRemoveChange({ setState: setState, currState: currState, targetId: targetID, typeId: 'categoryId' });
		} else {
			console.error("Error: Target ID is null.");
		}
	};

   const resetInit = () => {
		setCurrMainInfo(initMainInfo);
		setErrorMessage("");
	};

	return (
		<div className={isActive ? "form-container active" : "form-container"}>
			<Header name="Other Info" isActive={isActive} handleExpandClick={handleExpandClick} imgSrc={infoSvg} />
			{showForm ? (
				<form onSubmit={handleSubmit}>
					<Input label="Category Name" keyName="category" placeholder="Company Name" onChange={onChangeInputInfo} setState={setCurrMainInfo} currState={currMainInfo} propValue={currMainInfo.categoryName} required={true} />

					<CardList type='subheader' currSubHeaderList={currMainInfo.subHeaders} currBulletList={currMainInfo.bulletPoints} mainName="additional-info" handleRemoveCard={removeBulletCard} />
               <div className="subheader-container bullet-pt-container">
                  <div className="connector"></div>
                  <div className="inputs-container">
                     <Input label="Subheader" keyName="headerName" placeholder="Add Name" onChange={onChangeInputInfo} setState={setCurrSubHeader} currState={currSubHeader} propValue={currBulletPt.bulletPoint} />
                     <InputCards type="additional-info" currState={currBulletPt} onChange={onChangeBulletPt} onAddToList={onAddBulletPtToList} />
                  </div>
               </div>
					{errorMessage && <ErrorText errorMessage={errorMessage} alertStatus={errorAlert} setAlert={(status) => setErrorAlert(status)} />}

					<FormButtons handleCancelClick={handleCancelClick} />
				</form>
			) : (
				<BannerOptions mainName="info-container" type="additionalInfo" currState={currState["categories"]} handleSeeBanner={handleSeeExpClick} handleAddClick={handleAddExpClick} handleRemoveClick={removeInfo} />
			)}
		</div>
	);
}
