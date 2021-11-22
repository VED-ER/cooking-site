// styles
import { Link } from "react-router-dom"
import { useTheme } from "../hooks/useTheme"
import "./RecipeList.css"
import deleteIcon from "../assets/delete_black_24dp.svg"
import { projectFirestore } from "../firebase/config"

export default function RecipeList({ recipes }) {
	const { mode } = useTheme()

	if (recipes.length === 0) {
		return <div className="error">No recipes found</div>
	}

	function handleClick(id) {
		projectFirestore.collection("recipes").doc(id).delete()
	}

	return (
		<div className="recipe-list">
			{recipes.map((recipe) => (
				<div key={recipe.id} className={`card ${mode}`}>
					<h3>{recipe.title}</h3>
					<p>{recipe.cookingTime} to make.</p>
					<div>{recipe.method.substring(0, 100)}</div>
					<Link to={`/recipe/${recipe.id}`}>Cook This</Link>
					<img
						src={deleteIcon}
						alt="delet recipe icon"
						className="delete"
						onClick={() => handleClick(recipe.id)}
					/>
				</div>
			))}
		</div>
	)
}
