import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import Recipe from './Recipe'
import './App.css';

const App = () => {

  const APP_ID = '42b05125'



  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('')
  const [query, setQuery] = useState('banana')

  useEffect(() => {
      getRecipes()
  }, [query])

  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${process.env.REACT_APP_API_KEY}`)
    const data = await response.json();
    setRecipes(data.hits)
  }

  const updateSearch = (e) => {
    setSearch(e.target.value)
  }

  const getSearch = (e) => {
    e.preventDefault()
    setQuery(search)
    setSearch('')
  }

  return(
    <div className="App">
      <h1 align='center'> Welcome to Meal Finder</h1>
      <p align='center'>Find a recipe on your favorite foods below:</p>
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" value={search} onChange={updateSearch}/>
        <button className="search-button" type="submit">Search!</button>
      </form>
      <div className="recipes">
      {recipes.map(recipe => (
        <Recipe key={recipe.recipe.label} 
        title={recipe.recipe.label} 
        calories={Math.trunc(recipe.recipe.calories)} 
        image={recipe.recipe.image}
        ingredients={recipe.recipe.ingredients}/>
        ))}
        </div>
    </div>
  )
}

export default App;
