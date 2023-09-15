import {createSlice} from '@reduxjs/toolkit';
// console.log(retrieve("theme"))
const initialState={
    theme:JSON.parse(localStorage.getItem("theme"))
}
export const themeSlice=createSlice({
    name:'theme',
    initialState,
    reducers:{
        setTheme:(state)=>{
            state.theme=!state.theme
            localStorage.setItem("theme",JSON.stringify(state.theme));  
        }
    }
})

export const {setTheme}=themeSlice.actions;
export default themeSlice.reducer