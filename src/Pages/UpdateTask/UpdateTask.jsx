import React from 'react';
import { useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';
import useTitle from '../../hooks/useTitle';

const UpdateTask = () => {
    // custom hook for dynamic title
    useTitle('Update Task')

    const tasks = useLoaderData();
    console.log(tasks)
    const { title, description, _id } = tasks;
    console.log(title)

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
            fetch(`https://assignment-server-side-pink.vercel.app/tasks/${_id}`, {
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
        <form onSubmit={handleUpdateTask} className="form-control w-full lg:w-1/2 md:w-1/2 mx-auto mt-10 bg-gray-400 p-6 rounded-xl">

            <label className="label">
                <span className="label-text text-lg font-semibold">Task Title</span>
            </label>
            <input type="text" placeholder="Enter Task Title" className="input input-bordered w-full" name='title' defaultValue={title} />

            <label className="label">
                <span className="label-text text-lg font-semibold">Description</span>
            </label>
            <textarea className="textarea textarea-bordered h-24" placeholder="write task description" name='description' defaultValue={description}></textarea>

            <div className=' mt-3'>
                <button className='btn btn-primary w-full '>Update Task</button>
            </div>

        </form>
    );
};

export default UpdateTask;