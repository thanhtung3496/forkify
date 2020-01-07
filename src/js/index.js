import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import { elements, renderLoader, clearLoader } from './views/base.js'; 

/* GLOBAL STATE of the app
** - Search object
** - Current recipe object
** - Shopping list object
** - Liked recipes
*/ 
const state = {};


/* 
** SEARCH CONTROLLER
*/
const controlSearch = async () => {
    //1. get the query from the view
    const query = searchView.getInput();
    console.log(query);
    
    if (query) { 
        //2. new search object and add to the state
        state.search = new Search(query);
        
        //3. prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);
        
        //4. search for recipes
        await state.search.getResults();
        
        //5. show the results on UI
        clearLoader();
        searchView.renderResults(state.search.result);
    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if(btn){
        const gotoPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, gotoPage);
    }
});

/* 
** RECIPE CONTROLLER
*/
const r = new Recipe(46956);
r.getRecipe();
console.log(r);


/*const search = new Search('pizza');
console.log(search);
search.getResults();*/