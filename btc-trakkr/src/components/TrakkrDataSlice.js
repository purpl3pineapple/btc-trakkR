import { createSlice } from "@reduxjs/toolkit";

export default class TrakkrDataSlice {

    #initialState;
    #name;
    #slice;
    #reducers;
    #extraReducers;

    constructor(name, initialState, reducers, extraReducers = null){

        this.#initialState = initialState;

        this.#name = name;

        this.#reducers = reducers;

        this.#extraReducers = extraReducers;

        this.#slice = createSlice({
            name: this.#name,
            initialState: this.#initialState,
            reducers: this.#reducers,
            extraReducers: this.#extraReducers === null 
            ? (builder) => {}
            : (builder) => {
                
                this.#extraReducers.forEach(extraReducer => builder.addCase(extraReducer));
            }
        });
    };

    get slice(){

        return this.#slice;
    };

    get actions(){

        return this.slice.actions;
    };

    get reducer(){

        return this.slice.reducer;
    };
};