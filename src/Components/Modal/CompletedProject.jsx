// CompletedProjectsModal.js
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import 'tailwindcss/tailwind.css';

Modal.setAppElement('#root'); // Set the root element for the modal

const CompletedProject = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [completedProjects, setCompletedProjects] = useState([]);
    const [error, setError] = useState(null);

    const fetchCompletedProjects = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/projects/completed');
            setCompletedProjects(response.data);
        } catch (error) {
            console.error('Error fetching completed projects:', error);
            setError('Failed to fetch completed projects');
        }
    };

    const openModal = () => {
        setModalIsOpen(true);
        fetchCompletedProjects();
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    return (
        <div className="flex justify-center mt-10">
            <button 
                onClick={openModal} 
                className="bg-blue-500 text-white px-6 py-2 rounded shadow hover:bg-blue-700 transition duration-200"
            >
                View Completed Projects
            </button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Completed Projects"
                className="bg-white p-6 rounded shadow-lg max-w-2xl mx-auto mt-20"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
            >
                <h2 className="text-2xl font-bold mb-4">Completed Projects</h2>
                <button 
                    onClick={closeModal} 
                    className="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-700 transition duration-200 mb-4"
                >
                    Close
                </button>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <ul className="list-disc pl-5">
                    {completedProjects.map((project) => (
                        <li key={project.id} className="mb-2">
                            <span className="font-semibold">{project.projectName}</span> - {project.clientName}
                        </li>
                    ))}
                </ul>
            </Modal>
        </div>
    );
};

export default CompletedProject;
