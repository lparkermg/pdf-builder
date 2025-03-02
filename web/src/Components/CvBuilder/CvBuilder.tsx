import { useEffect, useState } from "react"
import { ThemeResponse, TemplateResponse } from "../../../models/api"
import * as api from '../../../api/api';
import CvSidebar from "./CvSidebar";
import CvContentArea from "./CvContentArea";

function CvBuilder(){
    const [themes, setThemes] = useState<ThemeResponse>({themes:[]})
    const [templates, setTemplates] = useState<TemplateResponse>({templates: []})

    const [content, setContent] = useState<string[]>([])
    const [sidebar, setSidebar] = useState<string[]>([])

    const [pdfLink, setPdfLink] = useState<string>("")

    useEffect(() => {
    fetchAvailableDetails();
    }, [])

    async function fetchAvailableDetails(){
        try{
            const themeRes = await api.getThemes();
            const templateRes = await api.getTemplates();

            setThemes(themeRes);
            setTemplates(templateRes);
        } catch (error){
            console.error({error, err:"failed"});
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
        contentClone.splice(index);
        setContent(contentClone);
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
        sidebarClone.splice(index);
        setSidebar(sidebarClone);
    }

    async function generateCv(template: number, theme: number){
        const data = await api.postCv({ template, theme, content: content, sidebar: sidebar});

        if (data){
            setPdfLink(data);
        }
    }
    return(
    <section>
        <CvSidebar title="CV Settings" templates={templates.templates} themes={themes.themes} onSubmit={(template, theme) => generateCv(template, theme)} />
        <CvContentArea 
            pdfLink={pdfLink}
            mainSections={content}
            onMainSectionAdded={addNewContentSection}
            onMainSectionUpdated={updateContentSection}
            onMainSectionRemoved={removeContentSection}
            sidebarSections={sidebar}
            onSidebarSectionAdded={addNewSidebarSection}
            onSidebarSectionUpdated={updateSidebarSection}
            onSidebarSectionRemoved={removeSidebarSection} />
    </section>
    )
}

export default CvBuilder;