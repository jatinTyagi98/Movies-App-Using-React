import React, { Component } from 'react'
import { movies } from './getMovies'

export default class Favourites extends Component {
    constructor(){
        super();
        this. genreids = {28:'Action',12:'Adventure',16:'Animation',35:'Comedy',80:'Crime',99:'Documentary',18:'Drama',10751:'Family',14:'Fantasy',36:'History',
        27:'Horror',10402:'Music',9648:'Mystery',10749:'Romance',878:'Sci-Fi',10770:'TV',53:'Thriller',10752:'War',37:'Western'};
        
        this.state = {
            genres:[],
            currGenres : 'All Genres',
            movies : [],
            currText:'',
            limit:5,
            currPage: 1
        }
    }
    
    componentDidMount(){
        let data = JSON.parse(localStorage.getItem('movies') || '[]')
        let temp = []
         data.forEach((movieObj) => {
             if(!temp.includes(this.genreids[movieObj.genre_ids[0]])){
              temp.push(this.genreids[movieObj.genre_ids[0]]);
             }
      })   
      temp.unshift("All Genres")
      this.setState({
          genres:[...temp],
          movies:[...data]
      })
    }
    handleTable = (genres) => {
        this.setState({
            currGenres : genres
        })
    }
    handlePopularityDesc = () => {
        let temp = this.state.movies
        temp.sort(function(objA, objB){
            return objB.popularity - objA.popularity;
        })
        this.setState({
            movies:[...temp]
        })
    }
    handleRatingDesc = () => {
        let temp = this.state.movies
        temp.sort(function(objA,objB){
            return objB.vote_average - objA.vote_average
        })
        this.setState({
            movies:[...temp]
        })
    }
    handlePopAsec = () => {
        let temp = this.state.movies
        temp.sort(function(objA,objB){
            return objA.popularity-objB.popularity 
        })
        this.setState({
            movies:[...temp]
        })
    }
    handleRateAsec = () => {
        let temp = this.state.movies
        temp.sort(function(objA,objB){
            return objA.vote_average-objB.vote_average 
        })
        this.setState({
            movies:[...temp]
        })
    }
    handlePageChange = (page) => {
        this.setState({
            currPage:page
        })
    }
    handleDelete = (id) => {
        let narr = []
        console.log('hi', this.state.movies)
       narr  = this.state.movies.filter((movieObj) => movieObj.id != id) 
        this.setState({
            movies:[...narr]
        })
        console.log('end',narr)
        console.log('end',this.state.movies)

        localStorage.setItem('movies',JSON.stringify(narr))
    }
   
    render() {
        let filterArr = []

        if(this.state.currText === ''){
            filterArr = this.state.movies
        }else{
            filterArr = this.state.movies.filter((movieObj) => {
                let title = movieObj.original_title.toLowerCase()
                return title.includes(this.state.currText.toLowerCase())
            })
        }

        if(this.state.currGenres != 'All Genres'){
            filterArr = this.state.movies.filter((movieObj) =>  this.genreids[movieObj.genre_ids[0]] == this.state.currGenres)
        }

        let page = Math.ceil(filterArr.length/this.state.limit)
        console.log('pages', page)
        let si =  (this.state.currPage-1)* this.state.limit
        let ei =  si + Number(this.state.limit)

        let pageArr = []
        for(let i = 1; i<= page;i++){
            pageArr.push(i)
        }
        console.log('pAGEARR',pageArr)
        console.log('currpage',this.state.currPage, 'limit', this.state.limit)
        console.log('si',si )
        console.log(ei)

        filterArr = filterArr.slice(si,ei)
        console.log('arr', filterArr)
        

        return (
            <div>
                <>
                    <div className="main">
                        <div className="row">
                            <div className="col-3">
                                <ul class="list-group fav-genres">
                                    {
                                        this.state.genres.map((genres)=>(
                                            genres == this.state.currGenres?
                                            <li class="list-group-item" style={{background:'#0a318c' ,color:'white', fontWeight: 'bold'}}>{genres}</li>:
                                            <li class="list-group-item" style={{background:'white' ,color:'#0a318c'}} onClick={() => this.handleTable(genres)}>{genres}</li>
                                        ))
                                    }
                                    
                                </ul>
                            </div>
                            <div className="col-9 fav-table">
                                <div className="row">
                                    <input type="text" className="input-group-text col" placeholder="Search" value={this.state.currText} onChange={(e) => this.setState({currText:e.target.value})}/>
                                    <input type="number" className="input-group-text col" placeholder="Rows Count" value={this.state.limit} onChange={(e) => this.setState({limit: e.target.value})}/>

                                </div>
                                <div className="row">
                                <table class="table">
                                    <thead>
                                        <tr>
                                        <th scope="col">Title</th>
                                        <th scope="col">Genre</th>
                                        <th scope="col"><i class="fas fa-sort-up" onClick={this.handlePopularityDesc}></i>Popularity<i class="fas fa-sort-down" onClick={this.handlePopAsec}></i></th>
                                        <th scope="col"><i class="fas fa-sort-up" onClick={this.handleRatingDesc}></i>Rating<i class="fas fa-sort-down" onClick={this.handleRateAsec}></i></th>
                                        <th scope="col"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            filterArr.map((movieObj) => (
                                                <tr>
                                                    <td scope="row"><img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} style={{width:'4rem'}}/>{movieObj.original_title}</td>
                                                    <td>{this.genreids[movieObj.genre_ids[0]]}</td>
                                                    <td>{movieObj.popularity}</td>
                                                    <td>{movieObj.vote_average}</td>
                                                    <td><button type="button" class="btn btn-danger" onClick= {() => this.handleDelete(movieObj.id)}>Delete</button></td>
                                                </tr>
                                            ))
                                        }
                                        
                                    </tbody>
                                </table>
                            </div>
                            <nav aria-label="Page navigation example">
                                <ul class="pagination">
                                    {
                                        pageArr.map((page) => (
                                            <li class="page-item"><a class="page-link" onClick={() => this.handlePageChange(page)}>{page}</a></li>
                                        ))

                                    }
                                    
                                </ul>
                            </nav>

                            </div>

                            
                        </div>

                    </div>

                </>
            </div>
        )
    }
}
