import React, { useState, useEffect } from 'react';

export default function AddCategory({ categories, addCategoryFunction, addTagFunction, clearFunction,anilistAccount }) {
  console.log(categories)
  const [getAccountFetch, setAccountFetch] = useState([])
  const [getFetch, setgetFetch] = useState([])
  const [getAnimeIds, setAnimeIds] = useState([])

  const animes = ["Comedy", "Romance", "Drama", "Mystery"];
  const [images, setImages] = useState([])
  const [ids, setIds] = useState([])

  useEffect(() => {
    async function animeCoverImageFetching(genre) {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Cookie", "laravel_session=3ywtTox2oRvUS1KTpXQ2kXWMIpEOIdKZtnul5sFe");
      var graphql = JSON.stringify({
        query: "query ($id: Int, $page: Int, $perPage: Int, $genre: String) { Page (page: $page, perPage: $perPage) { pageInfo { total currentPage lastPage hasNextPage perPage } media (id: $id, genre: $genre, sort: SCORE_DESC, type: ANIME) { id coverImage { large } } } }",
        variables: { "page": 1, "perPage": 6, "genre": `${genre}` }
      })
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: graphql,
        redirect: 'follow'
      };

      await fetch("https://graphql.anilist.co/", requestOptions)
        .then(response => response.text())
        .then(result => {
          let dataParsed = JSON.parse(result)['data']['Page']['media'];
          var i = 0;
          while (ids.includes(dataParsed[i]['id'])) {
            i++;
          }
          setIds([...ids, dataParsed[i]['id']])
          setImages([...images, dataParsed[i]['coverImage']['large']])
        })
        .catch(error => console.log('error', error));

    }
    animes.forEach((genre) => {
      animeCoverImageFetching(genre)
    })
    return () => {
      console.log(images);
    }
  }, [categories.result])



  console.log(getFetch)
  //console.log(getAnimeIds)
  //console.log(categories)
  //console.log(addTagFunction)
  console.log(getAccountFetch)

  useEffect(() => {
    if (anilistAccount.length > 1){
      anilistAccountInformation(anilistAccount)
    }
  }, [])

  //console.log(getAccountFetch)

  useEffect(() => {
    //if (categories.newCategory.length > 0){
    //  fetchAnime(categories.newCategory[categories.newCategory.length - 1])
   //}
  }, [categories.newCategory])

    useEffect(() => {
      //if (categories.newCategory.length > 0){
      //  fetchAnime(categories.newCategory[categories.newCategory.length - 1])
      //}
      animeResult(categories.newCategory, categories.newTag, [])
      console.log(getFetch)
    }, [categories.result])


  const display = () => {

    const result = () => {
      if ((categories.newTag.length + categories.newCategory.length) > 0) {
        return (
          <>
            <h2>
              Categories selected:
            </h2>
            <div className='result-container'>
              {categories.newTag.map((tag, idx) => (
                <div key={idx} className={`button ${tag.toLowerCase()}`} >
                  {tag}
                </div>
              ))}

              {categories.newCategory.map((category, idx) => (
                <div key={idx} className={`button ${category.toLowerCase()}`} >
                  {category}
                </div>
              ))}

            </div>
            <div className='hr-container'>
              <hr></hr>
            </div>
          </>
        )
      }
    }

    if(categories.result === true){
      return(
        <>
          {result()}
          <div className='button button-reset' onClick={() => clearFunction()}>
            Reset
          </div>
          <h2>
            Results:
          </h2>
          <div>
            {getFetch.map((imageUrl, idx) => (
              <a key={idx} href= {imageUrl.id} >
                <img src={imageUrl.url}></img>
                <h5>{imageUrl.title}</h5>
              </a>
            ))}
          </div>
        </>
      )
    }
    else {
      return (
        <>
          {result()}
          <div className='buttons-container'>
            {categories.categories.map((category, idx) => (
              <div key={idx} className={`button button-choice-category ${category.toLowerCase()}`} onClick={() => addCategoryFunction(category)} >
                {category}
              </div>
            ))}

            {categories.tags.map((tag, idx) => (
              <div key={idx} className={`button button-choice-category ${tag.toLowerCase() }`} onClick={() => addTagFunction(tag)} >
                {tag}
              </div>
            ))}
          </div>
        </>
      )
    }
  }

  return (
    display()
  );

  function fetchAnime(genre) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Cookie", "laravel_session=3ywtTox2oRvUS1KTpXQ2kXWMIpEOIdKZtnul5sFe");

    var graphql = JSON.stringify({
      query: "query ($id: Int, $page: Int, $perPage: Int, $genre: String) { Page (page: $page, perPage: $perPage) { pageInfo { total currentPage lastPage hasNextPage perPage } media (id: $id, genre: $genre, sort: SCORE_DESC, type: ANIME) { id coverImage { large } } } }",
      variables: { "page": 1, "perPage": 6, "genre": `${genre}` }
    })
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: graphql,
      redirect: 'follow'
    };

    fetch("https://graphql.anilist.co/", requestOptions)
      .then(response => response.text())
      .then( result =>  {
        let dataParsed = JSON.parse(result)['data']['Page']['media'];
        var i = 0;
        while (getAnimeIds.includes(dataParsed[i]['id'])) {
          i++;
        }
        setAnimeIds([...getAnimeIds, dataParsed[i]['id']])
        setgetFetch([...getFetch, dataParsed[i]['coverImage']['large']])
        //getFetch.push(dataParsed[i]['coverImage']['large'])
      })
      .catch(error => console.log('error', error));
  }

  function anilistAccountInformation(user) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Cookie", "laravel_session=3ywtTox2oRvUS1KTpXQ2kXWMIpEOIdKZtnul5sFe");

    var graphql = JSON.stringify({
      query: "query ($userId: Int, $userName: String) { User( id: $userId, name: $userName){ statistics{ anime{ genres{ genre mediaIds } }}}}",
      variables: { "userName": `${user}` }
    })
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: graphql,
      redirect: 'follow'
    };


    fetch("https://graphql.anilist.co/", requestOptions)
      .then(response => response.text())
      .then(result => {
        setAccountFetch(JSON.parse(result)['data']['User']['statistics']['anime']['genres'])
      })
      .catch(error => console.log('error', error));
  }

  async function animeResult(genres, tags, resultats) {
    var categoryIds = []
    getAccountFetch.map((element, idx) => {
      if (genres.includes(element['genre'])) {
        categoryIds.push(idx)
      }
    })

    console.log(categoryIds)
    //console.log(`tags: ${tags}`)
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Cookie", "laravel_session=b2ZuFCKjfTAyRuvCxqwVYWZB7aIqsHXfAW7QrEWu");

    if (tags.length >= 1) {
      var graphql = JSON.stringify({
        query: "query ($id: Int, $page: Int, $perPage: Int, $genre_in: [String],  $tag_in: [String]) {Page (page: $page, perPage: $perPage) {pageInfo { total currentPage lastPage hasNextPage perPage } media (id: $id, genre_in: $genre_in, tag_in: $tag_in, sort: SCORE_DESC, type: ANIME) { id title { romaji } meanScore genres coverImage { large } } }}",
        variables: { "page": 1, "perPage": 10, "genre_in": genres, "tag_in": tags }
      })
    }
    else {
      var graphql = JSON.stringify({
        query: "query ($id: Int, $page: Int, $perPage: Int, $genre_in: [String]) {Page (page: $page, perPage: $perPage) {pageInfo { total currentPage lastPage hasNextPage perPage } media (id: $id, genre_in: $genre_in, sort: SCORE_DESC, type: ANIME) { id title { romaji } meanScore genres coverImage { large } } }}",
        variables: { "page": 1, "perPage": 10, "genre_in": genres }
      })
    }

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: graphql,
      redirect: 'follow'
    };

    await fetch("https://graphql.anilist.co/", requestOptions)
      .then(response => response.text())
      .then(result => {
        var idResult = []
        console.log(JSON.parse(result)['data']['Page']['media'])
        var dataParsed = JSON.parse(result)['data']['Page']['media']
        var i = 0
        console.log(dataParsed)
        dataParsed.forEach((anime) => {
          if (categoryIds.length > 1) {
            categoryIds.forEach((id) => {
              if ((!getAccountFetch[id]['mediaIds'].includes(anime['id'])) && (!idResult.includes(i))) {
                idResult.push(i)
                //if(resultats.length < 3) {
                  resultats.push({ url: anime['coverImage']['large'], title: anime['title']['romaji'], id: `https://anilist.co/anime/${anime['id']}` })
                //}
              }
            })
            i++
          }
          else {
            console.log(anime)
            //if (resultats.length < 3) {
              resultats.push({ url: anime['coverImage']['large'], title: anime['title']['romaji'], id: `https://anilist.co/anime/${anime['id']}` })
            //}
          }
        })
        console.log(getFetch)
      })
      .catch(error => console.log('error', error));
      console.log(resultats)
      setgetFetch(resultats)
      console.log(getFetch)
      return resultats
  }
};
