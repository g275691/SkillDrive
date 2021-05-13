export const onSubmitGET = (url, req, success, failure) => {
    return (dispatch) => {
        dispatch(req());
        fetch(url)
        .then(response => {
            
            if(!response.ok) {
                return (dispatch(req())
                , dispatch(failure())
                , setTimeout(() => { dispatch(failure()) }, 2000) )};
            dispatch(success(response)) },
            error => {dispatch(failure(error)), 
                setTimeout(() => { dispatch(failure()) }, 2000)})
        }
}