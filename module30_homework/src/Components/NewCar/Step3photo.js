import React, { useEffect, useState } from 'react';

const Step3photo = ({photo, photosCars, setPhotosCars}) => {
    const [imgLoad, setImgLoad] = useState(true);

    return (
        <div className="cloud__container-photo">
            <div className="cloud__container-photo-frame">
                <img onLoad={ ()=> setImgLoad(false) }
                src={URL.createObjectURL(photo)}
               ></img>
                
                {imgLoad ? <div className="cssload-container">
                    <div className="avatar-circle" />
                    <span className="cancel-cross" 
                    onClick={ ()=> setPhotosCars(photosCars.filter(el => el != photo)) }>
                        ×</span>
                    <div className="cssload-zenith animate"></div>
                </div> : ""}

            </div>
            <div className="cloud__container-photo-description">
                <p >{ photo.name }</p>
                <p>{ `${photo.size} Mb, ${photo.name}` }</p>
                <span className="icon-trash" 
                onClick={ ()=> setPhotosCars(photosCars.filter(el => el != photo)) }
                >
                </span>
            </div>
        </div>
    )
}

export default Step3photo;