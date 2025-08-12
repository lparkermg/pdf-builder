interface NavProps{
    error: string;
}

function Nav({error}: NavProps){
    return <nav>
        <h2>PDF Builder</h2>
        {error !== "" && <div className="error-message">{error}</div>}
    </nav>
}

export default Nav;