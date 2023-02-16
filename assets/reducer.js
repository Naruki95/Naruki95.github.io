import { ADD_CATEGORY } from "./actions";

const _defaultState = []

export default function reducer(oldState, action) {
  var result
  if((oldState.newCategory.length + oldState.newTag.length) > 2){
    result = true
  }
  else {
    result = oldState.result
  }
  switch (action.type) {
    case "ADD_CATEGORY":
      switch (action.category){
        case "Comedy":
          return {
            categories: ["Romance", "Slice of Life", "Fantasy"],
            newCategory: [...oldState.newCategory, action.category],
            tags: [],
            newTag: oldState.newTag,
            result: result
          }
        case "Adventure":
          return {
            categories: ["Action", "Fantasy", "Horror", "mahou shoujo", "Mecha", "Mystery"],
            newCategory: [...oldState.newCategory, action.category],
            tags: [],
            newTag: oldState.newTag,
            result: result
          }
        case "Romance":
          return {
            categories: ["Slice of Life", "Comedy", "Drama", "Adventure"],
            newCategory: [...oldState.newCategory, action.category],
            tags: [],
            newTag: oldState.newTag,
            result: result
          }
        case "Action":
          return {
            categories: ["Adventure", "Comedy", "Fantasy"],
            newCategory: [...oldState.newCategory, action.category],
            tags: [],
            newTag: oldState.newTag,
            result: result
          }
        case "Drama":
          return {
            categories: ["Action", "Comedy", "Horror", "Psychological"],
            newCategory: [...oldState.newCategory, action.category],
            tags: [],
            newTag: oldState.newTag,
            result: result
          }
        case "Mystery":
          return {
            categories: ["Thriller", "Adventure"],
            newCategory: [...oldState.newCategory, action.category],
            tags: [],
            newTag: oldState.newTag,
            result: result
          }
        default:
          return {
            categories: [],
            newCategory: [...oldState.newCategory, action.category],
            tags: [],
            newTag: oldState.newTag,
            result: true
          }
      }
    case "ADD_TAG":
      switch (action.tag){
        case "Shounen":
          return {
            categories: ["Action", "Fantasy", "Adventure"],
            newCategory: [...oldState.newCategory],
            tags: [],
            newTag: [...oldState.newTag, action.tag],
            result: result
          }
        case "Parody":
          return {
            categories: ["Romance", "Fantasy", "Slice of Life"],
            newCategory: [...oldState.newCategory],
            tags: [],
            newTag: [...oldState.newTag, action.tag],
            result: result
          }
        default:
          return oldState
      }
    case "CLEAR":
      return {
        categories: ["Comedy", "Romance", "Drama", "Mystery"],
        newCategory: [],
        tags: ["Parody", "Shounen"],
        newTag: [],
        result: false
      }
    default:
      return oldState;
  }
}
