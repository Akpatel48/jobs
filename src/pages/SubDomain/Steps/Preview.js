import React from 'react'
import FillDetails from './FillDetails';
import FillWebForm from './FillWebForm';
import CompleteAssesment from './CompleteAssesment';

function Preview({userresumes}) {
    return (
        <div className='ApplicationSteps' style={{display:"flex",flexDirection:"column" }}>
            <h2 style={{marginLeft:"auto",marginRight:"auto"}}>Preview</h2>
            <FillDetails disabled={true} userresume={userresumes} />
            {/* <FillWebForm disabled={true}/> */}
            {localStorage?.getItem("assesment") !== "null" && (
                <CompleteAssesment disabled={true}/>
            )}
        </div>
    )
}

export default Preview