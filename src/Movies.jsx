import React, {useEffect, useState} from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";


const  MoviesApi = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=fec79be029eaa0a5759cc99d46d4debb&page=2";
const searchApi = "https://api.themoviedb.org/3/search/movie?sort_by=popularity.desc&api_key=fec79be029eaa0a5759cc99d46d4debb&query=";

const  Movies = () => {
      
    const imgPath = 'https://image.tmdb.org/t/p/w1280/';
    const [data, setData] = useState([]);
    const [searchTerm, setSearch] = useState("");

    const setVoteClass = (vote) => {
        if(vote >= 8) {
            return 'green'
        } else if (vote >=6) {
            return 'orange'
        } else {
            return 'red'
        }
    }

   
    useEffect(() => {
        getMovies(MoviesApi); 
    }, []); 

    const getMovies=(API) => {
        fetch(API)
        .then((resp) => resp.json())
        .then((realData) => {
            setData(realData.results)
        });
    }
    
      
    const handleOnSubmit = (event) => {
        event.preventDefault();

        if(searchTerm) {
        getMovies(searchApi+searchTerm);
        setSearch('');
    }
};

    const handleOnChange = (event) => {
       setSearch(event.target.value); 
    }
        
  return (
      <>
      
                
        <header>
            <h2>HollyWood Movies Trailers</h2>
            <form action="" onSubmit={handleOnSubmit} >
                <input type="search" 
                    placeholder="Search" 
                    className="search"
                    value={searchTerm}
                    onChange={handleOnChange}
                />
            </form>
        </header>
    <div className="main">     
        {
           
            data.map((curEle, ind)=> {
                const movieAPI = `https://www.themoviedb.org/movie/${curEle.id}-${curEle.title}`;
                return (
                    <span key={ind}>
                        <div className="movie">
                        <a href={movieAPI}> 
                            <img 
                                src={
                                    curEle.poster_path ? imgPath + curEle.poster_path : "https://source.unsplash.com/random"}
                                    alt={curEle.title} />  </a>
        
                            <div className="movie_info">
                                <h3> {curEle.title} </h3>
                                <span className={setVoteClass(curEle.vote_average)}> {curEle.vote_average} </span>
                            </div>
                            <div className="overview">
                                <h4>overview:</h4>
                                <h5>Relese Date: {curEle.release_date}</h5>
                                {curEle.overview} 
                            </div>
                        </div>
                    </span>
                    
                )
            })
        }
    </div>          
        </> 
    );
}

export default  Movies;
