
// clasess
class TheMain {
    constructor() {
        this.homeSlid();
    }
    async getHomeApi() {
        document.querySelector(".loading").classList.remove("d-none");
        const myhttp = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=");
        const response = await myhttp.json();
        this.displayHomeApi(response.meals);
        console.log(response.meals);
        this.homeSlid();
        document.querySelector(".loading").classList.add("d-none");
        this.LoopOfCard();
        console.log("hady ayman");

    }
    displayHomeApi(data) {
        let HomeBox = "";
        for (let i = 0; i < data.length; i++) {
            HomeBox += `
                <div class=" TheCard col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12 my-4" id-meal="${data[i].idMeal}">
                <div class="card-inner  shadow-lg  ">
                    <picture>
                        <img src="${data[i].strMealThumb}" alt="meal">
                    </picture>
                    <div class="card-outer text-black bg-white p-2">
                        <h1>${data[i].strMeal}</h1>
                    </div>
                </div>

            </div>
                `
        }
        document.querySelector("main .Box").classList.remove("d-none");
        document.querySelector("main .container .row").innerHTML = HomeBox;
    }
    async getDetailsApi(id) {
        document.querySelector(".loading").classList.remove("d-none");
        const myhttp = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        const respone = await myhttp.json();
        console.log(respone.meals[0]);
        this.displayHomeDetailsApi(respone.meals[0]);
        document.querySelector(".loading").classList.add("d-none");
        this.homeSlid();

    }
    displayHomeDetailsApi(data) {
        const HomeBox = `
        <div class="col-xl-4 col-lg-5 TheCard ">
        <img class="w-100" src="${data.strMealThumb}"
            alt="meal">
        <h3 class="mt-3">${data.strMeal}</h3>
    </div>
    <div class="col-xl-8 col-lg-7 TheCard">
        <h3>Instructions</h3>
        <p>${data.strInstructions}</p>
        <h3>Area : <span>${data.strArea}</span></h3>
        <h3>Category : <span>${data.strCategory}</span></h3>
        <h3>Recipes :</h3>
        <div class="recipes d-flex flex-wrap gap-2">
            <p> ${data.strMeasure1}</p>
            <p> ${data.strMeasure2}</p>
            <p> ${data.strMeasure3}</p>
            <p> ${data.strMeasure4}</p>
            <p> ${data.strMeasure5}</p>
            <p> ${data.strMeasure6}</p>
            <p> ${data.strMeasure7}</p>
            <p> ${data.strMeasure8}</p>

        </div>
        <h3>Tags:</h3>
        <div class="recipes d-flex flex-wrap gap-2">
            <p>${data.strTags}</p>
        </div>
        <a href="${data.strSource}" target="_blank" class="btn btn-primary">Source</a>
        <a href="${data.strYoutube}" target="_blank" class="btn btn-secondary">Youtube</a>
    </div>

        `
        // $(".category-sec").addClass("d-none");
        // $(".meal-detailes").removeClass("d-none");
        document.querySelector("main .search-sec").classList.add("d-none")
        document.querySelector("main .container .row").innerHTML = HomeBox;
    }
    LoopOfCard() {
        let numCard = document.querySelectorAll(".TheCard");
        let CardId;
        for (let i = 0; i < numCard.length; i++) {
            numCard[i].addEventListener("click", () => {
                CardId = numCard[i].getAttribute("id-meal");
                this.getDetailsApi(CardId);
                console.log(CardId);
                return CardId;
            })
        }

    }
    homeSlid() {
        $(".TheCard").fadeIn(4000);
    }
}

class Categories {

    constructor() {
        this.getCategoryApi();
        
    }
    async getCategoryApi() {
        document.querySelector(".loading").classList.remove("d-none");
        const myhttp = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
        const response = await myhttp.json();
        console.log(response.categories);
        this.displayCategoryApi(response.categories);
        document.querySelector(".loading").classList.add("d-none");
        this.homeSlid();
        this.LoopOfMeal();
    }

