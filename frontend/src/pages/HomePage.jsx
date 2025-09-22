import { useState } from "react"; // Importing useState hook for state management of functional components as data changes
import { useEffect } from "react"; // Importing useEffect hook to perform side effects in functional components, such as fetching data
import api from '../lib/axios';  // Importing our BASEURL for making HTTP requests to backend API
import toast from "react-hot-toast"; // Importing toast for showing notifications to users
import Navbar from "../components/Navbar";
import NoteCard from "../components/NoteCard";
import NotesNotFound from "../components/NotesNotFound";

const HomePage = () => {

  // to fetch notes from backend
  const [notes, setNotes] = useState([]); // state to hold notes, default is an empty array
  // to keep track of loading state
  const [loading, setLoading] = useState(true); // state to indicate loading, default set to true (meaning loading - as soon as we visit the home page, we want to fetch the notes)

  // function to fetch notes from backend
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get('/notes'); // fetching notes from backend API
        const data = res.data; // parsing the JSON response
        setNotes(data); // updating the notes state with fetched data
      } catch (error) {
        console.error('Error fetching notes:', error); // logging any errors during fetch
        toast.error('Failed to fetch notes'); // showing error toast notification
      } finally {
        setLoading(false); // setting loading to false if data is fetched or not
      };
    };

    fetchNotes(); // calling the fetchNotes function to initiate the fetch operation

  }, []); // empty dependency array means this effect runs only once when the component mounts

  return (
    <div className="min-h-screen">
      
      <Navbar />
      
      <div className="max-w-7xl mx-auto p-4 mt-6">
        
        {loading &&
          <div className="text-center text-primary py-10">
            Loading notes...
          </div>}

        {notes.length === 0 && <NotesNotFound />}
        
        {notes.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};


export default HomePage;