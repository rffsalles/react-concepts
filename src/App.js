import React,{useState,useEffect} from "react";

import "./styles.css";
import api from './services/api'
function App() {

  const [repositories,setRepositories] = useState([]);
  useEffect(() => {
      api.get('repositories').then(response =>{ 
        setRepositories(response.data);
      })
  },[]);  
  async function handleAddRepository() {
      const response = await api.post('repositories',{
        title:`New Repository ${Date.now()}`
      });
      setRepositories([...repositories,response.data]);
  }

  async function handleRemoveRepository(id) {
      const response = await api.delete(`repositories/${id}`).then(res => {        
        if (!res.data){
          setRepositories(repositories.filter(repository => repository.id !== id));
        }
      }); 
  }

  return (
    <div>
      <button onClick={handleAddRepository}>Adicionar</button>
      <ul data-testid="repository-list">
      {repositories.map(repository =>{
                        return (<li key={repository.id}>{repository.title}
                          <button onClick={() => handleRemoveRepository(repository.id)}>
                            Remover
                          </button>                        
                        </li>
                        )
                    })}
      </ul>      
    </div>
  );
}

export default App;