    displayCategoryApi(data) {
        let CategoryBox = ``;
        for (let i = 0; i < data.length; i++) {
            CategoryBox += `
                <div class=" TheCard col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12 my-4" meal-name="${data[i].strCategory}">
                <div class="card-inner  shadow-lg  ">
                    <picture>
                        <img src="${data[i].strCategoryThumb}" alt="meal">
                    </picture>
                    <div class="card-outer text-black bg-white p-2">
                        <h1>${data[i].strCategory}</h1>
                        <p>${data[i].strCategoryDescription}</p>
                    </div>
                </div>

            </div>
                
                `
        }
        document.querySelector("main .container .row").innerHTML = CategoryBox;

    }
    async getCategoryDetailesApi(mealName) {
        document.querySelector(".loading").classList.remove("d-none");
        const myHttp = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${mealName}`);
        const respone = await myHttp.json();
        console.log(respone.meals);
        this.displayAllCategories(respone.meals);
        this.LoopOf();
         this.homeSlid();
        document.querySelector(".loading").classList.add("d-none");
       
    }

    displayAllCategories(data) {
        let CategoryBox = ``;
        for (let i = 0; i < data.length; i++) {
            CategoryBox += `
                
        <div class=" TheCard col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12 my-4" id-meal="${data[i].idMeal}">
        <div class="card-inner  shadow-lg  ">
            <picture>
                <img src="${data[i].strMealThumb}" alt="meal">
            </picture>
            <div class="card-outer text-black bg-white p-2">
                <h1>${data[i].strMeal}</h1>
                
            </div>
        </div>
    </div>
                `
        }
        $(".category-sec .row").addClass("d-none");
        document.querySelector("main .container .row").innerHTML = CategoryBox;

    }
    LoopOfMeal() {
        let numCard = document.querySelectorAll(".TheCard");
        for (let i = 0; i < numCard.length; i++) {
            numCard[i].addEventListener("click", () => {
                let CardMeal = numCard[i].getAttribute("meal-name");
                this.getCategoryDetailesApi(CardMeal);
            })
        }
    }
    LoopOf() {
        let numCard = document.querySelectorAll(".TheCard");
        for (let i = 0; i < numCard.length; i++) {
            numCard[i].addEventListener("click", () => {
                let CardId = numCard[i].getAttribute("id-meal");
                console.log(CardId);
                this.getdetailsApi(CardId);
                // this.getdetailsApi(CardId);
            })
        }
    }
    async getdetailsApi(id) {
        document.querySelector(".loading").classList.remove("d-none");
        const myhttp = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        const respone = await myhttp.json();
        console.log(respone.meals[0]);
        this.displayCategoryDetailsApi(respone.meals[0]);
        this.homeSlid();
        document.querySelector(".loading").classList.add("d-none");
    }
    displayCategoryDetailsApi(data) {
        const HomeBox = `
       
       <div class="col-xl-4 col-lg-5  ">
       <img class="w-100" src="${data.strMealThumb}"
           alt="meal">
       <h3 class="mt-3">${data.strMeal}</h3>
   </div>
   <div class="col-xl-8 col-lg-7">
       <h3>Instructions</h3>
       <p>${data.strInstructions}</p>
       <h3>Area : <span>${data.strArea}</span></h3>
       <h3>Category : <span>${data.strCategory}</span></h3>
       <h3>Recipes :</h3>
       <div class="recipes d-flex flex-wrap gap-2">
           <p> ${data.strMeasure1}</p>
           <p> ${data.strMeasure2}</p>
           <p> ${data.strMeasure3}</p>
           <p> ${data.strMeasure4}</p>
           <p> ${data.strMeasure5}</p>
           <p> ${data.strMeasure6}</p>
           <p> ${data.strMeasure7}</p>
           <p> ${data.strMeasure8}</p>

       </div>
       <h3>Tags:</h3>
       <div class="recipes d-flex flex-wrap gap-2">
           <p>${data.strTags}</p>
           </div>
           <a href="${data.strSource}" target="_blank" class="btn btn-primary">Source</a>
           <a href="${data.strYoutube}" target="_blank" class="btn btn-secondary">Youtube</a>
           </div>
           `
        document.querySelector("main .container .row").innerHTML = HomeBox;
    }
    homeSlid() {
        $(".TheCard").fadeIn(4000);
    }
}

class Area extends TheMain {
    constructor() {
        super();

    }
    async GetAreaApi() {
      document.querySelector(".loading").classList.remove("d-none");
        const myHttp = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
        const respone = await myHttp.json();
        console.log(respone.meals);
        this.displayAreaApi(respone.meals);
        this.homeSlid();
        this.LoopOfName();
         document.querySelector(".loading").classList.add("d-none");
    }
    displayAreaApi(data) {
        let HomeBox = "";
        for (let i = 0; i < data.length; i++) {
            HomeBox += `
                <div class="col-xl-3 TheCard col-lg-4 col-md-6 col-sm-12 col-12 my-5" area-name="${data[i].strArea}" >
                <div class="card-inn text-center my-3 p-3 ">
                    <i class="fa-solid fa-earth-americas   fa-bounce"></i>
                    <h3 class="mt-3">${data[i].strArea}</h3>
                </div>
            </div>
                `
        }

        document.querySelector("main .container .row").innerHTML = HomeBox;


    }
    LoopOfName() {
        let numCard = document.querySelectorAll(".TheCard");
        for (let i = 0; i < numCard.length; i++) {
            numCard[i].addEventListener("click", () => {
                let AreaName = numCard[i].getAttribute("area-name");
                console.log(AreaName);
                this.GetAreaDetailsApi(AreaName);
                return AreaName;
            })
        }
    }
    async GetAreaDetailsApi(Area) {
        const myHttp = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${Area}`);
        const respone = await myHttp.json();
        console.log(respone.meals);
        this.displayHomeApi(respone.meals);
         this.homeSlid();
        this.LoopOfCard();
    }


}

