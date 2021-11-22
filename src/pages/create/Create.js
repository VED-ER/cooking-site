import { useRef, useState } from "react"
import { useHistory } from "react-router"
import { projectFirestore } from "../../firebase/config"
import "./Create.css"
import { useTheme } from "../../hooks/useTheme"

export default function Create() {
	const [title, setTitle] = useState("")
	const [method, setMethod] = useState("")
	const [cookingTime, setCookingTime] = useState(1)
	const [newIngredient, setNewIngredient] = useState("")
	const [ingredients, setIngredients] = useState([])
	const ingredientInput = useRef(null)
	const history = useHistory()
	const { mode } = useTheme()

	async function handleSubmit(e) {
		e.preventDefault()
		const doc = {
			title,
			ingredients,
			method,
			cookingTime: cookingTime + " minutes",
		}
		try {
			await projectFirestore.collection("recipes").add(doc)
			history.push("/")
		} catch (err) {
			console.log(err)
		}
	}

	function handleAdd(e) {
		e.preventDefault()
		const ing = newIngredient.trim()

		if (ing && !ingredients.includes(ing)) {
			setIngredients((prevIngredients) => [...prevIngredients, ing])
		}

		setNewIngredient("")
		ingredientInput.current.focus()
	}

	return (
		<div className="create">
			<h2 className={`page-title ${mode}`}>Add A New Recipe</h2>

			<form onSubmit={handleSubmit}>
				<label>
					<span className={mode}>Recipe Title:</span>
					<input type="text" onChange={(e) => setTitle(e.target.value)} value={title} required />
				</label>

				<label>
					<span className={mode}>Recipe Ingredients:</span>
					<div className="ingredients">
						<input
							type="text"
							onChange={(e) => setNewIngredient(e.target.value)}
							value={newIngredient}
							ref={ingredientInput}
						/>
						<button onClick={handleAdd} className="btn">
							add
						</button>
					</div>
				</label>
				<p className={mode}>
					Current ingredients:
					{ingredients.map((ing) => (
						<em key={ing}>{ing}, </em>
					))}
				</p>

				<label>
					<span className={mode}>Recipe method:</span>
					<input type="text" onChange={(e) => setMethod(e.target.value)} value={method} required />
				</label>

				<label>
					<span className={mode}>Cooking Time (minutes)</span>
					<input
						type="number"
						onChange={(e) => setCookingTime(e.target.value)}
						value={cookingTime}
						min="1"
					/>
				</label>

				<button>Submit</button>
			</form>
		</div>
	)
}
