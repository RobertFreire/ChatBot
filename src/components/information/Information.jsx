import React, { useEffect, useState, useRef } from 'react'
import styles from './Information.module.scss'

const Information = () => {

    const [versions, setVersions] = useState([]);
    const nameRef = useRef();
    const versionRef = useRef();
    const promptRef = useRef();
    const fileRef = useRef();


    const fetchVersions = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/chatbot/versions');
            const data = await response.json();
            setVersions(data.models)
        } catch (error) {
            console.error(error);
        }
    };

    const handleForm = async (event) => { 
        event.preventDefault();

        const formData = new FormData();
        formData.append('name', nameRef.current.value);
        formData.append('behaviorInstructions', promptRef.current.value);
        formData.append('version', versionRef.current.value);
        formData.append('file', fileRef.current.files[0]);

        try {
            const response = await fetch('http://localhost:3000/api/chatbot',{
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error(`Error! status: ${response.status}`);
            }
        } catch (error) {
            console.error(error);
        }

    };

    useEffect(() => {
        fetchVersions();
    }, []);

    return (
        <section className={styles['information-content']}>
            <form onSubmit={handleForm}>
                <div className={styles['principal-information']}>
                    <label>
                        Nome do Chatbot:
                        <input type="text" ref={nameRef} />
                    </label>
                    <label>
                        Versão do Chatbot:
                        <select ref={versionRef}>
                        {versions.map((version) => (
                                <option key={version.id} value={version.id}>
                                    {version.id}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>
                <div className={styles.instruction}>
                    <label>
                        Prompt:
                        <textarea rows="4" cols="50" ref={promptRef} />
                    </label>

                    <label className={styles['btn-upload']}>
                        Documento (Arquivo):
                        <input className={styles["file-input"]} type="file" ref={fileRef} placeholder='Clique aqui ' />
                    </label>
                </div>
                <button type='submit'> Salvar </button>
            </form>
        </section>
    )
}

export default Information