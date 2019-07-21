import React, { useState,useRef } from "react"
import "./editable-text.css"

const TextEditable = ({ data, multiline, textClass ,editTranscript}) => {
  const [content, setContent] = useState(data)
  const [edit, setEdit] = useState(false)
  const inputRef= useRef()
  const handleBlur = e => {
    //console.log(`blur entered`)

    const currentTarget = e.currentTarget
    setTimeout(() => {
      if (!currentTarget.contains(document.activeElement)) {
        //console.log("should blur")
        setEdit(false)
        editTranscript({item:textClass,data:content})
      }
    }, 0)
    
    /* console.log(`e related target=>${e.relatedTarget}`) */
  }
  const handleClick = e => {
    /* console.log(`click clicked`) */
    setEdit(true)
    setTimeout(() => {
      inputRef.current.focus()
    }, 50);
  }
  

  return (
    <>
      <span
        className={`${!data ? "empty" : ""} ${edit ? "hide" : ""} ${textClass}`}
        onClick={handleClick}
        tabIndex="-1"
      >
        {content ? content : "Click to add content"}
      </span>
      {multiline ? (
        <textarea
          value={content}
          ref={inputRef}
          onChange={e => setContent(e.target.value)}
          onBlur={handleBlur}
          className={`${textClass}`}
        />
      ) : (
        <input
          type="text"
          value={content}
          ref={inputRef}
          onChange={event => setContent(event.target.value)}
          onBlur={handleBlur}
          className={`${textClass}`}
        />
      )}
    </>
  )
}

export default TextEditable
