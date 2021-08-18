import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

const Navbar = () => {

  const history = useHistory();

  const addData = () => {
    const password = window.prompt('Введите пароль');

    if (password === 'paymart2500') {
      history.push('/list');
    } else {
      window.alert('Парол введен не правилно !');
    }
  };


  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-5">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Paymart
        </Link>
        <div>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <div className="nav-link" style={{cursor: 'pointer', color: '#fff'}} onClick={addData}>
                List
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