class ingredients extends Area {
    constructor() {
        super()
        this.GetIngredientsApi();
    }

    async GetIngredientsApi() {
      document.querySelector(".loading").classList.remove("d-none");
        const myHttp = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
        const respone = await myHttp.json();
        console.log(respone.meals);
        this.displayIngredientsApi(respone.meals);
        this.LoopOfMealName();
        this.homeSlid();
         document.querySelector(".loading").classList.add("d-none");

    }

    displayIngredientsApi(data) {
        let HomeBox = "";
        for (let i = 0; i < data.length; i++) {
            if (data[i].strDescription !== null) {
                HomeBox += `
            <div class="col-xl-3 overflow-hidden TheCard  col-lg-4 col-md-6 col-sm-12 col-12 my-5"  area-name="${data[i].strIngredient}">
            <div class="card-inn text-center my-3 p-3 ">
                <i class="fa-solid fa-burger fa-beat-fade"></i>
                <h3 class="mt-3">${data[i].strIngredient}</h3>
                <p class="mt-3 ">  ${data[i].strDescription} </p>

            </div>
        </div>
            `
                document.querySelector("main .container .row").innerHTML = HomeBox;
            }
        }

    }

    async GetIngredientsMealApi(data) {
     document.querySelector(".loading").classList.remove("d-none");
        const myHttp = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${data}`);
        const respone = await myHttp.json();
        console.log(respone.meals);
        this.displayHomeApi(respone.meals);
        this.LoopOfCard();
        this.homeSlid();
         document.querySelector(".loading").classList.add("d-none");

    }
    LoopOfMealName() {
        let numCard = document.querySelectorAll(".TheCard");
        for (let i = 0; i < numCard.length; i++) {
            numCard[i].addEventListener("click", () => {
                let AreaName = numCard[i].getAttribute("area-name");
                console.log(AreaName);
                this.GetIngredientsMealApi(AreaName);
            })
        }
    }


}
class search extends TheMain {
    constructor() {
        super();
        this.displaySearch();
        this.Term();

    }

    displaySearch() {
        const SearchBox = `
        
        <div class="my-3 w-75">
        <input type="search" class="form-control " id="searchByName"
            placeholder="Search By name"  >
    </div>
        `
        document.querySelector("main .search-sec").innerHTML = SearchBox;
        document.querySelector("main .Box").classList.add("d-none");
    }

    Term() {
        const searchInput = document.getElementById('searchByName');
        searchInput.addEventListener("keyup", () => {
            if (searchInput.value !== " ") {
                let term = searchInput.value;
                this.getApi(term.toLowerCase());
            } else {
                console.log("its space");
            }
        })
    }

    async getApi(data) {
    
        const myHttp = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${data}`);
        const respone = await myHttp.json();
        console.log(respone.meals);
        this.displayHomeApi(respone.meals);
        this.LoopOfCard();
        this.homeSlid();
       
    }

}
// functions 
function navSlide() {
    let navStatus = false;
    $(".nav-icon").on("click", function () {
        if (navStatus == false) {
            $(".nav-content").animate({ width: "250px", padding: "16px" }, 1100);
            $(".nav-icon").removeClass("fa-bars-staggered").addClass("fa-x");
            $('.nav-links').slideDown(2000);
            $(".nav-footer").slideDown(1500);
            navStatus = true;
        } else {
            $(".nav-content").animate({ width: "-250px", padding: "-16px" }, 1100);
            $(".nav-icon").removeClass("fa-x").addClass("fa-bars-staggered");
            $('.nav-links').slideUp(2000);
            $(".nav-footer").slideUp(2000);

            navStatus = false;
        }
    })

}
navSlide();



// app varp
let hady = new TheMain();
hady.getHomeApi();

const category = document.getElementById("category");
const pic = document.querySelector(".nav-items picture img");
const Areaa = document.getElementById("Area");
const ingredient = document.getElementById('ingredient');
const Search = document.getElementById('search')

// events   
category.addEventListener("click", function () {
    const hady2 = new Categories();
    document.querySelector("main .search-sec").classList.add("d-none");
});

pic.addEventListener("click", function () {
    hady.getHomeApi();
    document.querySelector("main .search-sec").classList.add("d-none");
});

Areaa.addEventListener("click", function () {
    const hady3 = new Area();
    hady3.GetAreaApi();
    document.querySelector("main .search-sec").classList.add("d-none");
})
ingredient.addEventListener("click", function () {
    const hady4 = new ingredients();
    document.querySelector("main .search-sec").classList.add("d-none");
    
})

Search.addEventListener("click", function () {
    const hady5 = new search();
    document.querySelector("main .search-sec").classList.remove("d-none");
})




