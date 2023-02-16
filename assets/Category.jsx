import React, { useReducer } from 'react';
//import { addCategory } from './actions';
import reducer from './reducer'
import AddCategory from './AddCategory';
import AddAnilistUser from './AddAnilistUser'
import userReducer from './userReducer'

export default function Category() {
  const [categories, dispatch] = useReducer(reducer, initialCategory);
  const [user, dispatched] = useReducer(userReducer, null)
  console.log(user)

  function addCategory(category) {
    dispatch({
    type: "ADD_CATEGORY",
    category: category
  });
  }

  function addTag(tag) {
    dispatch({
      type: "ADD_TAG",
      tag: tag
    });
  }

  function clear() {
    dispatch({
      type: "CLEAR"
    });
  }

  function addUser(user) {
    dispatched({
      type: "ADDED",
      user: user
    });
  }

  const display = () => {
    if(user === null) {
      return <AddAnilistUser addUserFunction={addUser} />
    }
    else {
      return <AddCategory categories={categories} addCategoryFunction={addCategory} addTagFunction={addTag} clearFunction={clear} anilistAccount ={user} />
    }
  }

  return (
    <div className= 'container'>
      <div className= 'banner'>
        <h1>Anilist Auto-Searcher</h1>
        <p>Find your next anime to Watch!!</p>
      </div>
      {display()}
    </div>
  );
}


const initialCategory = { categories: ["Comedy", "Romance", "Drama", "Mystery"] ,tags: ["Parody", "Shounen"], newCategory: [], newTag: [], result: false};
