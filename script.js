const searchbox = document.querySelector('.searchbox');
const sbtn = document.querySelector('.sbtn');
const rdetailscontent = document.querySelector('.rdetailscontent');
const rclose = document.querySelector('.rclose');
const recipe_container = document.querySelector('.recipe-container');

const fetchrecipes =async(query)=>{
    recipe_container.innerHTML="<h2>Fetching recipes.....</h2>";
    try{
        const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response=await data.json();
   /* console.log(response);*/
   recipe_container.innerHTML="";
   response.meals .forEach(meal => {
    const recipediv=document.createElement('div');
    recipediv.classList.add('recipe');
    recipediv.innerHTML=`
    <img src="${meal.strMealThumb}">
    <h3>${meal.strMeal}</h3>
    <p><span>${meal.strArea}</span> Dish</p>
    <p>Belongs to <span>${meal.strCategory}</span> Category</p>
    `
    const button= document.createElement('button');
    button.textContent="View Recipe";
    recipediv.appendChild(button);
    recipe_container.appendChild(recipediv);
    button.addEventListener('click',()=>{
        openpopup(meal);
    })
});
    }
    catch(error){
        recipe_container.innerHTML="<h2>Error in Fetching recipes.....</h2>"
    }    
}

const fetchingrediants=(meal)=>{
    let ingr="";
    for(let i=1;i<=20;i++){
        const Ingredients=meal[`strIngredient${i}`];
        if(Ingredients){
            const measure =meal[`strMeasure${i}`];
            ingr+=`<li>${measure} ${Ingredients}</li>`
        }
        else{break;}
    }
    return ingr;
}
 const openpopup=(meal)=>{
        rdetailscontent.innerHTML=`
        <h2 class="recipename">${meal.strMeal}</h2> 
        <h3>Ingredients:</h3> 
        <ul class="ingrlist">${fetchingrediants(meal)}</ul>
        <div class="instructions">
                <h3>Instructions:</h3>
                <p>${meal.strInstructions}</p> 

        </div>
        `
        
        rdetailscontent.parentElement.style.display="block";
 }
 rclose.addEventListener('click',()=>{
    rdetailscontent.parentElement.style.display="none";
 })
sbtn.addEventListener('click',(e)=>{
    e.preventDefault();
    const searchinput= searchbox.value.trim();
    
    fetchrecipes(searchinput);
    
});
