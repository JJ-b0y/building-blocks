import { Routes, Route } from 'react-router'; // Importing routing components

import HomePage from './pages/HomePage.jsx';
import CreatePage from './pages/CreatePage.jsx';
import NoteDetailPage from './pages/NoteDetailPage.jsx';
{/*import toast from 'react-hot-toast';*/}

const App = () => {
  return (
    <div data-theme="coffee">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/notes/:id" element={<NoteDetailPage />} />
      </Routes>
    </div>
  );
};

export default App;