import * as c from './constants';
import * as error from '../Constants/Errors';

export const uploadAvatarRequest = () => ({ type: c.UPLOAD_AVATAR_REQUEST });
export const uploadAvatarSuccess = data => ({ type: c.UPLOAD_AVATAR_SUCCESS, payload: data });
export const uploadAvatarFailure = error => ({ type: c.UPLOAD_AVATAR_FAILURE, payload: error })

export const setImgAvatarUrl = createAction(c.SET_IMG_AVATAR_URL);

export const uploadAvatar = () => {
    return (dispatch, getStore) => {
        const formData = new FormData();
        formData.append('file', getStore().registration.imgAvatarFile);
        dispatch(uploadAvatarRequest());

        fetch('http://localhost:8000/users/registration/uploadAvatar'
        , { method: "POST", body: formData })
        .then(response => {
            if(!response.ok) {
                return (
                    dispatch(uploadAvatarRequest())
                    , dispatch(uploadAvatarFailure(error.CODE_500_PHOTO))
                    , setTimeout(() => { dispatch(uploadAvatarFailure(false)) }, 3000) )};
            response.json()
            .then(json=> {
                dispatch(uploadAvatarSuccess(json));
                dispatch(setImgAvatarUrl({
                    img: json.img,
                    url: `http://localhost:8000/static/avatar/${json.img}`
                }
                    ))
            })
        },
            error => {
                dispatch(uploadAvatarFailure(error)), 
                setTimeout(() => { dispatch(uploadAvatarFailure("Не удалось загрузить фото. Попробуйте ещё раз")) }, 2000)})
        }
}