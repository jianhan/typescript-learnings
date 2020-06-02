/*
 * @Author: your name
 * @Date: 2020-06-02 23:02:15
 * @LastEditTime: 2020-06-02 23:37:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /typescript-learnings/effective_typescript/item28.ts
 */

/**Item 28: Prefer Types That Always Represent Valid States */

/***Things to Remember
• Types that represent both valid and invalid states are likely to lead to confusing
and error-prone code.
• Prefer types that only represent valid states. Even if they are longer or harder to
express, they will save you time and pain in the end! */

/***Suppose you’re building a web application that lets you select a page, loads the con‐
tent of that page, and then displays it */

// Bad design
interface State {
    pageText: string;
    isLoading: boolean;
    error?: string;
}

// render page function
function renderPage(state: State) {
    if (state.error) {
        return `Error! Unable to load ${currentPage}: ${state.error}`;
    } else if (state.isLoading) {
        return `Loading ${currentPage}...`;
    }
    return `<h1>${currentPage}</h1>\n${state.pageText}`;
}

// change page function
async function changePage(state: State, newPage: string) {
    state.isLoading = true;
    try {
        const response = await fetch(getUrlForPage(newPage));
        if (!response.ok) {
            throw new Error(`Unable to load ${newPage}: ${response.statusText}`);
        }
        const text = await response.text();
        state.isLoading = false;
        state.pageText = text;
    } catch (e) {
        state.error = '' + e;
    }
}

/***The problem is that the state includes both too little information (which request
failed? which is loading?) and too much: the State type allows both isLoading and
error to be set, even though this represents an invalid state. This makes both
render() and changePage() impossible to implement well. */

// Better implementation

// ## notice how each Request** interface represent a valid state ? this is the key
// it used tagged union

// this represent pending state and no error message nor page text
interface RequestPending {
    state: 'pending';
}

// this represent error state with error string
interface RequestError {
    state: 'error';
    error: string;
}

// this represent success state, which contains page text also
interface RequestSuccess {
    state: 'ok';
    pageText: string;
}

// tagged / discriminated union to represent state with one type
type RequestState = RequestPending | RequestError | RequestSuccess;

interface State {
    currentPage: string;
    requests: { [page: string]: RequestState };
}

function renderPage(state: State) {
    const { currentPage } = state;
    const requestState = state.requests[currentPage];
    switch (requestState.state) {
        case 'pending':
            return `Loading ${currentPage}...`;
        case 'error':
            return `Error! Unable to load ${currentPage}: ${requestState.error}`;
        case 'ok':
            return `<h1>${currentPage}</h1>\n${requestState.pageText}`;
    }
}
async function changePage(state: State, newPage: string) {
    state.requests[newPage] = { state: 'pending' };
    state.currentPage = newPage;
    try {
        const response = await fetch(getUrlForPage(newPage));
        if (!response.ok) {
            throw new Error(`Unable to load ${newPage}: ${response.statusText}`);
        }
        const pageText = await response.text();
        state.requests[newPage] = { state: 'ok', pageText };
    } catch (e) {
        state.requests[newPage] = { state: 'error', error: '' + e };
    }
}

/***The ambiguity from the first implementation is entirely gone: it’s clear what the cur‐
rent page is, and every request is in exactly one state. If the user changes the page
after a request has been issued, that’s no problem either. The old request still com‐
pletes, but it doesn’t affect the UI. */