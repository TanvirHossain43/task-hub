import React from 'react';
import { useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';

const UpdateTask = () => {
    const tasks = useLoaderData();
    console.log(tasks)
    const {title,description,_id}=tasks;

    const handleUpdateTask = (event) => {
        event.preventDefault();
        const form = event.target;
        const title = form.title.value;
        const description = form.description.value;

        const updatedTaskData = {
            title: title,
            description: description,

        }
        console.log(updatedTaskData)
        const proceed = confirm('Are you sure you want to update the toy?');

        if (proceed) {
            fetch(`http://localhost:5000/tasks/${_id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedTaskData)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.modifiedCount > 0) {
                        Swal.fire(
                            'Data Updated successfully!',
                            'Good Job!',
                            'success'
                        )
                    }
                    else {
                        alert('Nothing has changed')
                    }

                })
                .catch(error => {
                    console.error('Error updating toy:', error);
                    // Handle the error and show an error message to the user
                });
        }

    }

    return (
        <form onSubmit={handleUpdateTask} className="form-control w-full max-w-xs mx-auto">

            <label className="label">
                <span className="label-text">Task Title</span>
            </label>
            <input type="text" placeholder="Enter Task Title" className="input input-bordered w-full max-w-xs" name='title' defaultValue={title} />

            <label className="label">
                <span className="label-text">Description</span>
            </label>
            <textarea className="textarea textarea-bordered h-24" placeholder="write task description" name='description' defaultValue={description}></textarea>

            <div className=' mt-3'>
                <button className='btn btn-primary w-full max-w-xs'>Update Task</button>
            </div>

        </form>
    );
};

export default UpdateTask;