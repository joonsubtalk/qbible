import React, { Component } from 'react'

export default class Progress extends Component {
  render() {
    return (
      <div className="c-progress">
        <ul className="c-progress__list">
            <li className="c-progress__item">
                <div className="c-progress__circles">
                    <div className="c-progress__content"></div>
                </div>
            </li>
            <li className="c-progress__item">
                <div className="c-progress__circles">
                    <div className="c-progress__content"></div>
                </div>
            </li>
            <li className="c-progress__item">
                <div className="c-progress__circles">
                    <div className="c-progress__content"></div>
                </div>
            </li>
            <li className="c-progress__item">
                <div className="c-progress__circles">
                    <div className="c-progress__content"></div>
                </div>
            </li>
            <li className="c-progress__item">
                <div className="c-progress__circles">
                    <div className="c-progress__content"></div>
                </div>
            </li>
        </ul>
      </div>
    )
  }
}
