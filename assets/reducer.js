export default function reducer(oldState, action) {

  function search(categories, oldState) {
    var search=[];
    categories.map((category) => {
      if (!(oldState.includes(category))) {
        search.push(category)
      }
    })
    return search
  }

  var result
  if((oldState.newCategory.length + oldState.newTag.length) >= 2){
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
            categories: search(["Romance", "Slice of Life", "Fantasy"], oldState.newCategory),
            newCategory: [...oldState.newCategory, action.category],
            tags: [],
            newTag: oldState.newTag,
            result: result
          }
        case "Adventure":
          return {
            categories: search(["Action", "Fantasy", "Horror", "mahou shoujo", "Mecha", "Mystery"], oldState.newCategory),
            newCategory: [...oldState.newCategory, action.category],
            tags: [],
            newTag: oldState.newTag,
            result: result
          }
        case "Romance":
          return {
            categories: search(["Slice of Life", "Comedy", "Drama", "Adventure"], oldState.newCategory),
            newCategory: [...oldState.newCategory, action.category],
            tags: [],
            newTag: oldState.newTag,
            result: result
          }
        case "Action":
          return {
            categories: search(["Adventure", "Comedy", "Fantasy"], oldState.newCategory),
            newCategory: [...oldState.newCategory, action.category],
            tags: [],
            newTag: oldState.newTag,
            result: result
          }
        case "Drama":
          return {
            categories: search(["Action", "Comedy", "Horror", "Psychological"], oldState.newCategory),
            newCategory: [...oldState.newCategory, action.category],
            tags: [],
            newTag: oldState.newTag,
            result: result
          }
        case "Mystery":
          return {
            categories: search(["Thriller", "Adventure"], oldState.newCategory),
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
