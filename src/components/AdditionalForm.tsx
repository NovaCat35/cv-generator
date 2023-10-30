import { useState } from "react";
import { Input } from "./Input.tsx";
import { HandleChange, AdditionalInfo, HandleListRemove, HandleAdditionalInfoUpdate, Category, BulletPoint, SubHeader } from "../App.tsx";
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
   handleSubmitCategory: (date: HandleAdditionalInfoUpdate) => void;
}

interface MainInfo {
   id: string;
   categoryName: string;
   subHeaders: SubHeader[];
   bulletPoints: BulletPoint[];
}

export default function AdditionalForm({ isActive, onExpand, currState, setState, handleRemoveChange, handleSubmitCategory }: AdditionalFormProps) {
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
      bulletPointIds: [],
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

	const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();

      if (currMainInfo['subHeaders'].length > 0) {
			handleSubmitCategory({ setState, currState, targetId: currMainInfo.id, newElement: currMainInfo });
			setShowForm(false);
         resetInit();
		} else {
			setErrorMessage("Please add some info!");
			setErrorAlert(true);
		}
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
    * We thus keep a record of the currSubHeader.id if there is one, otherwise we make a new subheader since we can't add the bulletPoint to any empty subHeader!!
    * In addition, the headerName will determine the grouping of each bulletPt
    */
   const onAddBulletPtToList = () => {
      if(currSubHeader.headerName != '') {
         // we either find a current subheader or make a new subheader & get back the proper ID
         const targetSubheader= setAndUpdateSubheaderID(); 
         const newBulletPt: BulletPoint = {
            id: uuidv4(),
            subHeaderId: targetSubheader.id,
            bulletPoint: currBulletPt.bulletPoint,
         };

         // Update our target subheader's bulletPointIds list
         updateBulletListID(targetSubheader, newBulletPt.id);
         
         // Can't add an empty bullet point
         if (newBulletPt.bulletPoint != "") {
            const newBulletPtList: BulletPoint[] = [...currMainInfo.bulletPoints, newBulletPt];
            setCurrMainInfo((prevState) => ({...prevState, bulletPoints: newBulletPtList}));
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
   function setAndUpdateSubheaderID() {
      const subHeaderFound = currMainInfo['subHeaders'].find(subHeader => subHeader.headerName == currSubHeader.headerName)
      if(subHeaderFound) {
         // return subHeaderFound.id;
         return subHeaderFound;
      } 
      // Create a new subheader if we can't find an existing one
      else {
         const newSubHeader = { id: uuidv4(), headerName: currSubHeader.headerName, categoryId: currMainInfo.id, bulletPointIds:[] };
         const newSubHeaderList = [...currMainInfo.subHeaders, newSubHeader];
         // I'm using prevState since we'll need to use the infos in setCurrMainInfo again when we callback to other functions
         // setCurrMainInfo((prevState) => ({ ...prevState, subHeaders: [...prevState.subHeaders, newSubHeader] })); 
         // return newSubHeader.id;
         return newSubHeader;
      }
   }

   /**
    * Goal is to fill out the bulletListId in targetSubheader.
    * We have to use targetSubheader's id to look for available subheader, otherwise we make a new one
    */
   function updateBulletListID(targetSubheader: SubHeader, currBulletID: string) {
      let subheaderFound = false; // keeps track of existing subheader

      // Attempt to find the subheader and add the new bulletList
      const updatedSubheaderList = currMainInfo['subHeaders'].map((subheader) => {
         if(subheader.id == targetSubheader.id) {
            subheaderFound = true;
            return { ...targetSubheader, bulletPointIds: [...subheader.bulletPointIds, currBulletID] };
         }
         return subheader;
      })

      // If we still don't have a subheader found, make a new one with the curr bulletPt ID added to its list
      if (!subheaderFound) {
         // Create a new subheader with the provided currBulletID
         const newSubheader: SubHeader = {
            ...targetSubheader,
            bulletPointIds: [currBulletID],
         };
         updatedSubheaderList.push(newSubheader);
      }
      console.log(updatedSubheaderList)
      setCurrMainInfo((prevState) => ({ ...prevState, subHeaders: [...updatedSubheaderList] })); 
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

	const handleAddInfoClick = () => {
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
		setCurrSubHeader(initSubHeader);
		setCurrBulletPt(initBulletPoint);
		setErrorMessage("");
	};

	return (
		<div className={isActive ? "form-container active" : "form-container"}>
			<Header name="Other Info" isActive={isActive} handleExpandClick={handleExpandClick} imgSrc={infoSvg} />
			{showForm ? (
				<form onSubmit={handleSubmit}>
					<Input label="Category Name" keyName="categoryName" placeholder="Company Name" onChange={onChangeInputInfo} setState={setCurrMainInfo} currState={currMainInfo} propValue={currMainInfo.categoryName} required={true} />

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
				<BannerOptions mainName="info-container" type="additionalInfo" currState={currState["categories"]} handleSeeBanner={handleSeeExpClick} handleAddClick={handleAddInfoClick} handleRemoveClick={removeInfo} />
			)}
		</div>
	);
}
