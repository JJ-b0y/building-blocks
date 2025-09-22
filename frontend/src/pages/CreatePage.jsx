import { useState } from 'react';
import { Link } from 'react-router';
import { ArrowLeftIcon } from 'lucide-react';
import api from '../lib/axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';


const CreatePage = () => {
  // states to keep track of user/form inputs
  const [title, setTitle] = useState(''); // State for the note title
  const [content, setContent] = useState(''); // State for the note content
  const [loading, setLoading] = useState(false);  // State to manage loading status
  const navigate = useNavigate(); // Hook to programmatically navigate between routes

  // Function to handle form submission
  const handleSubmit = async (e) => { // Form submission handler
    e.preventDefault(); // Prevent default form submission behavior, such as page reload

    if (!title.trim() || !content.trim()) {
      toast.error("All fields are required");
      return; 
    };

    setLoading(true); // Set loading state to true when submission starts

    try {
      await api.post('/notes', { title, content });
      toast.success('Note created successfully');
      navigate('/');
    } catch (error) {
      console.error('Error creating note:', error);
      toast.error('Failed to create note');
    } finally {
      setLoading(false); // Reset loading state after submission attempt
    }
  };

  return (
  <div className='min-h-screen bg-base-200'>
    <div className='container mx-auto px-4 py-8'>
      <div className='max-w-2xl mx-auto'>
        <Link to={'/'} className='btn btn-ghost mb-6'>
        <ArrowLeftIcon className='size-5'/>
        Back to Notes
        </Link>

        <div className='card bg-base-100'>
          <div className='card-body'>
            <h2 className='card-title text-2xl mb-4'>Create New Note</h2>
            <form onSubmit={handleSubmit}>
              <div className='form-control mb-4'>
                <label className='label'>
                  <span className='label-text'>Title</span>
                </label>
                <input
                  type='text'
                  placeholder='Enter Note Title'
                  className='input input-bordered'
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className='form-control mb-4'>
                <label className='label'>
                  <span className='label-text'>Content</span>
                </label>
                <textarea
                  className='textarea textarea-bordered h-32'
                  placeholder='Enter note here...'
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>

              <div className='card-actions justify-end'>
                  <button type='submit' className='btn btn-primary' disabled={loading}>
                    {loading ? 'Creating Note...' : 'Create Note'}
                  </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default CreatePage;