import React, { Component } from 'react'
import Newsitems from './Newsitems'
import Spinner from './Spinner'
import PropTypes from 'prop-types'

export class News extends Component {
static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general'
}
static propTypes = {
    name: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}

    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            page:1
        }
    }

   async componentDidMount(){
        let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=2c36609b2d78422298ddce5a60b49e8c&page=1&pageSize=${this.props.pageSize}`;
        this.setState({loading: true});
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({articles: parsedData.articles,
             totalResults: parsedData.totalResults,
            loading: false})
    }
    handlePreviousClick=async ()=>{
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2c36609b2d78422298ddce5a60b49e8c&page=${ this.state.page - 1}&pageSize=${this.props.pageSize}`
        this.setState({loading: true});
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles,
            loading: false
        })
    }
    handleNextClick=async ()=>{
        if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
        let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=2c36609b2d78422298ddce5a60b49e8c&page=${ this.state.page + 1}&pageSize=${this.props.pageSize}`;
        this.setState({loading: true});
        let data = await fetch(url);
        let parsedData = await data.json();
        
        this.setState({
            page: this.state.page + 1,
            articles: parsedData.articles,
            loading: false
        })
    }
    }
    render() {
        return (
            <div className='container my-3'>
                <h1 className='text-center my-4'>Top Headlines</h1>
                {this.state.loading && <Spinner/>}
                <div className="row">
                {!this.state.loading && this.state.articles.map((element)=>{
                   return <div className="col-md-3" key={element.url}> <Newsitems title={element.title?element.title.slice(0, 45):""} description={element.description?element.description.slice(0, 45):""} imageUrl={element.urlToImage} newsUrl={element.url} /></div>
                })}
                </div>
                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page<=1} type='button' className='btn btn-info' onClick={this.handlePreviousClick}>&larr; Previous</button>
                    <button type='button' disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} className='btn btn-info' onClick={this.handleNextClick}>Next &rarr;</button>
                </div>
            </div>
        )
    }
}

export default News
