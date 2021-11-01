import React, { Component } from 'react'
import { movies } from './getMovies'

export default class Movies extends Component {
    constructor(){
        super();
        this.state= {
            hover: ' '
        }
    }
    render() {
        let movie = movies.results
        return (
            <>
             {
                 movie.length == 0?
                 
                 <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div> :

                <div>
                    <h3 className="text-center"><strong>Trending</strong></h3>
                        <div className="movie-list">
                    {
                        movie.map((movieObj) => (
                            <div className="card movie-card" onMouseEnter={() => this.setState({hover:movieObj.id})} onMouseLeave={() => this.setState({hover:' ' })} >
                                <img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`}  className="card-img-top movie-img " alt="..."/>
                                {/* <div className="card-body"> */}
                                    <h5 className="card-title movie-title">{movieObj.original_title}</h5>
                                    {/* <p className="card-text movie-text">{movieObj.overview}.</p> */}
                                    <div className="button-wrapper" style={{display:'flex',width:'100%',justifyContent:'center'}}>
                                        {
                                            this.state.hover == movieObj.id && <a className="btn btn-primary movie-btn">Add to Favourites </a>
                                        }
                
                                    </div>
                                {/* </div> */}
                        </div>
                        ))
                    }
                    </div>
                    <div style={{display:'flex',justifyContent:'center'}}>
                        <nav aria-label="Page navigation example">
                            <ul class="pagination">
                            <li class="page-item"><a class="page-link" href="#">Previous</a></li>
                            <li class="page-item"><a class="page-link" href="#">1</a></li>
                            <li class="page-item"><a class="page-link" href="#">2</a></li>
                            <li class="page-item"><a class="page-link" href="#">3</a></li>
                            <li class="page-item"><a class="page-link" href="#">Next</a></li>
                            </ul>
                        </nav>
                     </div>

                </div>
               
                 
             }
            </>
        )
    }
}
