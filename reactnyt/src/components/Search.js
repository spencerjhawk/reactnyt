import React, { Component } from 'react';
import Results from './Results';

class Search extends Component {
	// Set initial state, and bind correct 'this' to handleChange function
	constructor(props) {
		super(props);
		this.state = {
			topic: undefined,
			startYear: undefined,
			endYear: undefined,
			results: []
		}
		this.handleChange = this.handleChange.bind(this);
	}

	// Captures any change in input fields, updates state
	handleChange(event) {
		let newState = {};
		newState[event.target.id] = event.target.value;
		this.setState(newState);
	}

	// NYT API call on submit, uses current state to build query URL
	nytSearch(e) {
		e.preventDefault();
		const key = '775f14ef020945c49e51356ce23d9a5c';
		let nytUrl = `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${key}&q=${this.state.topic}&begin_date=${this.state.startYear}0101&end_date=${this.state.endYear}1231&fl=web_url,headline,pub_date&page=0`;
		let myRequest = new Request(nytUrl);
		fetch(myRequest)
			.then(res => {
				return res.json();
			}).then(data => {
				this.setState({
					results: data.response.docs
				});
			}).catch(e => {
				this.setState({
					results: `API call failed: ${e}`
				});
			});
	}
 
	render() {
		return (
			<div>
			<div className="search row">
			<form className="col s10 offset-s1" id="article_search" onSubmit={this.nytSearch.bind(this)}>
				<div className="row center-align">
					<div className="input-field col s12">
						<input name="topic" id="topic" type="text" value={this.state.topic} onChange={this.handleChange}/>
						<label for="topic">Topic</label>
					</div>
					<div className="input-field col s12 m6">
						<input name="start_year" id="startYear" type="number" value={this.state.startYear} onChange={this.handleChange}/>
						<label for="start_year">Start Year</label>
					</div>
					<div className="input-field col s12 m6">
						<input name="end_year" id="endYear" type="number" value={this.state.endYear} onChange={this.handleChange}/>
						<label for="end_year">End Year</label>
					</div>
					<button className="btn waves-effect waves-light" type="submit" name="action">Search
					</button>
					</div>
					</form>
				</div>

				<Results 
					results={this.state.results}
				/>
				
			</div>
		);
	}
}

export default Search;