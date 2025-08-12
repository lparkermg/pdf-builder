import { ThemeResponse, TemplateResponse } from '../../models/api'
interface SelectorProps {
    themes: ThemeResponse;
    templates: TemplateResponse;
    onThemeSelected(theme: number): void;
    onTemplateSelected(template: number): void;
}
function SelectorSections({themes, templates, onThemeSelected, onTemplateSelected}: SelectorProps){
    const templateOptions = templates.templates.map((v) => (
        <option value={v.id}>{v.name}</option>
    ));
    const themeOptions = themes.themes.map((v) => (
        <option value={v.id}>{v.name}</option>
    ));

    return <section>
        <label htmlFor="templateSelection">
            <select name="templateSelection" onChange={(e) => onTemplateSelected(Number(e.target.value))}>
                {templateOptions}
            </select>

        </label>
        <label htmlFor="themeSelection">
            <select name="themeSelection" onChange={(e) => onThemeSelected(Number(e.target.value))}>
                {themeOptions}
            </select>
        </label>
    </section>
}

export default SelectorSections;