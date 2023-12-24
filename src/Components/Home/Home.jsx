import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {BiPlay} from "react-icons/bi"
import {AiOutlinePlus} from "react-icons/ai"

import endGameImg from "../../images/endGame1.jpg";
// import { Link } from 'react-router-dom';

const apiKey = "297990f4e464971ac236d938be6c2815"
const url = "https://api.themoviedb.org/3/movie"
const upComing = "upcoming"
const popular_Movies = "popular"
const now_Playing = "now_playing"
const top_Rated = "top_rated"
const imageUrlPrefix = "https://image.tmdb.org/t/p/original"


const Card =({img})=>(
  <img className="card" src={img} alt="movies thumbnail" />
  )
const Row=({title,arr=[
  {img : endGameImg},

]})=>{
      return(
        <div className="row">
          <h2 className="popularMovie">{title}</h2>
          <div>
        {arr.map((item,index)=>(
          <Card img = {`${imageUrlPrefix}${item.poster_path}`} key={index} />
        ))}
        
          </div>
        </div>
      )
}

const Home = () => {
// console.log(`${url}/${upComing}?api_key=${apiKey}`)
const [upComingMovies,setUpComingMovies] = useState([])
const [popularMovies,setPopularMovies] = useState([])
const [topRated,setTopRated] = useState([])
const [nowPlaying,setNowPlaying] = useState([])
const [moviesList,setMoviesList] = useState([])
useEffect(()=>{
  const featchUpComingMocies = async ()=>{
      const {data:{results}} = await axios.get(`${url}/${upComing}?api_key=${apiKey}`)
  
      setUpComingMovies(results)
  }
  const featchNowPlayingMovies = async ()=>{
    const {data:{results}} = await axios.get(`${url}/${now_Playing}?api_key=${apiKey}`)

    setNowPlaying(results)
}
const fetchTopRatedMovies = async ()=>{
  const {data:{results}} = await axios.get(`${url}/${top_Rated}?api_key=${apiKey}`)
  setTopRated(results)
}
const fetchPopularMovies = async ()=>{
  const {data:{results}} = await axios.get(`${url}/${popular_Movies}?api_key=${apiKey}`)
  setPopularMovies(results)
}

const moviesGenres = async ()=>{
    const {data:{genres}} = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`)
    setMoviesList(genres)
  }

  featchUpComingMocies()
  featchNowPlayingMovies()
  fetchTopRatedMovies()
  fetchPopularMovies()
  moviesGenres()
},[])

// style={{backgroundImage:`url(${endGameImg})`}}
  return (
    <section className="home">
        <div className="banner"
        style={{backgroundImage:popularMovies[1]?`url(${`${imageUrlPrefix}/${popularMovies[2].poster_path}`})`:""
      }}>
        {popularMovies[1] && <h1> {popularMovies[1].original_title} </h1>}
        {popularMovies[1] &&  <p> {popularMovies[1].overview}</p>}
        <div>
        <button><BiPlay /> Play  </button>
        <button>My List <AiOutlinePlus /></button>
        </div>
        </div>

        <Row title = "Popular on Netflix" arr={popularMovies} />
        <Row title = "Now Playing" arr={nowPlaying} />
        <Row title = "Up Coming Movies" arr={upComingMovies} />
        <Row title = "Top Rated" arr={topRated} />

        <div className="genres">
          {/* <h2>Movies Genres</h2>   */}
            {moviesList.map((item,index)=>(
              <Link to="" key={index} >{item.name}</Link> 
            ))}
        </div>
    </section>
  )
}

export default Home