import React from "react"
import Checkbox from "../ui/Checkbox"
import TextEditable from "../ui/TextEditable"
import "./transition-item.css"

const Transcription = ({ voice, text, transcriptid, deleteTranscript,updateTranscript }) => {

  const editTranscript=value=>{
    console.log('editTranscript',value);
    updateTranscript({id:transcriptid,...value})
    
  }
  return (
    <div className="list-item-content">
      <Checkbox id={transcriptid} className="checkbox"/>
      <i className="person" />
      <div className="text-container">
         <TextEditable  data={voice} textClass={"voice"} editTranscript={value=>editTranscript(value)}/>
         <TextEditable data={text} multiline={true} textClass={"text"}  editTranscript={value=>editTranscript(value)}/>
      </div>
      <i
        className="delete"
        onClick={() => deleteTranscript(transcriptid)}
      />
    </div>
  )
}

export default Transcription
