import React, { Component } from "react"
import uuid from "uuid"
import { DummyTranscripts } from "../dummyData/dummy"
import axios from "axios"
export const TranscriptionsContext = React.createContext()

export class TranscriptionsProvider extends Component {
  state = {
    transcriptList: [],
    errorMessage: "",
    isError: false,
  }

  fetchTranscripts = async () => {
    try {
      const transcriptsRequest = await axios(
        process.env.NODE_ENV === "development"
          ? `/fb-api/transcripts`
          : `https://europe-west1-fb-function-testing.cloudfunctions.net/api/transcripts`
      )
      
      const { data } = transcriptsRequest
      this.setState(prevstate=>({
        transcriptList:[].concat(prevstate.transcriptList,data.transcripts)
      }))
    } catch (error) {
      this.setState(prevstate=>({
        isError: true,
        errorMessage: `An error occured while retrieving the transcriptions. Please try again.`,
        transcriptList:[].concat(...prevstate.transcriptList,DummyTranscripts)
      }))
      console.log("something went wrong fetching the transcripts", error)
      this.clearNotification()
    }
  }

  addTranscript = () => {
    this.setState(prevstate => ({
      transcriptList: [
        ...prevstate.transcriptList,
        { id: uuid.v4(), voice: "", text: "" },
      ],
    }))
  }
  clearNotification = () => {
    setTimeout(() => {
      this.setState({ isError: false, errorMessage: ""})
    }, 3000)
  }
  uploadTranscript = async () => {
    const {transcriptList}= this.state
    // console.log(`soon adding to server`)
    if (transcriptList.length===0){
      return 
    }
    const dummyItemsPresent= transcriptList.some(x=>DummyTranscripts.includes(x))
    if (dummyItemsPresent){
      this.setState({isError:true,errorMessage:'delete the dummy items first then try to upload the transcripts again.'})
      this.clearNotification()
      return
    }
    try {
      await axios.post(
        process.env.NODE_ENV === "development"
          ? `/fb-api/transcript`
          : `https://europe-west1-fb-function-testing.cloudfunctions.net/api/transcript`,{
            transcripts:transcriptList
          }
      )
    } catch (error) {
      this.setState({
        isError: true,
        errorMessage: `An error occured while uploading the transcriptions. Please try again.`,
      })
      console.log("something went wrong fetching the transcripts", error)
      this.clearNotification()
    }
  }
  removeTranscript = value => {
    const { transcriptList } = this.state
    const newTranscripts = transcriptList.filter(x => x.id !== value)
    //console.log(newTranscripts)
    this.setState({
      transcriptList: newTranscripts,
    })
  }
  editTranscript = value => {
    /* console.log(`edit with value:${JSON.stringify(value, null, 2)}`) */

    const {transcriptList}= this.state
    const updatedTranscripts= transcriptList

    const posTranscript= updatedTranscripts.findIndex(x=>x.id=== value.id)
    /* console.log(`posTranscript:${posTranscript}`); */
    if (value.item==='text'){
      updatedTranscripts[posTranscript].text=value.data
    }
    else{
      updatedTranscripts[posTranscript].voice=value.data
    }
    this.setState({transcriptList:updatedTranscripts})
  }
  render() {
    return (
      <TranscriptionsContext.Provider
        value={{
          ...this.state,
          syncTranscripts: this.uploadTranscript,
          addNewTranscript: this.addTranscript,
          deleteTranscript: this.removeTranscript,
          getTranscripts: this.fetchTranscripts,
          updateTranscript: this.editTranscript,
        }}
      >
        {this.props.children}
      </TranscriptionsContext.Provider>
    )
  }
}
