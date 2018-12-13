import React, { Component } from 'react'
import { Link } from "react-router-dom";
export default class Footer extends Component {
  render() {
	return (
		<div className="o-footer">
			<div className="o-footer__container">
				<ul className="o-footer__list">
					<li className="o-footer__item">
						<Link to="/">Home</Link>
					</li>
					<li className="o-footer__item">
						<Link to="/about">About</Link>
					</li>
					<li className="o-footer__item">
						<Link to="/topics">Topics</Link>
					</li>
				</ul>
			</div>
		</div>
	)
  }
}
