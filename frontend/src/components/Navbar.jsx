import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../Context/AuthContext.jsx";
import { 
  HomeIcon, 
  TruckIcon, 
  ClipboardDocumentListIcon, 
  ChartBarIcon,
  ArrowRightOnRectangleIcon,
  UserCircleIcon
} from '@heroicons/react/24/outline';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/dashboard" className="flex items-center space-x-2">
              <TruckIcon className="h-8 w-8 text-primary-600" />
              <span className="text-xl font-bold text-gray-900">CarDealer Pro</span>
            </Link>
            
            <div className="hidden md:flex items-center space-x-4">
              <Link
                to="/dashboard"
                className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                <ChartBarIcon className="h-5 w-5" />
                <span>Dashboard</span>
              </Link>
              
              <Link
                to="/vehicles"
                className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                <TruckIcon className="h-5 w-5" />
                <span>Inventory</span>
              </Link>
              
              <Link
                to="/test-drives"
                className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                <ClipboardDocumentListIcon className="h-5 w-5" />
                <span>Test Drives</span>
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm">
              <UserCircleIcon className="h-6 w-6 text-gray-400" />
              <div className="hidden sm:block">
                <p className="font-medium text-gray-700">{user?.name}</p>
                <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
              </div>
            </div>
            
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 text-gray-700 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              <ArrowRightOnRectangleIcon className="h-5 w-5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;