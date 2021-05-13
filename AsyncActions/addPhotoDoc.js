import * as c from './constants';
import * as error from '../Constants/Errors';

export const setPhotoDocRequest = () => ({ type: c.SET_PHOTO_DOC_REQUEST });
export const setPhotoDocSuccess = data => ({ type: c.SET_PHOTO_DOC_SUCCESS, payload: data });
export const setPhotoDocFailure = error => ({ type: c.SET_PHOTO_DOC_FAILURE, payload: error })
export const setPhotoDoc = createAction(c.SET_PHOTO_DOC);

export const addPhotoDoc = () => {
    return (dispatch, getStore) => {
        const formData = new FormData();
        Object.values(getStore().registration.imgDocFile).map(el => {
            formData.append('uploadDocs', el)
        })
        dispatch(setPhotoDocRequest());
        fetch('http://localhost:8000/users/registration/uploadDocs'
        , { method: "POST", 
        body: formData })
        .then(response => {
            if(!response.ok) {
                return (dispatch(setPhotoDocRequest())
                , dispatch(setPhotoDocFailure(error.CODE_500_PHOTO))
                , setTimeout(() => { dispatch(setPhotoDocFailure(false)) }, 3000) )};
            response.json()
            .then(json=> {
                dispatch(setPhotoDocSuccess(json));
                let sumDocsSize = [];
                let docsArr = [];
                
                Object.values(json).map(el => {
                    docsArr.push({
                        imgUrl:`http://localhost:8000/static/docs/${el.img}`,
                        imgName: el.img,
                        imgSize: el.size,
                        imgExt: el.extension
                    });
                })
                sumDocsSize = docsArr.concat(getStore().registration.photosDoc)
                .map(el => Number(el.imgSize))
                .reduce((accumulator, currentValue) => accumulator + currentValue ).toFixed(2);

                if(sumDocsSize > 30) return (
                    dispatch(finishRegFailure(error.VERY_SIZE_DOCS))
                    , setTimeout(() => { dispatch(finishRegFailure(false)) }, 2000)
                    );
                dispatch(setPhotoDoc(docsArr));
            })
        },
            error => {
                dispatch(setPhotoDocFailure(error.CODE_102_PHOTO)), 
                setTimeout(() => { dispatch(setPhotoDocFailure(false)) }, 2000)})
        }
}