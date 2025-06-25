import { useNavigate } from 'react-router-dom';
const Navbar = ({toggleStyle, onSearchClick}) => {
 let nav = useNavigate();
  return (
    <nav className="side-nav-bar"  >
      <ul>
        <li >
          <button>
            <span>
            <i className="fi fi-rr-menu-burger"></i>
            </span>
          </button>
        </li>
        <li>
          <button onClick={()=> nav("/")}>
            <span>
              <i className="fi fi-rr-home"></i>
            </span>
          </button>
        </li>
        <li>
          <button>
            <span>
            <i className="fi fi-rr-user"></i>
            </span>
          </button>
        </li>
        <li>
          <button onClick={toggleStyle}>
            <span>
            <i className="fi fi-rr-circle"></i>
            </span>
          </button>
        </li>
        <li>
          <button onClick={()=> nav("/events")}>
            <span>
            <i className="fi fi-rr-square"></i>
            </span>
          </button>
        </li>

        <li>
          <button>
            <span>
            <i className="fi fi-rr-apps"></i>
            </span>
          </button>
        </li>

      </ul>
    </nav>
  );
};

export default Navbar;
