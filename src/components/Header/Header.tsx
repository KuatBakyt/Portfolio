import { NavLink } from "react-router-dom"

function Header() {
    return (
        <>
            <header className="header">
                <div className="logo">🌟 MyPortfolio</div>
                <nav className="nav">
                    <NavLink to="/" 
                    className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                    >Обо мне</NavLink>
                    <NavLink to="/experience" 
                    className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                    >Опыт работы</NavLink>
                    <NavLink to="/projects" 
                    className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                    >Проекты</NavLink>
                    <NavLink to="/contacts" 
                    className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                    >Контакты</NavLink>
                </nav>

            </header>
        </>
    )
}

export default Header