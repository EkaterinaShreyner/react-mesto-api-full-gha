import { Link, Route, Routes } from "react-router-dom";


function MobileMenu(props) {

  return(
    
    <Routes>
      <Route
        path="/"
        element={
          <div className={`mobile-menu ${props.isMobileMenu && `mobile-menu_opened`}`}>
            <p className="mobile-menu__email">{props.userEmail}</p>
            <Link
              className="mobile-menu__button"
              type="button"
              onClick={props.onSignOut}
              to="/sign-in">
                Выйти
            </Link>
          </div>
        }
      /> 
    </Routes>
  )
}

export default MobileMenu;