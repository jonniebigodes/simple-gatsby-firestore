import React from "react"
import "./error-message.css"
import { CSSTransition, TransitionGroup } from "react-transition-group"
const ErrorMessage = ({ errormessage }) => {

    return(
       <div>
           {
               errormessage?<TransitionGroup >
               <CSSTransition
                 classNames="bottom-to-left"
                 key={`transition_error`}
                 unmountOnExit
                 appear
                 timeout={400}
               >
                 <p>{errormessage}</p>
               </CSSTransition>
             </TransitionGroup>:null
           }
       </div>
    )
}

export default ErrorMessage
