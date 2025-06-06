import { useEffect, useState } from "react"
import { ThemeResponse, TemplateResponse, CvDocument } from "../../../models/api"
import * as api from '../../../api/api';
import CvSidebar from "./CvSidebar";
import CvContentArea from "./CvContentArea";

interface CvBuilderProps{
    id: string;
    docTitle: string;
    doc: CvDocument;
}

function CvBuilder({id, docTitle, doc}: CvBuilderProps){
    const [docId, setDocId] = useState<string>(id)
    const [title, setTitle] = useState<string>(docTitle)

    const [selectedTemplate, setSelectedTemplate] = useState<number>(doc.template)
    const [selectedTheme, setSelectedTheme] = useState<number>(doc.theme)

    const [themes, setThemes] = useState<ThemeResponse>({themes:[]})
    const [templates, setTemplates] = useState<TemplateResponse>({templates: []})

    const [content, setContent] = useState<string[]>(doc.content)
    const [sidebar, setSidebar] = useState<string[]>(doc.sidebar)

    const [pdfLink, setPdfLink] = useState<string>("")

    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        fetchAvailableDetails();
    }, [])

    async function fetchAvailableDetails(){
        try{
            const themeRes = await api.getThemes();
            const templateRes = await api.getTemplates();

            setThemes(themeRes);
            setTemplates(templateRes);
        } catch (err: any){
            setError(`Failed to save CV: ${err.message}`)
        }
    }

    function addNewContentSection(){
        const contentClone = [...content];
        contentClone.push("");
        setContent(contentClone);
    }

    function updateContentSection(index: number, newContent: string){
        const contentClone = [...content];
        contentClone[index] = newContent;
        setContent(contentClone);
    }

    function removeContentSection(index: number){
        const contentClone = [...content];
        const contentRemoved = contentClone.filter((_, i) => i !== index);
        setContent(contentRemoved);
    }

    function addNewSidebarSection(){
        const sidebarClone = [...sidebar];
        sidebarClone.push("");
        setSidebar(sidebarClone);
    }

    function updateSidebarSection(index: number, newContent: string){
        const sidebarClone = [...sidebar];
        sidebarClone[index] = newContent;
        setSidebar(sidebarClone);
    }

    function removeSidebarSection(index: number){
        const sidebarClone = [...sidebar];
        const sidebarRemoved = sidebarClone.filter((_, i) => i !== index);
        setSidebar(sidebarRemoved);
    }

    async function generateCv(template: number, theme: number){
        try{
            const data = await api.postCv({ template, theme, content: content, sidebar: sidebar});

            if (data){
                setPdfLink(data);
            }
        }
        catch(err: any){
            setError(`Failed to generate CV: ${err.message}`)
        }
    }

    async function saveCv(){
        try{
            if (docId === ""){
                // It's a new one so we need to save a new doc.
                const newId = await api.saveNew({template: selectedTemplate, theme: selectedTheme, content, sidebar }, title)
                setDocId(newId)
            }
            else{
                // It's an existing one so we need to update the existing file.
                await api.saveUpdate(docId, title, {template: selectedTemplate, theme: selectedTheme, content, sidebar })
            }
        }
        catch(err: any){
            setError(`Failed to save CV: ${err.message}`)
        }
    }
    return(
    <section>
        <CvSidebar 
            title="CV Settings"
            templates={templates.templates}
            themes={themes.themes}
            defaultTemplate={selectedTemplate}
            defaultTheme={selectedTheme}
            onSubmit={(template, theme) => generateCv(template, theme)}
            onTemplateChanged={(v) => setSelectedTemplate(v)}
            onThemeChanged={(v) => setSelectedTheme(v)} />
        <CvContentArea 
            pdfLink={pdfLink}
            error={error}
            mainSections={content}
            onMainSectionAdded={addNewContentSection}
            onMainSectionUpdated={updateContentSection}
            onMainSectionRemoved={removeContentSection}
            sidebarSections={sidebar}
            onSidebarSectionAdded={addNewSidebarSection}
            onSidebarSectionUpdated={updateSidebarSection}
            onSidebarSectionRemoved={removeSidebarSection}
            title={title}
            onTitleChanged={(v) => setTitle(v)}
            canSave={title.length > 0}
            onSaveClicked={saveCv}
            onErrorClicked={() => setError(null)} />
    </section>
    )
}

export default CvBuilder;