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
    //console.log(query);
    
    if (query) { 
        //2. new search object and add to the state
        state.search = new Search(query);
        
        //3. prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);
        try {
            //4. search for recipes
            await state.search.getResults();

            //5. show the results on UI
            clearLoader();
            searchView.renderResults(state.search.result);
        } catch (err){
            console.log(err);
            alert('something went wrong with the search');
            clearLoader();
        }
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
/*const test = new Recipe('47746');
test.getRecipe();
console.log(test);*/

const controlRecipe = async () => {
    const id = window.location.hash.replace('#','');
    //console.log(id);
    if (id){
        // Prepare UI for changes
        
        // Create new recipe object 
        state.recipe = new Recipe(`${id}`);
        
        
        try {
            // Get recipe data and parse ingredient
            await state.recipe.getRecipe();
            state.recipe.parseIngredient();
        } catch (err){
            alert('Error processing recipe');
            console.log(err);
        }
        // Calculate servings and time
        state.recipe.calcServings();
        state.recipe.calcTime();
        
        // Render the recipe
        console.log(state.recipe);
    }
}

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));


/*const search = new Search('pizza');
console.log(search);
search.getResults();*/