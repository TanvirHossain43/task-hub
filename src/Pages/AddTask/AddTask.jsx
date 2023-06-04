import React, { useState } from 'react';
import Swal from 'sweetalert2';

const AddTask = () => {

    const [selectedStatus, setStatus] = useState('')

    const handleStatus = (event) => {
        setStatus(event.target.value)
    }


    const handleAddTask = (event) => {
        event.preventDefault();
        const form = event.target;
        const title = form.title.value;
        const description = form.description.value;
        const status = selectedStatus;
        // console.log(title, description, status)
        const newTask = {
            title: title,
            description: description,
            status: status
        }
        console.log(newTask)
        fetch('http://localhost:5000/tasks', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newTask)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    Swal.fire(
                        'Task added successfully!',
                        'Good Job!',
                        'success'
                    )
                }
            })

    }

    return (

        <form onSubmit={handleAddTask} className="form-control w-full max-w-xs mx-auto">

            <label className="label">
                <span className="label-text">Task Title</span>
            </label>
            <input type="text" placeholder="Enter Task Title" className="input input-bordered w-full max-w-xs" name='title' />

            <label className="label">
                <span className="label-text">Description</span>
            </label>
            <textarea className="textarea textarea-bordered h-24" placeholder="write task description" name='description'></textarea>

            <select className="select select-bordered w-full max-w-xs mt-3"
                value={selectedStatus}
                onChange={handleStatus}
            >
                <option disabled selected value="">Select status</option>
                <option value="completed">Completed</option>
                <option value="pending">pending</option>
            </select>

            <div className=' mt-3'>
                <button className='btn btn-primary w-full max-w-xs'>Add Task</button>
            </div>

        </form>

    );
};

export default AddTask;