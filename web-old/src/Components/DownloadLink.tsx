interface DownloadLinkProps{
    uri: string;
    display: string;
}

function DownloadLink({ uri, display }: DownloadLinkProps){
    return (<div className="card">
            <a href={uri} target="_blank">
                {display}
            </a>
        </div>)
}

export default DownloadLink;