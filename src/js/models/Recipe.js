import axios from 'axios';

export default class Recipe {
    constructor(rId){
        this.rId = rId;
    }
    async getRecipe(){
        try {
            const result = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.rId}`);
            this.title = result.data.recipe.title;
            this.author = result.data.recipe.publisher;
            this.image = result.data.recipe.image_url;
            this.url = result.data.recipe.source_url;
            this.ingredients = result.data.recipe.ingredients;
        } catch (error){
            console.log(error);
            alert("Something went wrong!");
        }
    }
    
    calcTime() {
        // Assume that we need 15mins for 3 ingredients
        const numIng = this.ingredients.length;
        this.time = Math.ceil(numIng/3) * 5;
    }
    
    calcServings() {
        this.servings = 4;
    }
}