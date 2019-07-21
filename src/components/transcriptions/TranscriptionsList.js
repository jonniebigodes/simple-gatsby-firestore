import React from "react"
import Transcription from "./Transcription"
import ErrorMessage from '../core/ErrorMessage'
import { CSSTransition, TransitionGroup } from "react-transition-group"
import { TranscriptionsContext } from "../../contexts/TranscriptionsContext"
import "./transcriptions.css"

// check component transition group
const TranscriptionsList = () => (
  <TranscriptionsContext.Consumer>
    {({ transcriptList, addNewTranscript, deleteTranscript,updateTranscript,errorMessage}) => (
      <div className="list">
        <TransitionGroup component="ul">
          {transcriptList.map(transcript => (
            <CSSTransition
              classNames={"list-anim"}
              unmountOnExit
              appear
              timeout={400}
              /*  transitionAppear={true}
              transitionAppearTimeout={500}
              transitionEnter={false}
              transitionLeave={false} */
              key={`transition_${transcript.id}`}
            >
              <li>
                <Transcription
                  key={transcript.id}
                  voice={transcript.voice}
                  text={transcript.text}
                  transcriptid={transcript.id}
                  deleteTranscript={deleteTranscript}
                  updateTranscript={updateTranscript}
                />
              </li>
            </CSSTransition>
          ))}
        </TransitionGroup>
        <i className="add-row" onClick={addNewTranscript}>
          {" "}
        </i>
        <ErrorMessage errormessage={errorMessage}/>
      </div>
    )}
  </TranscriptionsContext.Consumer>
)

export default TranscriptionsList
