import React from 'react';

const DashboardActions = () => {
    return (
        <div className="create-document">
            <p>Create document?</p>
            <form action="submit">
                <label for="newDocument">
                    Name for new document:
                </label>
                <input type="text" placeholder="Some facts about ...">
                </input>
                <button type="submit" className="buttons">
                    Create
                    <i className="fa-solid fa-file-circle-plus"></i>
                </button>
            </form>     
        </div>
    )
}

export default DashboardActions;