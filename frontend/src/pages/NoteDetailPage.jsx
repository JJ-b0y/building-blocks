import { useState, useEffect } from 'react';
import { useNavigate, Link, useParams } from 'react-router';
import api from '../lib/axios'; 
import toast from "react-hot-toast";
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from 'lucide-react';

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);  // when we submit the form, we want to show a loading state

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect( () => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`); // fetching note details from backend API
        const data = res.data; // parsing the JSON response
        setNote(data); // updating the note state with fetched data
      } catch (error) {
        console.error('Error in fetching note:', error); // logging any errors during fetch
        toast.error('Failed to fetch note'); // showing error toast notification
      } finally {
        setLoading(false); // setting loading to false if data is fetched or not
      }
    };
    fetchNote(); // calling the fetchNote() to initiate the fetch operation
  },
  [id]  // run useEffect() whenever the id changes
);

  const handleSave = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error('Please enter a title and content');
      return;
    }
    setSaving(true);  // setting saving to true when we start the save operation
    try {
      await api.put(`/notes/${id}`, note);
      toast.success('Note updated successfully');
      navigate('/');
    } catch (error) {
      console.error('Error saving note:', error);
      toast.error('Failed to save note');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this note?");
    if (!confirmDelete) return;

    try {
      await api.delete(`/notes/${id}`);
      toast.success('Note deleted successfully');
      navigate('/');
    } catch (error) {
      console.error('Error deleting note:', error);
      toast.error('Failed to delete note');
    }
  };

  if (loading) {
    return (
      <div className="bg-base-200 flex items-center justify-center min-h-screen">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-base-200'>
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-2xl mx-auto'>

          <div className='flex items-center justify-between mb-6' >
            <Link to="/" className="btn btn-ghost mb-4">
              <ArrowLeftIcon className="h-5 w-5" />
              Back to Notes
            </Link>
            <button onClick={handleDelete} className="btn btn-error btn-outline" >
              <Trash2Icon className="h-5 w-5" />
              Delete Note
            </button>
          </div>

          <div className='card bg-base-100'>
            <div className='card-body'>
              <div className='form-control mb-4'>
                <label className='label'>
                  <span className='label-text'>Title</span>
                </label>
                <input
                  type='text'
                  placeholder='Note Title'
                  className='input input-bordered'
                  value={note.title}
                  onChange={(e) => setNote({ ...note, title: e.target.value })}
                />
              </div>

              <div className='form-control mb-4'>
                <label className='label'>
                  <span className='label-text'>Content</span>
                </label>
                <textarea
                  className='textarea textarea-bordered h-40'
                  placeholder='Note Content'
                  value={note.content}
                  onChange={(e) => setNote({ ...note, content: e.target.value })}
                />
              </div>

              <div className="card-actions justify-end">
                <button className='btn btn-primary' disabled={saving} onClick={(handleSave)}>
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;