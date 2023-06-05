import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import useTitle from '../../hooks/useTitle';

const Home = () => {
    // custom hook for dynamic title 
    useTitle('Home')

    const [tasks, setTasks] = useState([])

    useEffect(() => {
        fetch('https://assignment-server-side-pink.vercel.app/tasks')
            .then(res => res.json())
            .then(data => setTasks(data))
    }, [])

    const handleStatusUpdate = taskId => {
        // Find the task by ID
        const updatedTasks = tasks.map((task) => {
            if (task._id === taskId) {
                // Toggle the status between 'pending' and 'completed'
                const updatedStatus = task.status === 'pending' ? 'completed' : 'pending';
                return { ...task, status: updatedStatus };
            }
            return task;
        });

        // Update the tasks array with the updated task
        setTasks(updatedTasks);
    }

    const handleDelete = id => {
        const proceed = confirm('Are you sure to delete')
        if (proceed) {
            fetch(`https://assignment-server-side-pink.vercel.app/tasks/${id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if (data.deletedCount > 0) {
                        Swal.fire(
                            'Toy Deleted successfully!',
                            'Good Job!',
                            'success'
                        )
                        const remaining = tasks.filter(task => task._id !== id)
                        setTasks(remaining)
                    }
                })
        }

    }

    return (

        <div className='grid md:grid-cols-2 lg:grid-cols-3  gap-y-6 justify-items-center pt-10  pb-10 text-white'>
            {
                tasks.map(task =>

                    <div key={task._id} className="card md:w-96 lg:w-96 w-80 bg-black bg-opacity-75 shadow-xl  ">
                        <div className="card-body">
                            <h2 className="card-title ">{task.title}</h2>
                            <p><span className=' font-semibold text-orange-300'>Description:</span> {task.description}</p>
                            <hr />
                            <div className="md:flex lg:flex space-y-3 justify-between items-baseline">
                                <div>
                                    <button onClick={() => handleStatusUpdate(task._id)} >
                                        {task.status === 'pending' ? <span className='text-blue-500'>Mark as completed</span> : <span>Mark as pending</span>}
                                    </button>
                                </div>
                                <div className='space-x-2'>
                                    <Link to={`/updatetask/${task._id}`}><button className="btn bg-sky-400 hover:bg-sky-600 border-0 rounded-full">Update</button></Link>
                                    <button onClick={() => handleDelete(task._id)} className="btn bg-yellow-500 hover:bg-yellow-700 text-white border-0 rounded-full">Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }

        </div>
    );
};

export default Home;