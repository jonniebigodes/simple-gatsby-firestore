import React from "react"
import PropTypes from "prop-types"
import { TranscriptionsContext } from "../../contexts/TranscriptionsContext"
import "./header.css"

const Header = ({ title }) => (
  <TranscriptionsContext.Consumer>
    {({ syncTranscripts, getTranscripts }) => {
      return (
        <header className="header-container">
          <div className="content">
            <h1 className="headerTitle">{title}</h1>
            <div>
              <i className="upload" onClick={syncTranscripts}></i>
              <i className="fetch" onClick={getTranscripts}></i>
            </div>
          </div>
        </header>
      )
    }}
  </TranscriptionsContext.Consumer>
)

Header.propTypes = {
  title: PropTypes.string,
}

Header.defaultProps = {
  title: ``,
}

export default Header
