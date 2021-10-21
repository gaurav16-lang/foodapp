

async function searchfood(dish) {
    let res = await fetch(
      `http://www.themealdb.com/api/json/v1/1/search.php?s=${dish}`,
    )
    let data = await res.json()
    console.log(data)
    return data
  }
  
  function appenddishes(dishes) {
      console.log(dishes)
      if (dishes === undefined) {
          return false;
      }
      let drop = document.getElementById("dropdown");
      drop.innerHTML = null;
      dishes.forEach(function(el) {
          let bigdiv = document.createElement("div");
          bigdiv.setAttribute("class", "bigdiv");
          bigdiv.addEventListener("click", function() {
              selectdish(el);
          });
          let div = document.createElement("div");
          div.setAttribute("class", "dropdiv");
          let image = document.createElement("img");
          image.src = el.strMealThumb;
          image.setAttribute("class", "dropimage")
          div.append(image);
          let div2 = document.createElement("div");
          div2.setAttribute("class", "rightdiv");

          let p = document.createElement("p");
          p.setAttribute("class", "dropdownp")
          p.innerHTML =el.strMeal;
          div2.append(p);
          bigdiv.append(div, div2)
          drop.append(bigdiv);
      });

  }

  async function main() {
    let drop = document.getElementById("dropdown");
      let dishname = document.getElementById("search").value;
      
      if (dishname.length === 0) {
          drop.style.display = "none";
      }
      if (dishname.length < 3) {
          return false;
      }

      let res = await searchfood(dishname) ;
      let dishdata = res.meals;
      console.log(dishdata)
      appenddishes(dishdata)
      console.log("res", dishdata);

  }



  function debounce(func, delay) {
    var timerid;    
    let drop = document.getElementById("dropdown");
      drop.style.display = "block";


      if (timerid) {
          clearTimeout(timerid);
      }
      timerid = setTimeout(function() {
          func();

      }, delay)
  }

  function selectdish(el){
if(localStorage.getItem("dishinfo")===null)
{
    localStorage.setItem("dishinfo",JSON.stringify([]));

}
var n =JSON.parse(localStorage.getItem("dishinfo"));
n.push(el);
localStorage.setItem("dishinfo",JSON.stringify(n));
window.location.href="latestrecepie.html"
    console.log(el);
    
  }
  export {searchfood,appenddishes,main,debounce,selectdish}
