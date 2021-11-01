import React, { Component } from 'react'

export default class Navbar extends Component {
    render() {
        return (
            <div style = {{display:'flex', padding:'0.5'}}>
                <h1>Movies App</h1>
                <h2 style={{marginLeft: '4rem ', marginTop: '1.6rem'}}>Favourites</h2>
            </div>
        )
    }
}
