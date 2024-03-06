import React, { useEffect, useState } from "react";

const App = () => {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({ name: '', phone: '' });
  const [updateData, setUpdateData] = useState({ name: '', phone: '', _id: '' });

  const fetchData = () => {
    fetch('/fetchData')
      .then((response) => response.json())
      .then((results) => {
        setData(results);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'phone' && !/^\d*$/.test(value)) {
      return;
    }

    if (updateData._id) {
      setUpdateData({
        ...updateData,
        [name]: value,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleEdit = (contact) => {
    setUpdateData(contact);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (updateData._id) {
      fetch(`/updatePhone/${updateData._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      })
        .then((response) => response.json())
        .then(() => {
          fetchData();
          setUpdateData({ name: '', phone: '', _id: '' });
          const modal = new bootstrap.Modal(document.getElementById("exampleModal"));
          modal.hide();
        })
        .catch((error) => console.error('Error updating contact:', error));
    } else {
      fetch("/addPhone", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then(() => {
          fetchData();
          setFormData({ name: '', phone: '' });
          const modal = new bootstrap.Modal(document.getElementById("exampleModal-add"));
          modal.hide();
        })
        .catch((error) => console.error('Error adding contact:', error));
    }
  };

  const handleDelete = (id) => {
    // Prompting the user for confirmation
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (confirmDelete) {
      fetch(`/deletePhone/${id}`, {
        method: 'DELETE'
      })
        .then(() => fetchData())
        .catch((err) => console.error("Error deleting Contact.", err));
    }
  };

  return (
    <div className="main">
      <div className="inner-div">
        <h1>Phone Book</h1>

        <div className="data-div">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Mobile</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody id="tbody">
              {data.map((result, key) => (
                <tr key={key}>
                  <td scope="row">{result.name}</td>
                  <td scope="row">{result.phone}</td>
                  <td className="btn-sm-2" type="button" data-toggle="modal" data-target="#exampleModal" onClick={() => handleEdit(result)}>
                    <i className="fa-solid fa-pen-to-square"></i>
                  </td>
                  <td>
                    <a onClick={() => handleDelete(result._id)}>
                      <i className="fa-solid fa-circle-xmark"></i>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="buttons-div">
          <div>
            <button className="button-me btn-sm-2" type="button" data-toggle="modal" data-target="#exampleModal-add">
              ADD
            </button>
            <div className="modal fade" id="exampleModal-add" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog">
                <div className="modal-content background-modal">
                  <div className="modal-header mb-3">
                    <h5 className="phone-book-heading" id="exampleModalLabel-add">Add phone number</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <form method="POST" onSubmit={handleSubmit}>
                    <div className="modal-body">
                      <input name="name" onChange={handleChange} value={formData.name} type="text" className="enter-input" placeholder="Name.." /><br />
                      <input name="phone" onChange={handleChange} value={formData.phone} type="tel" id="mobilenumber" maxLength={10} className="enter-input" placeholder="Phone number.." required />
                    </div>
                    <div className="modal-footer">
                      <button className="button-me" type="submit">Save</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Modal */}
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content background-modal">
              <div className="modal-header mb-3">
                <h5 className="phone-book-heading" id="exampleModalLabel">Edit Phone Number</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <form method="POST" onSubmit={handleSubmit}>
                <div className="modal-body">
                  <input onChange={handleChange} name='name' value={updateData.name} type="text" className="enter-input" placeholder="Name.." /><br />
                  <input onChange={handleChange} name='phone' value={updateData.phone} type="tel" className="enter-input" placeholder="Phone number.." required />
                </div>
                <div className="modal-footer">
                  <button className="button-me" type="submit">Save</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
