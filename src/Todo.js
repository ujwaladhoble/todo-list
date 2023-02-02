import React, {useState, useEffect} from 'react'
import { Table,Button } from 'react-bootstrap';


// to get the data from LS

const getLocalItmes = () => {
    let list = localStorage.getItem('lists');
    console.log(list);

    if (list) {
        return JSON.parse(localStorage.getItem('lists'));
    } else {
        return [];
    }
}

const Todo = () => {

    const [inputData, setInputData] = useState([]);
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
//     When user clikc on edit button 

// 1: get the id and name of the data which user clicked to edit
// 2: set the toggle mode to change the submit button into edit button
// 3: Now update the value of the setInput with the new updated value to edit. 
// 4: To pass the current element Id to new state variable for reference 
    
    
    const editItem = (id) => {
        let newEditItem = items.find((elem) => {
            return elem.id === id
        });
        console.log(newEditItem);

        setToggleSubmit(false);

        setInputData(newEditItem.name,newEditItem.date,newEditItem.age);

        setIsEditItem(id);

    }
    

    // remove all 
    const removeAll = () => {
         setItems([]);
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
                                    // <div className="eachItem" key={elem.id}>
                                        <tr>
                                        <td>{elem.name}</td>
                                        <td>{elem.date}</td>
                                        <td>{elem.age}</td>
                                       <td> <div className="todo-btn">
                                            <Button className='btn btn-primary' onClick={() => editItem(elem.id)}>Edit</Button>
                                            <Button className='btn btn-danger' onClick={() => deleteItem(elem.id)}>Delete</Button>
                                        </div></td>
                                        </tr>
                                //   </div>
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

