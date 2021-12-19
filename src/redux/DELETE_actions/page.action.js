const { PAGE_LOADING  } =  './index';

/**
 * @description - This function checks if the page is laoding or not
 * @param {Boolean} data 
 */
export const pageLoading = (data) => {
    console.log('Page Loaidng ', data);
    return {
        type: PAGE_LOADING,
        payload: data
    }
}
