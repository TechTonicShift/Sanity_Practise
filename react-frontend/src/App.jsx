import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [blogdata, setBlogData] = useState([]);

  useEffect(() => {
    let PROJECT_ID = "la7e5sle";
    let DATASET = "production";
    let QUERY = encodeURIComponent('*[_type == "blog"]');
    let URL = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${QUERY}`;
    
    fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        // Check if data.result is an array before using map
        if (Array.isArray(data.result)) {
          setBlogData(data.result);
        } else {
          console.error('Data received from the API does not contain an array of blog entries.');
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <h1>Blogs will be displayed here</h1>
      {/* Access and render blogdata as needed */}
      {blogdata.map((blog, index) => (
        <div key={index}>
          <h2>{blog.title}</h2>
          {/* Map over each content block and its children */}
          {blog.content.map((contentBlock, blockIndex) => (
            <h3 key={blockIndex}>
              {/* Map over the children of each content block */}
              {contentBlock.children.map((child, childIndex) => (
                <span key={childIndex}>{child.text}</span>
              ))}
            </h3>
          ))}
          {/* Other blog details can be rendered here */}
          <img src={blog.coverPhotoUrl}></img>
        </div>
      ))}
    </div>
  );
}

export default App;
