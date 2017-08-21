import React, { Component } from 'react';
import '../styles/app.css';

class NotFound extends Component{
    render(){
        return (
            <div className="tournament-not-found">
                <div className="tournament-not-found-wrapper">
                    <div className="tournament-not-found-header">
                        <span>Something's wrong here</span>
                    </div>
                    <div className="tournament-not-found-description">
                        <span>We can't find the page you're looking for. Check out URL or head back to home. </span>
                    </div>
                    <div className="tournament-not-found-links">
                        <a href="/">Home</a>
                    </div>
                    <div className="tournament-not-found-image" />
                </div>
            </div>
        );
    }
}

export default NotFound;