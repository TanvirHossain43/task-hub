import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const Home = () => {

    const [tasks, setTasks] = useState([])

    useEffect(() => {
        fetch('http://localhost:5000/tasks')
            .then(res => res.json())
            .then(data => setTasks(data))
    }, [])

    const handleDelete = id => {
        const proceed = confirm('Are you sure to delete')
        if (proceed) {
            fetch(`http://localhost:5000/tasks/${id}`, {
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
                        setAddedToys(remaining)
                    }
                })
        }

    }

    return (

        <div className='grid grid-cols-3 gap-y-6 justify-items-center mt-10 '>
            {
                tasks.map(task =>

                    <div key={task._id} className="card w-96 bg-base-100 shadow-xl ">
                        <div className="card-body">
                            <h2 className="card-title">{task.title}</h2>
                            <p><span className=' font-semibold'>Description:</span>{task.description}</p>
                            <hr />
                            <div className="flex justify-between items-center">
                                <div>
                                    <p>Mark as Complete</p>
                                </div>
                                <div className='space-x-2'>
                                    <button className="btn btn-primary">Update</button>
                                    <button onClick={()=>handleDelete(task._id)} className="btn btn-warning">Delete</button>
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