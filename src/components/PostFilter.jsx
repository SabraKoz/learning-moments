export const PostFilter = ({ allTopics, setSearchTerm, setSelectTopic }) => {
    return (
        <div className="post-filter">
            <div className="post-filter-dropdown">
                <p>Search Post Topics:</p>
                <select className="topic-dropdown" onChange={(event) => setSelectTopic(event.target.value)}>
                    <option 
                        className="default-dropdown" 
                        value="">Select Topic</option>
                    {allTopics.map(topic => {
                        return (<option value={topic.id} key={topic.id}>{topic.name}</option>
                        )
                    })}
                </select>
            </div>

            <div className="post-title-search">
                <p>Search Post Title:</p>
                <input 
                    onChange={(event) => { setSearchTerm(event.target.value) }} 
                    type="text" 
                    placeholder="Search Titles" 
                    className="title-search" />
            </div>
        </div>
    )
}