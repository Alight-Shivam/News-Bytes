import React, { Component } from 'react'

export class Newsitems extends Component {

  render() {
   let {title, description,urlToImage, newsUrl, author, date, source} = this.props;
    return (
      <div className='my-3'>
        <div className="card">
          <div style={{display: 'flex',
          justifyContent: 'flex-end',
          position: 'absolute',
          right: 0}}>
        <span className="badge rounded-pill bg-success">{source}</span>
        </div>
  <img src={urlToImage} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{title}...</h5>
    <p className="card-text">{description}...</p>
    <p className= "card-text"><small className="text-body-secondary">By {author} on {new Date(date).toGMTString()}</small></p>
    <a rel="noreferrer" href={newsUrl} target= "_blank" className="btn btn-sm btn-info">Read More</a>
  </div>
</div>
      </div>
    )
  }
}

export default Newsitems
