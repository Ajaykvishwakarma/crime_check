import { AUTH, LOADING, FETCH_DATA  } from './actionTypes';


export const setAuth = (payload) => ({type: AUTH, payload })
export const setLoading = (payload) => ({ type: LOADING, payload})
export const setData = (payload) => ({ type: FETCH_DATA, payload})

export const fetchData = (url) => async (dispatch) => {

    dispatch(setLoading(true))
    const a = await fetch(url, {
        method : "GET"
    })
    const res = await a.json()
    const data = res;
    dispatch(setLoading(false))
    dispatch(setData(data))

}

export const deleteData = (url) => async (dispatch) => {

    dispatch(setLoading(true))
    const a = await fetch(url, {
        method : "DELETE"
    })
    const b = await fetch("https://crimescheck.herokuapp.com/posts", {
        method : "GET"
    })
    const res = await b.json()
    const data = res;
    dispatch(setLoading(false))
    dispatch(setData(data))

}
