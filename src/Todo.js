import React, {useState, useEffect} from 'react'
import { Table,Button } from 'react-bootstrap';


// To get the data

const getLocalItmes = () => {
    let list = localStorage.getItem('lists');

    if (list) {
        return JSON.parse(localStorage.getItem('lists'));
    } else {
        return [];
    }
}

const Todo = () => {

    const [inputData, setInputData] = useState('');
    const [items, setItems] = useState(getLocalItmes());
    const [toggleSubmit, setToggleSubmit] = useState(true);
    const [isEditItem, setIsEditItem] = useState(null);

    const addItem = () => {
        if (!inputData) {
            alert('plzz fill data');
        } else if(inputData && !toggleSubmit) {
            setItems(
                items.map((elem) => {
                    if (elem.id === isEditItem) {
                        return { ...elem, name: inputData.name,date:inputData.date,age:inputData.age}
                    }
                    return elem;
                })
            )
                 setToggleSubmit(true);

                 setInputData(" ");

                 setIsEditItem(null);
        } else {
            const allInputData = { id: new Date().getTime().toString(), name:inputData.name,date:inputData.date,age:inputData.age }
            setItems([...items, allInputData]);
            setInputData('')
        }
    }

    
    // delete the items
    const deleteItem = (index) => {
        const updateditems = items.filter((elem) => {
            return index !== elem.id;
        });

        setItems(updateditems);
    }

// edit the item
    
    const editItem = (id) => {
        let newEditItem = items.find((elem) => {
            return elem.id === id
        });
        console.log(newEditItem);

        setToggleSubmit(false);

        setInputData(newEditItem.name,newEditItem.date,newEditItem.age);

        setIsEditItem(id);

    }
    
    // add data to localStorage
    useEffect(() => {
       localStorage.setItem('lists', JSON.stringify(items))
    }, [items]);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputData(values => ({...values, [name]: value}))
      }

    return (
        <>
            <div className="main-div">
                <div className="child-div">
                   <h1>TODO LIST</h1>
                    <div className="addItems">
                        <input type="text" placeholder="enter Name"
                        name="name"
                           value={inputData.name} 
                           onChange={handleChange}
                        />
                         <input type="date" placeholder="enter Creation Date"
                         name="date"
                           value={inputData.date} 
                           onChange={handleChange}
                        />
                         <input type="Number" placeholder="enter Age"
                         name="age"
                           value={inputData.age} 
                           onChange={handleChange}
                        />
                        {
                            toggleSubmit ? <Button className='btn btn-success' onClick={addItem}>Add</Button> :
                                 <Button className='btn btn-warning' onClick={addItem}>Update</Button>
                        }
                       
                    </div>
                    <select name="todo" onChange={handleChange} value="0">
                        <option value="0">Filter to-do by name</option>
                       {items.map((elem)=>{return(
                           <option key={inputData.id} value={inputData.id}> {elem.name}</option>
                        )})}
                    </select>

                    <div className="showItems">
                        <Table className="table table-striped">
                            <thead>
                                <tr>
                                <th>Name:</th>
                                <th>Creation Date:</th>
                                <th>Age:</th>
                                <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                        {
                            items.map((elem) => {
                                return (
                                        <tr key={elem.id}>
                                        <td>{elem.name}</td>
                                        <td>{elem.date}</td>
                                        <td>{elem.age}</td>
                                       <td> <div className="todo-btn">
                                            <Button className='btn btn-primary' onClick={() => editItem(elem.id)}>Edit</Button>
                                            <Button className='btn btn-danger' onClick={() => deleteItem(elem.id)}>Delete</Button>
                                        </div></td>
                                        </tr>
                                )
                            })

                        }
                        </tbody>
                        </Table>
                       
                    </div>
            
                </div>
          </div>  
        </>
    )
}

export default Todo

