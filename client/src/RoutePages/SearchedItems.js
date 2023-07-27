import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
export default function SearchedItems() {
  const [data, setData] = useState([]);
  const location = useLocation();
  const searchText = location.state.searchText;

  useEffect(() => {
    try {
      axios
        .get(`http://localhost:4000/api/recipes/search/${searchText}`)
        .then((res) => {
          setData(res.data);
        });
    } catch (err) {
      console.log("Error searching data: ", err);
    }
  }, [searchText]);

  const RecipeCards = data.map((recipe, index) => {
    return (
      <div
        key={recipe._id}
        className="card"
        style={{ width: "18rem", margin: "10px" }}
      >
        {recipe.image ? (
          <img src={recipe.image} className="card-img-top" alt="recipe" />
        ) : (
          <img
            src={process.env.PUBLIC_URL + "/defaultRecipe.jpg"}
            className="card-img-top"
            alt="recipe"
          />
        )}
        <div className="card-body">
          <div className="pb-3 container-fluid text-start ">
            <h6 className="card-subtitle mb-2 text-muted">{recipe.category}</h6>
            <Link
              to={`/recipe/${recipe.title}`}
              state={recipe}
              className="card-title fs-4 detail"
            >
              {recipe.title}
            </Link>
            <p className="card-text  author">{recipe.author}</p>
          </div>
        </div>
      </div>
    );
  });
  return (
    <div className="showRecipe">
      <h1 className="text-light">Recipes</h1>
      <div className=" recipies d-flex flex-row flex-wrap justify-content-center align-items-center pb-2">
        {RecipeCards}
      </div>
    </div>
  );
}
