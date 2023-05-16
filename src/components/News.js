import React, { Component } from 'react'
import Newsitems from './Newsitems'

export class News extends Component {
    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            page:1
        }
    }

   async componentDidMount(){
        let url = " https://newsapi.org/v2/top-headlines?country=us&apiKey=2c36609b2d78422298ddce5a60b49e8c&page=1&pageSize=20";
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({articles: parsedData.articles})
    }
    handlePreviousClick=async ()=>{
        let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=2c36609b2d78422298ddce5a60b49e8c&page=${ this.state.page - 1}&pageSize=20`
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles
        })
    }
    handleNextClick=async ()=>{
        let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=2c36609b2d78422298ddce5a60b49e8c&page=${ this.state.page + 1}&pageSize=20`
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
            page: this.state.page + 1,
            articles: parsedData.articles
        })
    }
    render() {
        return (
            <div className='container my-3'>
                <h1>Top Headlines</h1>
                <div className="row">
                {this.state.articles.map((element)=>{
                   return <div className="col-md-3" key={element.url}> <Newsitems title={element.title?element.title.slice(0, 45):""} description={element.description?element.description.slice(0, 45):""} imageUrl={element.urlToImage} newsUrl={element.url} /></div>
                })}
                </div>
                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page<=1} type='button' className='btn btn-info' onClick={this.handlePreviousClick}>&larr; Previous</button>
                    <button type='button' className='btn btn-info' onClick={this.handleNextClick}>Next &rarr;</button>
                </div>
            </div>
        )
    }
}

export default News
