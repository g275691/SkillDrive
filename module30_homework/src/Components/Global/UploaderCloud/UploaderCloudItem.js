import React, { useEffect, useState } from 'react';

const UploaderCloudItem = ({photo, photos, setPhotos}) => {
    const [imgLoad, setImgLoad] = useState(true);

    const deleteImg = () => {
        setPhotos(photos.filter(el => el != photo));
        document.querySelector(".fake-input").value = "";
    }

    return (
        <div className="cloud__container-photo">
            <div className="cloud__container-photo-frame">
                <img onLoad={ ()=> setImgLoad(false) }
                src={URL.createObjectURL(photo)}
               ></img>
                
                {imgLoad ? <div className="cssload-container">
                    <div className="avatar-circle" />
                    <span className="cancel-cross" 
                    onClick={ deleteImg }>
                        ×</span>
                    <div className="cssload-zenith animate"></div>
                </div> : ""}

            </div>
            <div className="cloud__container-photo-description">
                <p >{ photo.name }</p>
                <p>{ `${photo.size} Mb, ${photo.name}` }</p>
                <span className="icon-trash" 
                onClick={ deleteImg }
                >
                </span>
            </div>
        </div>
    )
}

export default UploaderCloudItem;