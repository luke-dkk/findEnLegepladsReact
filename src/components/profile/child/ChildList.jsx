import { useState } from 'react';
import { updateChild, deleteChild, createChild,checkoutAll} from '../../../../apiReader';

import './ChildList.css';

function ChildList({ user, onCheckout }) {




const [editingChildId, setEditingChildId] = useState(null);
const [showCreateChild, setShowCreateChild] = useState(false);
const [newChild, setNewChild] = useState({name: '',age: ''});
const [children, setChildren] = useState( user.children || []);

  const handleChange = (index, field, value) => {
    const updatedChildren = children.map((child, i) =>
      i === index
        ? { ...child, [field]: value }
        : child
    );
    setChildren(updatedChildren);
  };

  const handleDelete = async (child) => {
    try {
      await deleteChild(user.id, child.id);
      setChildren((prevChildren) =>
        prevChildren.filter(
          (c) => c.id !== child.id
        )
      );
    } catch (error) {
        alert('Kunne ikke slette barnet')
      console.error(
        'Failed to delete child',
        error
      );
    }
  };

  const handleSave = async (child) => {
    try {
      console.log('Saving child:', child);
      const updatedChild = await updateChild(
        user.id,
        child.id,
        child
      );
      console.log(
        'Updated child:',
        updatedChild
      );

      setChildren((prevChildren) =>
        prevChildren.map((c) =>
          c.id === updatedChild.id
            ? updatedChild
            : c
        )
      );

      setEditingChildId(null);

    } catch (error) {
      alert('Kunne ikke gemme barnet')
      console.error(
        'Failed to save child',
        error
      );
    }
  };

  const handleCreateChild = async () => {
    try {
      const createdChild = await createChild(
        user.id,
        newChild
      );

      setChildren((prevChildren) => [
        ...prevChildren,
        createdChild
      ]);

      setNewChild({
        name: '',
        age: ''
      });

      setShowCreateChild(false);

    } catch (error) {
      alert('Kunne ikke oprette barnet')

      console.error(
        'Failed to create child',
        error
      );
    }
  };

  const checkOutChildren = async (evt) => {
         evt.preventDefault();
    
    try {
      await checkoutAll(user.id);
      alert('Alle børn er tjekket ud');
      onCheckout();

    }
    catch (error) {
      alert('Kunne ikke tjekke børn ud')
      console.error(
        'Kunne ikke tjekke børn ud',
        error
      );
    }
    
  }
  
  return (

    <div className="child-section">

      <h2>Børn</h2>

      {children.length > 0 ? (

        children.map((child, index) => {

          const isEditing =
            editingChildId === child.id;

          return (

            <div
              className="child-item"
              key={child.id}
            >

              {isEditing ? (

                <>

                  <div className="child-field">

                    <label>Navn:</label>

                    <input
                      type="text"
                      value={child.name}
                      onChange={(e) =>
                        handleChange(
                          index,
                          'name',
                          e.target.value
                        )
                      }
                    />

                  </div>

                  <div className="child-field">

                    <label>Alder:</label>

                    <input
                      type="number"
                      value={child.age}
                      onChange={(e) =>
                        handleChange(
                          index,
                          'age',
                          Number(e.target.value)
                        )
                      }
                    />

                  </div>

                  <div className="child-buttons">

                    <button
                      onClick={() =>
                        handleSave(child)
                      }
                    >
                      Gem
                    </button>

                    <button
                      onClick={() =>
                        setEditingChildId(null)
                      }
                    >
                      Fortryd
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(child)
                      }
                    >
                      Slet barn
                    </button>

                  </div>

                </>

              ) : (

                <>

                  <div className="child-field">

                    <label>Navn:</label>

                    <p>
                      {child.name || 'N/A'}
                    </p>

                  </div>

                  <div className="child-field">

                    <label>Alder:</label>

                    <p>
                      {child.age || 'N/A'}
                    </p>

                  </div>

                  <div className="child-buttons">

                    <button
                      onClick={() =>
                        setEditingChildId(child.id)
                      }
                    >
                      Rediger
                    </button>

                  </div>

                </>

              )}

            </div>

          );
        })

      ) : (

        <p>Ingen børn fundet</p>

      )}


      <div className="add-child-section">

        <button
          onClick={() =>
            setShowCreateChild(true)
          }
        >
          Tilføj barn
        </button>

        {showCreateChild && (

          <div className="add-child-form">

            <input
              type="text"
              placeholder="Name"
              value={newChild.name}
              onChange={(e) =>
                setNewChild((prev) => ({
                  ...prev,
                  name: e.target.value
                }))
              }
            />

            <input
              type="number"
              placeholder="Age"
              value={newChild.age}
              onChange={(e) =>
                setNewChild((prev) => ({
                  ...prev,
                  age: Number(e.target.value)
                }))
              }
            />

            <button onClick={handleCreateChild}>
              Gem
            </button>

            <button
              onClick={() =>
                setShowCreateChild(false)
              }
            >
              Fortryd
            </button>

          </div>

        )}

      </div>
        <button
  className="checkout-button"
  onClick={checkOutChildren}
>
  Check alle ud
</button>

    </div>
  );
}

export default ChildList;