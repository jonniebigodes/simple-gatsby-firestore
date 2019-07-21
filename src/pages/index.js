import React from "react"
import Header from "../components/core/Header"
import SEO from "../components/core/SEO"
import TranscriptionsList from "../components/transcriptions/TranscriptionsList"
import ErrorMessage from "../components/core/ErrorMessage"
import { TranscriptionsProvider } from "../contexts/TranscriptionsContext"
import '../assets/css/layout.css'

export default () => (
  <div style={{ width: "100%", height: "100%" }}>
    <SEO
      title="Transcriptions"
      description="Simple implementation of transcriptions application"
    />
    <TranscriptionsProvider>
      <div
        style={{
          width: "100%",
          minHeight: "100vh",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Header title="Transcriptions" />
        <section
          style={{ width: "100%", maxWidth: "786px", margin: "24px auto" }}
        >
          <TranscriptionsList />
        </section>
      </div>
    </TranscriptionsProvider>

    <ErrorMessage />
  </div>
)
