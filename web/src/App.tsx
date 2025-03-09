import './App.css'
import Nav from './Components/Generic/Nav';
import CvBuilder from './Components/CvBuilder/CvBuilder';
import { useEffect, useState } from 'react';
import { CvDocument, MetadataItemResponse } from '../models/api';
import * as api from '../api/api';
import DocumentSelector from './Components/DocumentSelector';

function App() {
  const [metadata, setMetadata] = useState<MetadataItemResponse[]>([])

  const [id, setId] = useState<string>("")
  const [loadedDoc, setLoadedDoc] = useState<CvDocument>({
    template: 0,
    theme: 0,
    content: [],
    sidebar: [],
  })

  const [docLoaded, setDocLoaded] = useState<boolean>(false)

  const [error, setError] = useState<string>("")

  useEffect(() => {
    loadMetadata();
  }, [])

  async function newDocument(){
    setLoadedDoc({
      template: 0,
      theme: 0,
      content: [],
      sidebar: [],
    })
    setDocLoaded(true)
  }

  async function loadDocument(docId: string){
    try{
      const doc = await api.load(docId)

      setLoadedDoc(doc)
      setId(docId)
      setDocLoaded(true)
    }
    catch(err: any){
      setError(`Failed to load document: ${err.message}`)
    }
  }

  async function loadMetadata(){
    try{
      const data = await api.loadMetadata();
      setMetadata([{id: "", title: "", lastModifiedAt: new Date() },...data.metadata])
    }
    catch(err: any)
    {
      setError(`Failed to load metadata: ${err.message}`)
    }
  }

  return (
    <>
      <header>
        <Nav error={error} />
      </header>
      
      {docLoaded && <CvBuilder id={id} doc={loadedDoc} />}
      {!docLoaded && metadata.length > 0 && <DocumentSelector metadata={metadata} onNewDocument={newDocument} onDocumentSelected={(v) => loadDocument(v)}/>}

    </>
  )
}

export default App
